#!/usr/bin/env bash
#
# Copyright (c) 2018. Beyondsoft Corporation. All Rights Reserved.
#
# BEYONDSOFT CONFIDENTIALITY
#
# The information in this file is confidential and privileged from Beyondsoft Corporation, which is intended only for
# use solely by Beyondsoft Corporation. Disclosure, copying, distribution, or use of the contents of this file by
# persons other than Beyondsoft Corporation is strictly prohibited and may violate applicable laws.
#
#########################################################################
# Build script to generate docker images
#
# @date: 2018-11-28
# @version: 1.0
# @author: robin.luo@beyondsoft.com
#
#########################################################################

## check parameters
if [[ $# -lt 2 ]]; then
    echo "Error: missing required parameters !!!!";
    echo "Usage: $0 {dev|qa|staging|preview|prod} {version}.{build_number}}...";
    exit 1;
fi

## docker image prefix, DONT change it please...
DOCKER_BASE_URL="10.8.7.63/1boyun_bpob"

## switch to work dir
work_dir=$(cd "$(dirname "$0")"; pwd);
cd ${work_dir}

## identify for target environment
target_env=$1

## build version, should be release version + '.' + build number. e.g. 1.0.0.188
build_version=$2

## project/module label, e.g. bpo-eshrsp-fe
project_label=bpo-eshrsp-fe

## docker image full name that will be generated.
target_image=10.8.7.63/1boyun_bpob/${project_label}:${build_version}.${target_env}

echo ">>> starting build process... project label is [${project_label}], target_env is [${target_env}], build_version is [${build_version}]..."

## install node dependencies
yarn install
if [[ $? -ne 0 ]]; then
    echo ">>> install node modules error, wait one minutes and retry..."
    sleep 20s;

    yarn install

    if [[ $? -ne 0 ]]; then
      echo ">>> retry to install node modules error, please check your network or use stable npm mirror config!"
      exit 1;
    fi
fi

## build dist files
yarn build:${target_env}
if [[ $? -ne 0 ]]; then
    echo ">>> build source code error, please fix build problems and try again !!!"
    exit 1;
fi
echo ">>> build source code done..."

## build docker image
docker build --no-cache --rm=true --force-rm=true -f Dockerfile -t ${target_image} .
if [[ $? -ne 0 ]]; then
    echo ">>> build image error, please fix build problems and try again !!!"
    exit 1;
fi
echo ">>> build docker image [${target_image}] done..."

## push docker image
docker push ${target_image}
if [[ $? -eq 0 ]]; then
    echo ">>> push docker image [${target_image}] done... "
fi
