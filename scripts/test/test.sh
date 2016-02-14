#!/bin/bash

# stop on first error
set -e;

echo "sails-hook-allowed-hosts";

# function to be called on exit
# and ensure cleanup is called before the script exits
function cleanup {
  unset REPORT_DIRECTORY;
  unset XUNIT_FILE;


  if [ "$?" != "0" ]; then
    exit 1;
  fi
}

trap cleanup EXIT;

# set directories and files for test and coverage report
export REPORT_DIRECTORY=".tmp";
export XUNIT_FILE="$REPORT_DIRECTORY/report.xml";

# create report directory
mkdir -p "$REPORT_DIRECTORY";

# run mocha tests
echo -e "\033[93mRunning sails/mocha unit tests...\033[0m";
echo -en "\033[0m\033[2mmocha `mocha --version`\033[0m";

# set mocha reporter
if [ "$CI" = "true" ]; then
  MOCHA_REPORTER="xunit";
  ISTANBUL_REPORT="--report lcovonly";
else
  MOCHA_REPORTER="spec";
  ISTANBUL_REPORT="";
fi

# delete old coverage report directory
[ -d .coverage ] && rm -rf .coverage && mkdir .coverage;

# run test
istanbul cover ${ISTANBUL_REPORT} --dir ./.coverage --print both _mocha -- \
  --reporter ${MOCHA_REPORTER} --reporter-options output=${XUNIT_FILE} \
  test/unit/**/*.test.js --recursive --grep "$1";
