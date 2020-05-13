#!/usr/bin/env bash

yarn run clean

echo "start building..."
lerna run build:scss
tsc -b ./packages
