#!/bin/bash

# stop on first error
set -e;

if [ -d ./.coverage ] && [ -f ./coverage/lcov.info ]; then
  cat ./.coverage/lcov | coveralls;
fi
