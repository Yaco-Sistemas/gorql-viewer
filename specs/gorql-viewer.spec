%define name gorql-viewer
%define user gorql
%define sourcedir $(echo $PWD)
%define installdir /opt/%{name}
%define docdir /usr/share/doc/%{name}-%{version}

Name: %{name}
Version: 1.0.2devel
Release: 2
Summary: GORQL Viewer executes SPARQL queries and shows the results
Packager: Alejandro Blanco <ablanco@yaco.es>
Group: Applications/Internet
License: EUPL 1.1 License
# Copyright 2012 Yaco Sistemas S.L.
URL: http://www.yaco.es
Source0: %{name}-%{version}.tar.gz
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
Requires: nodejs ImageMagick make

BuildRequires: nodejs
BuildRequires: npm
BuildRequires: make

%description
%{summary}

%prep
%setup -q
mkdir %{installdir}

%build
cp -R * %{installdir}
cd %{installdir}
mkdir .forever
npm install -d
cd %{installdir}/public/javascripts/
make all

# clean files not needed
rm -rf %{installdir}/.hg
rm -rf %{installdir}/docs
rm -rf %{installdir}/specs
rm -f %{installdir}/make_dev_rpm.sh
rm -f %{installdir}/public/embedded.html
rm -f %{installdir}/public/examples.html

%install
# move the rest to the build root
mkdir -p `dirname $RPM_BUILD_ROOT%{installdir}`
mkdir -p $RPM_BUILD_ROOT%{docdir}
mv %{installdir}/README.rst $RPM_BUILD_ROOT%{docdir}/
mv %{installdir}/CHANGES.rst $RPM_BUILD_ROOT%{docdir}/
mv %{installdir}/COPYING $RPM_BUILD_ROOT%{docdir}/
mv %{installdir} `dirname $RPM_BUILD_ROOT%{installdir}`/

# create empty directory to put symlinks later
mkdir -p $RPM_BUILD_ROOT/etc/%{name}

%clean
rm -rf $RPM_BUILD_ROOT

%files
%doc %{docdir}/README.rst
%doc %{docdir}/COPYING
%doc %{docdir}/CHANGES.rst
%{installdir}/client
%{installdir}/public
%{installdir}/routes
%{installdir}/views
%{installdir}/node_modules
%{installdir}/i18n
%attr(755,%{user},%{user}) %{installdir}/.forever
%{installdir}/app.js
%{installdir}/package.json
%config %attr(755,%{user},%{user}) %{installdir}/settings.js
/etc/%{name}
%attr(755,%{user},%{user}) %{installdir}/%{name}.sh

%pre
# check if this the first installation
if [ $1 = 1 ]; then
# create group and user
    getent group %{user} || groupadd -r %{user}
    getent passwd %{user} || useradd -d %{installdir} -g %{user} -M -r -s /sbin/nologin %{user}
fi

%post
if [ ! -e /etc/init.d/%{name} ]; then
    ln -s %{installdir}/%{name}.sh /etc/init.d/%{name}
fi

if [ ! -e /etc/%{name}/settings.js ]; then
    ln -s %{installdir}/settings.js /etc/%{name}/settings.js
fi

%preun
if [ $1 = 0 ]; then
   rm -f /etc/init.d/%{name}
   rm -f /etc/%{name}/settings.js
fi

%postun
if [ $1 = 0 ]; then
    getent passwd %{user} > /dev/null && userdel %{user}
fi

%changelog
* Mon Apr 30 2012 Alejandro Blanco <ablanco@yaco.es>
- Remove examples from the package

* Wed Apr 25 2012 Lorenzo Gil <lgs@yaco.es>
- Rename dataviewer for gorql-viewer

* Fri Jan 13 2012 Alejandro Blanco <ablanco@yaco.es>
- Initial version
