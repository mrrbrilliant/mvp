#!/bin/bash

cd student
npm install
npm run build

cp out/make/*.AppImage ..

cd ../teacher
npm install
npm run build

cp out/make/*.AppImage ..