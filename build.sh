#!/usr/bin/env bash

yarn run clean

echo "start building..."
lerna run build:scss --scope=@reform/bulma
tsc -b ./packages
