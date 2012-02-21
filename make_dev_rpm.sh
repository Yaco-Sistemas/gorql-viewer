#!/bin/bash

PACKAGE="dataviewer"
CURRENT_DIR=`pwd`
BUILD_ROOT=/root/rpmbuild

if [ -d /tmp/${PACKAGE} ]
then
    cd /tmp/${PACKAGE}
    hg pull
    hg up default
else
    hg clone https://hg.yaco.es/ceic-ogov-data-viewer /tmp/${PACKAGE}
fi

cd ${CURRENT_DIR}

export LANG=C
REV=`hg parent | cut -d" " -f4 | cut -d":" -f1 | head -n 1`
VERSION=`grep "Version: " specs/${PACKAGE}.spec | cut -d" " -f2 | cut -d"h" -f1`
TAG="${VERSION}hg${REV}"

sed -i "s/Version: [0-9].[0-9].[0-9]hg[0-9]\+/Version: ${TAG}/g" specs/${PACKAGE}.spec

mv /tmp/${PACKAGE} /tmp/${PACKAGE}-${TAG}
tar cf ${PACKAGE}-${TAG}.tar /tmp/${PACKAGE}-${TAG}
mv /tmp/${PACKAGE}-${TAG} /tmp/${PACKAGE}
gzip ${PACKAGE}-${TAG}.tar

if [ -f ${BUILD_ROOT}/SOURCES/${PACKAGE}-${TAG}.tgz ]
then
    rm -f ${BUILD_ROOT}/SOURCES/${PACKAGE}-${TAG}.tgz
fi
ln -s ${CURRENT_DIR}/${PACKAGE}-${TAG}.tgz ${BUILD_ROOT}/SOURCES/

if [ -f ${BUILD_ROOT}/SPECS/${PACKAGE}.spec ]
then
    rm -f ${BUILD_ROOT}/SPECS/${PACKAGE}.spec
fi
ln -s ${CURRENT_DIR}/specs/${PACKAGE}.spec ${BUILD_ROOT}/SPECS/

cd ${BUILD_ROOT}/SPECS/
rm -rf ${BUILD_ROOT}/BUILD/${PACKAGE}-${TAG}*
rm -rf ${BUILD_ROOT}/BUILDROOT/*
rm -rf /opt/${PACKAGE}

rpmbuild -ba ${PACKAGE}.spec

cd ${CURRENT_DIR}
