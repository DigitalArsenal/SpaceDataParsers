//#define GLM_ENABLE_EXPERIMENTAL 
#include <math.h>
//#include "SatObj.h"
#include "coverage/coverage.h"
#include <glm/vec3.hpp>
#include <glm/common.hpp>
#include <glm/mat3x3.hpp>
#include "glm/ext.hpp"

extern "C"
{
  // match Cesium WGS-84 Ellipsoid
  //Ellipsoid.WGS84 = Object.freeze(
  //new Ellipsoid(6378137.0, 6378137.0, 6356752.3142451793)
  //);
  double a_Earth = 6378.137; // matches Cesium
  double f = (6378137.0 - 6356752.3142451793) / 6378137.0;
  double R_pol = a_Earth*(1-f); // Polar radius [km]
  double tol;
  glm::dvec3 pos_proj;
  double eta_hor;
  double lambda_hor;

  // Get ellipsoid positions for coverage
  void getCoveragePositions(double *ecefPosition, int method, double angle, int vertexCount, double *positions)
  {
    glm::dvec3 r_SC = glm::dvec3(ecefPosition[0]*0.001, ecefPosition[1]*0.001, ecefPosition[2]*0.001);
    glm::dvec3 n_GEO = -glm::normalize(r_SC);

    coverage(a_Earth, R_pol, r_SC, angle, n_GEO, method, vertexCount, tol, pos_proj, eta_hor, lambda_hor, positions);
  }
}
