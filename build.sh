#!/usr/bin/env bash

yarn run clean

echo "start building..."
lerna run build:scss --scope=@reform/components
tsc -b ./packages
