#!/usr/bin/env bash

echo "start building..."
lerna run build:scss
tsc -b ./packages
