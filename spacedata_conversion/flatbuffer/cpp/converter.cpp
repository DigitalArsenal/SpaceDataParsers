#include "include/flatbuffers/flatbuffers.h"
#include "OMM.h"
#include "stdio.h"
#include "iostream"
#include "fstream"
#include "sys/stat.h"
#include "experimental/filesystem"

/*
{
  NORAD_CAT_ID: 23581,
  MEAN_MOTION: 1.00273272,
  ECCENTRICITY: 0.0005013,
  INCLINATION: 3.0539,
  RA_OF_ASC_NODE: 81.7939,
  MEAN_ANOMALY: 150.1602,
  BSTAR: 0.0001,
  USER_DEFINED_EPOCH_TIMESTAMP: 2454195.9407572453
}
*/
using namespace std;

int main()
{
    flatbuffers::FlatBufferBuilder builder(1024);
    MPEBuilder mpe_builder(builder);
    mpe_builder.add_NORAD_CAT_ID(23581);
    mpe_builder.add_MEAN_MOTION(1.00273272);
    mpe_builder.add_ECCENTRICITY(0.0005013);
    mpe_builder.add_INCLINATION(3.0539);
    mpe_builder.add_RA_OF_ASC_NODE(81.7939);
    mpe_builder.add_MEAN_ANOMALY(150.1602);
    mpe_builder.add_BSTAR(0.0001);
    mpe_builder.add_USER_DEFINED_EPOCH_TIMESTAMP(2454195.9407572453);
    auto mpe_satrec = mpe_builder.Finish();
    builder.Finish(mpe_satrec);
    uint8_t *buf = builder.GetBufferPointer();
    cout << (long)buf << "\n";
    int size = builder.GetSize();
    printf("%lu bytes\n", (ulong)size);
    const char *filename = "MPE_SAMPLE.fbs";

    FILE *write_ptr;
    write_ptr = fopen(filename, "wb");
    fwrite(buf, size, 1, write_ptr);
    fclose(write_ptr);

    try
    {
        printf("%lu bytes on disk.\n", std::experimental::filesystem::file_size(filename)); // attempt to get size of a directory
    }
    catch (std::experimental::filesystem::filesystem_error &e)
    {
        std::cout << e.what() << '\n';
    }
}
