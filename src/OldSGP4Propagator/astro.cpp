#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fstream>
#include <iostream>
#include <chrono>
#include <time.h>
#include <list>
#include "coordfk5/coordFK5/coordFK5.h"
#include "SGP4/SGP4/SGP4.h"
#include "eopspw/EopSpw/EopSpw.h"
#include "ast2body/ast2Body/ast2Body.h"
#include "SatObj.h"
#include "asttime/astTime/astTime.h"
//#include "sgp4sdp4/sgp4sdp4.h"
#include "pass_vis.h"

using namespace std::chrono;

extern "C"
{
#include "sgp4sdp4/sgp4sdp4.h"
#define THREE 3
  std::list<SatObj *> satelliteCatalog;
  struct eopdata currentEOP;
  bool eopInit = false;
  double *vec = nullptr;
  double *value = new double[THREE];
  double pefMatrix[3][3];
  double polarMatrix[3][3];
  double ecef[3], ro[3], vo[3];
  bool resized = false;
  //const double de2ra = pi / 180.0;
  std::string description = "";

  int sizeOfSatObj()
  {
    return sizeof(SatObj);
  }

  int sizeOfsatelliteCatalog()
  {
    return satelliteCatalog.size();
  }

  void freePtr(void *pointer)
  {
    if (pointer)
      free(pointer);
    pointer = nullptr;
  }

  void deletePtr(SatObj *pointer)
  {
    if (pointer)
      delete pointer;
    pointer = 0;
  }

  double radians(double arg)
  {
    return (arg * de2ra);
  }

  double degrees(double arg)
  {
    return (arg / de2ra);
  }

  int setEOP()
  {
    currentEOP.lod = 0.0;
    currentEOP.dut1 = 0.0;
    currentEOP.x = 0.0;
    currentEOP.y = 0.0;
    return 0;
  }

  bool compare_satcat(const SatObj *a, const SatObj *b)
  {
    return a->satrec.satnum < b->satrec.satnum;
  }

  // Run SGP4 on a single sat and epoch and write result to provided memory address
  int sgp4Propagate(long *SatObjPointer, double epoch, bool temeToECEF, double *result, bool storeResult, bool fast = false)
  {
    SatObj *nSatObj = (SatObj *)SatObjPointer;
    if (!(nSatObj->visible))
      return -1;

    double tt = ((epoch - nSatObj->unix_timestamp) / 1000) / 60;
    if (!storeResult)
      SGP4Funcs::sgp4_pos(nSatObj->satrec, tt, ro);
    else
      SGP4Funcs::sgp4(nSatObj->satrec, tt, ro, vo);
    if ((nSatObj->satrec).error > 0)
    {
      nSatObj->ephemeris_length = 0;
      //printf("SGP4 error %u for SATNUM %lu at EPOCH %lf\n", (nSatObj->satrec).error, (nSatObj->satrec).satnum, epoch);
      if (result)
        memset(result, 0, sizeof(ro));
      return (nSatObj->satrec).error;
    }
    if (temeToECEF)
    {
      /*
            References: https://celestrak.com/columns/v02n01/
            http://help.agi.com/stk/index.htm#stk/referenceFramesCentralBodies.htm
            Coordinates are Earth-Centered Inertial (ECI)
            True Equator, Mean Equinox (TEME) of Epoch

            teme_ecef (ITRF) -> Cesium -> Cesium.Transforms.computeFixedToIcrfMatrix

            // TODO - support EOP parameters for polar www.celestrak.com/SpaceData
            // oscillates around 0, so leave it for now ftp://hpiers.obspm.fr/iers/series/opa/eopc04_IAU2000
          */

      if (fast)
        coordFK5::teme_ecef_convert(ro, ecef, true, polarMatrix, pefMatrix);
      else
      {
        double jdut1 = ((epoch / 86400000) + 2440587.500) + currentEOP.dut1; //TODO get the delta ut1 from EOP
        double jcent = (jdut1 - 2451545.0) / 36525.0;

        coordFK5::teme_ecef_pos(ro, eTo, ecef, jcent, jdut1, currentEOP.x, currentEOP.y, true, 2);
      }

      for (int i = 0; i < THREE; ++i)
      {
        ecef[i] *= 1000;
      }

      if (result)
        memcpy(result, ecef, sizeof(ecef));
      if (!storeResult)
        return 0;
    }
    for (int i = 0; i < THREE; ++i)
    {
      ro[i] *= 1000;
    }

    if (storeResult)
    {
      nSatObj->x = ro[0];
      nSatObj->y = ro[1];
      nSatObj->z = ro[2];
      nSatObj->vx = vo[0] * 1000;
      nSatObj->vy = vo[1] * 1000;
      nSatObj->vz = vo[2] * 1000;
    }
    if (!temeToECEF && result)
      memcpy(result, ro, sizeof(ro));

    return 0;
  }

  void *registerEntity(
      char *line1,
      char *line2,
      bool visible,
      double startmfe = 0,
      double stopmfe = 0,
      double deltamin = 0,
      long *SatObjPointer = nullptr)
  {
    //https://github.com/emscripten-core/emscripten/issues/3942
    if (visible == NULL)
      visible = true;
    SatObj *nSatObj;
    if (SatObjPointer)
      nSatObj = (SatObj *)SatObjPointer;
    else
    {
      nSatObj = new SatObj();
      satelliteCatalog.push_back((SatObj *)nSatObj);
      nSatObj->array_index = satelliteCatalog.size() - 1;
      resized = true;
    }

    nSatObj->visible = visible;

    char typerun = 'm', typeinput = 'z', opsmode = 'i';
    gravconsttype whichconst = wgs84;

    SGP4Funcs::twoline2rv(line1, line2, typerun, typeinput, opsmode, whichconst, startmfe, stopmfe, deltamin, nSatObj->satrec);

    nSatObj->unix_timestamp = (nSatObj->satrec.jdsatepoch + nSatObj->satrec.jdsatepochF - 2440587.500) * 86400000;
    nSatObj->period = (2 * M_PI / nSatObj->satrec.no_kozai) * 60 * 1000;
    nSatObj->satrec.period_sec = nSatObj->period / 1000;
    nSatObj->ephemeris_start = startmfe;
    nSatObj->ephemeris_stop = stopmfe;
    nSatObj->ephemeris_step = deltamin;
    nSatObj->ephemeris_ptr = nullptr;
    nSatObj->x = 1.5;
    nSatObj->y = 2.5;
    nSatObj->z = 3.5;
    nSatObj->vx = 4.5;
    nSatObj->vy = 5.5;
    nSatObj->vz = 6.5;

    return (long *)nSatObj;
  }
  void *registerEntityOMM(
      char *OBJECT_ID,
      char *EPOCH,
      double MEAN_MOTION,
      double ECCENTRICITY,
      double INCLINATION,
      double RA_OF_ASC_NODE,
      double ARG_OF_PERICENTER,
      double MEAN_ANOMALY,
      double GM,
      signed char EPHEMERIS_TYPE,
      char *CLASSIFICATION_TYPE,
      uint32_t NORAD_CAT_ID,
      uint32_t ELEMENT_SET_NO,
      double REV_AT_EPOCH,
      double BSTAR,
      double MEAN_MOTION_DOT,
      double MEAN_MOTION_DDOT,
      bool visible,
      double startmfe = 0,
      double stopmfe = 0,
      double deltamin = 0,
      long *SatObjPointer = nullptr)
  {

    //https://github.com/emscripten-core/emscripten/issues/3942
    if (visible == NULL)
      visible = true;
    SatObj *nSatObj;
    if (SatObjPointer)
      nSatObj = (SatObj *)SatObjPointer;
    else
    {
      nSatObj = new SatObj();
      satelliteCatalog.push_back((SatObj *)nSatObj);
      nSatObj->array_index = satelliteCatalog.size() - 1;
      resized = true;
    }

    nSatObj->visible = visible;

    char typerun = 'm', typeinput = 'z', opsmode = 'i';
    gravconsttype whichconst = wgs84;

    SGP4Funcs::omm2rv(OBJECT_ID,
                      EPOCH,
                      MEAN_MOTION,
                      ECCENTRICITY,
                      INCLINATION,
                      RA_OF_ASC_NODE,
                      ARG_OF_PERICENTER,
                      MEAN_ANOMALY,
                      GM,
                      EPHEMERIS_TYPE,
                      CLASSIFICATION_TYPE,
                      NORAD_CAT_ID,
                      ELEMENT_SET_NO,
                      REV_AT_EPOCH,
                      BSTAR,
                      MEAN_MOTION_DOT,
                      MEAN_MOTION_DDOT,
                      typerun, typeinput, opsmode, whichconst, startmfe, stopmfe, deltamin, nSatObj->satrec);

    nSatObj->unix_timestamp = (nSatObj->satrec.jdsatepoch + nSatObj->satrec.jdsatepochF - 2440587.500) * 86400000;
    nSatObj->period = (2 * M_PI / nSatObj->satrec.no_kozai) * 60 * 1000;
    nSatObj->satrec.period_sec = nSatObj->period / 1000;
    nSatObj->ephemeris_start = startmfe;
    nSatObj->ephemeris_stop = stopmfe;
    nSatObj->ephemeris_step = deltamin;
    nSatObj->ephemeris_ptr = nullptr;
    nSatObj->x = 1.5;
    nSatObj->y = 2.5;
    nSatObj->z = 3.5;
    nSatObj->vx = 4.5;
    nSatObj->vy = 5.5;
    nSatObj->vz = 6.5;

    return (long *)nSatObj;
  }
  void removeEntity(long *SatObjPointer)
  {
    SatObj *nSatObj = (SatObj *)SatObjPointer;
    satelliteCatalog.remove(nSatObj);
    freePtr(nSatObj->ephemeris_ptr);
    deletePtr(nSatObj);
    int idx = 0;
    for (std::list<SatObj *>::iterator it = satelliteCatalog.begin(); it != satelliteCatalog.end(); ++it)
    {
      (*it)->array_index = ++idx;
    }
    resized = true;
  }

  void removeAll()
  {
    for (std::list<SatObj *>::iterator it = satelliteCatalog.begin(); it != satelliteCatalog.end(); ++it)
    {
      SatObj *nSatObj = *it;
      freePtr(nSatObj->ephemeris_ptr);
      deletePtr(nSatObj);
    }
    satelliteCatalog.clear();
    resized = true;
    freePtr(vec);
  }

  // Propagate full catalog
  double *propagate(double epoch, bool temeToECEF, bool storeResult)
  {
    //https://github.com/emscripten-core/emscripten/issues/3942

    if (!vec)
    {
      vec = (double *)malloc(satelliteCatalog.size() * THREE * sizeof(double));
      resized = false;
    }
    if (resized)
    {
      vec = (double *)realloc(vec, satelliteCatalog.size() * THREE * sizeof(double));
      resized = false;
    }

    // Initial matrixes for ECEF conversion outside of loop
    if (temeToECEF)
    {
      double jdut1 = ((epoch / 86400000) + 2440587.500) + currentEOP.dut1; //TODO get the delta ut1 from EOP
      double jcent = (jdut1 - 2451545.0) / 36525.0;
      coordFK5::teme_ecef_matrix(jcent, jdut1, currentEOP.x, currentEOP.y, true, 2, polarMatrix, pefMatrix);
    }

    int index = 0;
    for (std::list<SatObj *>::iterator it = satelliteCatalog.begin(); it != satelliteCatalog.end(); ++it, ++index)
    {
      sgp4Propagate((long *)*it, epoch, temeToECEF, (double *)(vec + index * THREE), storeResult, true);
    }

    return (double *)vec;
  }

  // Propagate one sat over time interval
  double *generateEphemeris(long *SatObjPointer, double start, double stop, int samplesPerPeriod, bool temeToECEF)
  {

    if (samplesPerPeriod == NULL)
      samplesPerPeriod = 90;
    if (temeToECEF == NULL)
      temeToECEF = true;

    SatObj *nSatObj = (SatObj *)SatObjPointer;

    double stepSize = nSatObj->period / samplesPerPeriod;

    double epochStart = start - stepSize;
    double epochStop = stop + stepSize;
    // Get ephemeris from start of window until first time step inclusive of window end
    int ephemerisLength = ceil((epochStop - epochStart) / stepSize) + 1;
    double epoch = epochStart;

    if (!nSatObj->ephemeris_ptr)
      nSatObj->ephemeris_ptr = (double *)malloc(THREE * ephemerisLength * sizeof(double));
    for (int idx = 0; idx < ephemerisLength; ++idx, epoch += stepSize)
    {
      int status = sgp4Propagate(SatObjPointer, epoch, temeToECEF, (double *)nSatObj->ephemeris_ptr + idx * THREE, false);
    }

    nSatObj->ephemeris_start = epochStart;
    nSatObj->ephemeris_stop = epochStop;
    nSatObj->ephemeris_step = stepSize;
    nSatObj->ephemeris_length = THREE * ephemerisLength;
    return (double *)(nSatObj->ephemeris_ptr);
  }

  double *getValue(long *SatObjPointer, double epoch, bool temeToECEF, bool storeResult)
  {
    //https://github.com/emscripten-core/emscripten/issues/3942
    if (temeToECEF == NULL)
      temeToECEF = true;
    sgp4Propagate(SatObjPointer, epoch, temeToECEF, value, storeResult);
    return value;
  }

  double *getValueInReferenceFrame(long *SatObjPointer, double epoch, bool temeToECEF, bool storeResult)
  {
    sgp4Propagate(SatObjPointer, epoch, temeToECEF, value, storeResult);
    return value;
  }

  double *getSatAzElRange(double *ecfEphemeris, int ephemerisSize, double *observerECFLatLonHeight, double *result)
  {
    // Need some sort of upper limit
    if (ephemerisSize > 1000000)
      return 0;
    //double * result = new double[ephemerisSize];
    double latitude = observerECFLatLonHeight[THREE];
    double longitude = observerECFLatLonHeight[4];
    //double height = observerECFLatLonHeight[5];

    int i = 0;
    while (i < ephemerisSize)
    {
      double rx = ecfEphemeris[i++] - observerECFLatLonHeight[0];
      double ry = ecfEphemeris[i++] - observerECFLatLonHeight[1];
      double rz = ecfEphemeris[i++] - observerECFLatLonHeight[2];
      // ENU with Y reversed
      double topS = sin(latitude) * cos(longitude) * rx + sin(latitude) * sin(longitude) * ry - cos(latitude) * rz;
      double topE = -sin(longitude) * rx + cos(longitude) * ry;
      double topZ = cos(latitude) * cos(longitude) * rx + cos(latitude) * sin(longitude) * ry + sin(latitude) * rz;

      double range = result[i - 1] = sqrt(topS * topS + topE * topE + topZ * topZ);
      double el = result[i - 2] = asin(topZ / range);
      /* Corrections for atmospheric refraction */
      /* Reference:  Astronomical Algorithms by Jean Meeus, pp. 101-104    */
      /* Correction is meaningless when apparent elevation is below horizon */
      result[i - 2] = el + radians((1.02 / tan(radians(degrees(el) +
                                                       10.3 / (degrees(el) + 5.11)))) /
                                   60);
      result[i - 3] = atan2(-topE, topS) + pi;
      //printf("X: %lf, Y: %lf, Z: %lf, LAT: %lf, LON: %lf, HEIGHT: %lf, TOPS: %lf, TOPE: %lf, TOPZ: %lf, range: %lf, EL: %lf, AZ: %lf\n", observerECFLatLonHeight[0], observerECFLatLonHeight[1], observerECFLatLonHeight[2], latitude, longitude, height, topS, topE, topZ, range, el, result[i-3]);
    }
    return result;
  }

  double *getSatAzElRangeForInterval(long *SatObjPointer, double startEpoch, double endEpoch, int sampleCount, double *observerECFLatLonHeight)
  {

    double *result = new double[sampleCount * THREE];
    double step = sampleCount > 1 ? (endEpoch - startEpoch) / (sampleCount - 1) : 0;

    for (int i = 0; i < sampleCount; i++)
    {
      double time = startEpoch + (i * step);
      sgp4Propagate(SatObjPointer, time, true, value, false);

      getSatAzElRange(value, THREE, observerECFLatLonHeight, &(result[i * THREE]));
    }

    return result;
  }

  double *getSatAzElRangePositionForInterval(long *SatObjPointer, double startEpoch, double endEpoch, int sampleCount, double *observerECFLatLonHeight)
  {

    double *result = new double[sampleCount * 6];
    double step = sampleCount > 1 ? (endEpoch - startEpoch) / (sampleCount - 1) : 0;

    for (int i = 0; i < sampleCount; i++)
    {
      double time = startEpoch + (i * step);
      sgp4Propagate(SatObjPointer, time, true, &(result[i * 6 + 3]), false);

      getSatAzElRange(&(result[i * 6 + 3]), THREE, observerECFLatLonHeight, &(result[i * 6]));
    }

    return result;
  }

  const char *describeObject()
  {
    // Initialize EOP
    setEOP();

    if (!description.empty())
      return description.c_str();
    char line1[70] = "1 25544U 98067A   98324.28472222 -.00003657  11563-4  00000+0 0    10";
    char line2[70] = "2 25544  51.5908 168.3788 0125362  86.4185 359.7454 16.05064833    05";
    SatObj *satobj = new SatObj();

    satobj->visible = true;

    char typerun = 'm', typeinput = 'z', opsmode = 'i';
    gravconsttype whichconst = wgs84;
    double startmfe, stopmfe, deltamin;
    SGP4Funcs::twoline2rv(line1, line2, typerun, typeinput, opsmode, whichconst, startmfe, stopmfe, deltamin, satobj->satrec);

    satobj->unix_timestamp = (satobj->satrec.jdsatepoch + satobj->satrec.jdsatepochF - 2440587.500) * 86400000;
    satobj->period = (2 * M_PI / satobj->satrec.no_kozai) * 60 * 1000;
    satobj->ephemeris_start = 0;
    satobj->ephemeris_stop = 0;
    satobj->ephemeris_step = 0;
    satobj->ephemeris_ptr = nullptr;
    // TODO - reduce string memory size on stack based on max output size
    char buffer[65536] = "{";
    int bytes_written = 1;
#define SATOBJ(type, name, format) \
  bytes_written += snprintf(buffer + bytes_written, 256, "\"%s\": {\"type\": \"%s\", \"offset\": %lu, \"size\": %lu, \"value\": \"" format "\"},", #name, #type, offsetof(SatObj, name), sizeof(satobj->name), satobj->name);
    SATOBJ_FIELDS
#undef SATOBJ
    unsigned int satrec_offset = offsetof(SatObj, satrec);

#define SATREC(type, name, format) \
  bytes_written += snprintf(buffer + bytes_written, 256, "\"%s\": {\"type\": \"%s\", \"offset\": %lu, \"size\": %lu, \"value\": \"" format "\"},", #name, #type, satrec_offset + offsetof(elsetrec, name), sizeof((satobj->satrec).name), (satobj->satrec).name);
    SATREC_FIELDS
#undef SATREC
    buffer[bytes_written - 1] = '}';
    delete satobj;
    description.assign(buffer);
    return description.c_str();
  }
}
