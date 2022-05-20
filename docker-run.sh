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

## where to place html files, DONT change it please...
WORK_DIR="/home/beyondsoft/bpo-fe/html"

## docker image prefix, DONT change it please...
DOCKER_BASE_URL="10.8.7.63/1boyun_bpob"

## docker remote image prefix, DONT change it please...
REMOTE_BASE_URL="registry.cn-beijing.aliyuncs.com/1boyun_bpob"

## identify for target environment
target_env=$1

## build version, should be release version + '.' + build number. e.g. 1.0.0.188
build_version=$2

## project/module label, e.g. bpo-esomp-fe or bpo-eshrsp-fe
project_label=bpo-eshrsp-fe

## validate target env parameter.
check_env() {
    case "$1" in
        prod)
            DOCKER_BASE_URL=${REMOTE_BASE_URL}
        ;;
        staging)
        ;;
        preview)
            DOCKER_BASE_URL=${REMOTE_BASE_URL}
        ;;
        qa)
        ;;
        test)
        ;;
        dev)
        ;;
        *)
            echo "Error: target-env parameter is not correct!"
            show_usage;
            exit 1;
        ;;
    esac
}

check_env ${target_env}

## docker image full name that will be generated.
target_image=${DOCKER_BASE_URL}/${project_label}:${build_version}.${target_env}

## clean up docker instance
clean_up_docker() {
  docker stop $1
  docker rm -f $1
}

## check target docker image from local and remote.
docker image ls ${target_image} | grep ${build_version}

if [[ $? -ne 0 ]]; then
    echo ">>> docker image [${target_image}] not found, will pull it from remote repo..."
    docker pull ${target_image}

    if [[ $? -ne 0 ]]; then
        echo ">>> docker image [${target_image}] not found on local and remote, please check your config!!!"
        exit 1;
    fi
fi

echo ">>> starting deploy process... project label is [${project_label}], target_env is [${target_env}], build_version is [${build_version}]..."

## clean up work dir
if [ ! -d "${WORK_DIR}" ]; then
  mkdir -p "${WORK_DIR}"
else
  rm -rf "${WORK_DIR}/${project_label}"
fi

if [[ $? -ne 0 ]]; then
    echo ">>> create deploy folder error, please fix permission problems and try again !!!"
    exit 1;
fi

clean_up_docker ${project_label}

docker run -d --name ${project_label} ${target_image}
docker cp ${project_label}:/${project_label} ${WORK_DIR}
if [[ $? -ne 0 ]]; then
    echo ">>> deploy [${project_label}] error, please fix env problems and try again !!!"
    exit 1;
fi

clean_up_docker ${project_label}

echo ">>> deploy [${project_label}] done, kindly reminder: please make sure you have nginx be configured and keep running..."
