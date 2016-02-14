#!/bin/bash

# stop on first error
set -e;

# run style checker
jscs index.js test;

# run static linter
echo;
jshint index.js test;
echo -en "No lint errors found.\n";
