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

echo "New version: ${TAG}"

sed -i "s/Version: [0-9].[0-9].[0-9]hg[0-9]\+/Version: ${TAG}/g" specs/${PACKAGE}.spec

mv /tmp/${PACKAGE} /tmp/${PACKAGE}-${TAG}
cd /tmp/
tar cf ${PACKAGE}-${TAG}.tar ${PACKAGE}-${TAG}
mv -f ${PACKAGE}-${TAG}.tar ${CURRENT_DIR}/
cd ${CURRENT_DIR}
mv /tmp/${PACKAGE}-${TAG} /tmp/${PACKAGE}
gzip ${PACKAGE}-${TAG}.tar

if [ -f ${BUILD_ROOT}/SOURCES/${PACKAGE}-${TAG}.tar.gz ]
then
    rm -f ${BUILD_ROOT}/SOURCES/${PACKAGE}-${TAG}.tar.gz
fi
ln -s ${CURRENT_DIR}/${PACKAGE}-${TAG}.tar.gz ${BUILD_ROOT}/SOURCES/

if [ -f ${BUILD_ROOT}/SPECS/${PACKAGE}.spec ]
then
    rm -f ${BUILD_ROOT}/SPECS/${PACKAGE}.spec
fi
ln -s ${CURRENT_DIR}/specs/${PACKAGE}.spec ${BUILD_ROOT}/SPECS/

cd ${BUILD_ROOT}/SPECS/
rm -rf ${BUILD_ROOT}/BUILD/*
rm -rf ${BUILD_ROOT}/BUILDROOT/*
rm -rf /opt/${PACKAGE}
rm -rf /var/tmp/*
npm cache clean

rpmbuild -ba ${PACKAGE}.spec

cd ${CURRENT_DIR}
