#!/usr/bin/env bash
#
# Copyright (c) 2019. Beyondsoft Corporation. All Rights Reserved.
#
# BEYONDSOFT CONFIDENTIALITY
#
# The information in this file is confidential and privileged from Beyondsoft Corporation, which is intended only for
# use solely by Beyondsoft Corporation. Disclosure, copying, distribution, or use of the contents of this file by
# persons other than Beyondsoft Corporation is strictly prohibited and may violate applicable laws.
#
#########################################################################
# Tag docker image from one to another one, use for build qa+ images
#
# @date: 2019-09-25
# @version: 1.0
# @author: liufeifei02@beyondsoft.com
#
#########################################################################

## docker image prefix, DONT change it please...
DOCKER_BASE_URL="10.8.7.63/1boyun_bpob"

## aliyuncs image prefix, DONT change it please...
REMOTE_BASE_URL="registry.cn-beijing.aliyuncs.com/1boyun_bpob"

## project/module name, either eshrsp
project=''

## project/module label, either bpo-eshrsp-be
project_label=''

## identify for target image
target_env=''

## build version, should be release version + '.' + build number.
build_version=''

## flag for whether need to push image to remote repo, can be empty and default is true
skip_push='true'

## print help message.
show_usage() {
    echo "Usage: $0 --project={esomp|esbmp|esmmp|esfms|eshrsp} \
        --from-env={prod|staging|preview|qa|test|dev} \
        --target-env={prod|staging|preview|qa|test|dev} \
        --build-version={a.b.c.e.xyz} \
        --skip-push={true|false}"
    echo "Example 1:"
    echo "      $0 --project=esomp --from-env=qa --target-env=prod --build-version=1.0.0.518"
    echo "      will tag docker image on local from 'bpo-esomp-be:1.0.0.518.qa' to 'bpo-esomp-be:1.0.0.518.prod'"
    echo "Example 2:"
    echo "      $0 --project=esomp --from-env=qa --target-env=prod --build-version=1.0.0.518 --skip-push=false"
    echo "      will tag docker image on local from 'bpo-esomp-be:1.0.0.518.qa' to 'bpo-esomp-be:1.0.0.518.prod', and then push it to remote repo"
}

## check input parameter.
check_param() {
    if [[ -z "$1" ]]; then
        echo "Error: missing required parameter!"
        show_usage;
        exit 1;
    fi
}

## validate target env parameter.
check_project() {
    case "$1" in
        esomp)
            project_label="bpo-esomp-fe"
        ;;
        esbmp)
            project_label="bpo-esbmp-fe"
        ;;
        esmmp)
            project_label="bpo-esmmp-fe"
        ;;
        esfms)
            project_label="bpo-esfms-fe"
        ;;
        eshrsp)
            project_label="bpo-eshrsp-fe"
        ;;
        *)
            echo "Error: project parameter is not correct!"
            show_usage;
            exit 1;
        ;;
    esac
}

## validate target env parameter.
check_env() {
    case "$1" in
        prod)
        ;;
        staging)
        ;;
        preview)
        ;;
        qa)
        ;;
        test)
        ;;
        dev)
        ;;
        *)
            echo "Error: from or target env parameter is not correct!"
            show_usage;
            exit 1;
        ;;
    esac
}

## parse parameters from command line
PARAM=`getopt -o pj:bv:fe:te:wp -l project:,build-version:,from-env:,target-env:,skip-push: -- "$@"`
[[ $? != 0 ]] && show_usage && exit 1;

eval set -- "${PARAM}"

while :
do
    [[ -z "$1" ]] && break;
    case "$1" in
        pj|--project)
            project=$2; shift 2;
            ;;
        bv|--build-version)
            build_version=$2; shift 2;
            ;;
        fe|--from-env)
            from_env=$2; shift 2;
            ;;
        te|--target-env)
            target_env=$2; shift 2;
            ;;
        wp|--skip-push)
            skip_push=$2; shift 2;
            ;;
        --)
            shift;
            ;;
        *)
            show_usage && exit 1;
            ;;
    esac
done

## check required parameters
check_project ${project}
check_env ${target_env}
check_param ${build_version}

## work dir
work_dir=$(cd "$(dirname "$0")"; pwd);
cd ${work_dir}

image_tag="${project_label}:${build_version}.${target_env}"
source_image="${DOCKER_BASE_URL}/${image_tag}"
target_image="${REMOTE_BASE_URL}/${image_tag}"

## perform docker tag command
echo ">>> starting docker tag process... tag image from [${source_image}] to [${target_image}]..."
docker tag ${source_image} ${target_image}

if [[ $? -ne 0 ]]; then
    echo ">>> tag images error, please fix build problems and try again !!!"
    exit 1;
fi

echo ">>> tag docker image [${target_image}] done..."
docker images | grep ${project_label} | grep "${build_version}.${target_env}"

## push to remote repo
if [[ "${skip_push}" = "false" ]]; then
    docker push ${target_image}
    if [[ $? -eq 0 ]]; then
        echo ">>> push docker image [${target_image}] done... "
    fi
fi

