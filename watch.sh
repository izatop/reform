#!/usr/bin/env bash

echo "start watching..."
lerna run build:scss --scope=@reform/bulma -- --watch&
tsc -b ./packages -w&

trap 'kill $(jobs -pr)' SIGINT SIGTERM EXIT

wait
