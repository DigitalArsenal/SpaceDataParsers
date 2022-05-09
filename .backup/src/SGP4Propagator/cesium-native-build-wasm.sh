#!/bin/bash
git clone https://github.com/CesiumGS/cesium-native
cd cesium-native
git submodule update --init --recursive
# Disable error on warnings
sed -i "s/ -Werror//g" CMakeLists.txt
# Disable DOCs
sed -i "s/add_subdirectory.doc./#add_subdirectory(doc)/" CMakeLists.txt
# Don't use DRACO WASM customized build
sed -i "s/^if.EMSCRIPTEN.*/if(0)/g" extern/draco/CMakeLists.txt

export EMMAKEN_CFLAGS="-sINITIAL_MEMORY=1GB -sALLOW_MEMORY_GROWTH=1 -sFORCE_FILESYSTEM=1"
emcmake cmake -B build -S . 
cmake --build build

node  ./build/CesiumNativeTests/cesium-native-tests.js -?
node  ./build//CesiumNativeTests/cesium-native-tests.js --list-tests

rm -rf ./cesium-native/package.json