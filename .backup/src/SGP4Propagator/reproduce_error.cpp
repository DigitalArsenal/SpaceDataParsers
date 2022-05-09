#define GLM_ENABLE_EXPERIMENTAL
#include <math.h>
#include <glm/vec3.hpp>
#include <glm/common.hpp>
#include <glm/mat3x3.hpp>
#include "coverage/coverage.h"
#include <iostream>
#include "glm/ext.hpp"
	
const glm::dvec3 SAT_POS[] = {
glm::dvec3(2334391.479114225/1000.0, -6144432.3190111555/1000.0, 2173323.5014757607/1000.0)
};

int main() {
  double a_Earth = 6378.137; //Earth semi-major axid [km]
  double R_eq = a_Earth;                     // Equatorial radius [km]
  double f = 1/298.257223563;                // Earth flattening

  double R_pol = a_Earth*(1-f); // Polar radius [km]
  double epsilon = 10.0;
  int N = 50;

  // returned values
  double tol;
  glm::dvec3 pos_proj; 
  double eta_hor; 
  double lambda_hor; 
  std::vector<double> P_in; 
  P_in.resize(50 * 6);

  for (int p=0; p<1; ++p) {
    glm::dvec3 r_SC = SAT_POS[p];
    glm::dvec3 n_GEO = -glm::normalize(r_SC);
    int type = 0;

    coverage(R_eq, R_pol, r_SC, epsilon, n_GEO, type, N, tol, pos_proj, eta_hor, lambda_hor, P_in.data());

    std::cout << "INPUT POSITION FOR ELEVATION: " << glm::to_string(r_SC) << std::endl;
    for (int i = 0; i < P_in.size(); i+=3) { 
      std::cout << "P: " << P_in[i] << " " << P_in[i+1] << " " << P_in[i+2] << std::endl;
    }

    type = 1;
    coverage(R_eq, R_pol, r_SC, epsilon, n_GEO, type, N, tol, pos_proj, eta_hor, lambda_hor, P_in.data());
    std::cout << "INPUT POSITION HALF APERTURE: " << glm::to_string(r_SC) << std::endl;
    for (int i = 0; i < P_in.size(); i+=3) {
      std::cout << "P: " << P_in[i] << " " << P_in[i+1] << " " << P_in[i+2] << std::endl;
    }
  }

  return 0;
}
