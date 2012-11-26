#!/bin/bash

PACKAGE="gorql-viewer"
CURRENT_DIR=`pwd`
BUILD_ROOT=/root/rpmbuild
TAG="1.4.0"

if [ -d /tmp/${PACKAGE} ]
then
    cd /tmp/${PACKAGE}
    git pull origin master
else
    git clone git://github.com/Yaco-Sistemas/gorql-editor.git /tmp/${PACKAGE}
    cd /tmp/${PACKAGE}
fi
git checkout ${TAG}

cd /tmp/
mv ${PACKAGE} ${PACKAGE}-${TAG}
tar cvf ${CURRENT_DIR}/${PACKAGE}-${TAG}.tar ${PACKAGE}-${TAG}
mv ${PACKAGE}-${TAG} ${PACKAGE}
gzip ${CURRENT_DIR}/${PACKAGE}-${TAG}.tar

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
