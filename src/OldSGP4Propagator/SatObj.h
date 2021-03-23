#include <stdio.h>
#include "SGP4/SGP4/SGP4.h"

#define SATOBJ_FIELDS                    \
  SATOBJ(double, x, "%lf")               \
  SATOBJ(double, y, "%lf")               \
  SATOBJ(double, z, "%lf")               \
  SATOBJ(double, vx, "%lf")              \
  SATOBJ(double, vy, "%lf")              \
  SATOBJ(double, vz, "%lf")              \
  SATOBJ(bool, visible, "%d")            \
  SATOBJ(double, period, "%lf")          \
  SATOBJ(double, unix_timestamp, "%lf")  \
  SATOBJ(double, ephemeris_start, "%lf") \
  SATOBJ(double, ephemeris_stop, "%lf")  \
  SATOBJ(double, ephemeris_step, "%lf") \
  SATOBJ(int, ephemeris_length, "%d") \
  SATOBJ(double*, ephemeris_ptr, "%p") \
  SATOBJ(int, ephemeris_start_idx, "%d") \
  SATOBJ(int, array_index, "%d")
struct SatObj
{
#define SATOBJ(type, name, format) type name;
  SATOBJ_FIELDS
#undef SATOBJ
  struct elsetrec satrec;
};
