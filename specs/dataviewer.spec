%define name dataviewer
%define sourcedir $(echo $PWD)
%define installdir /opt/%{name}
%define docdir /usr/share/doc/%{name}-%{version}

Name:          %{name}
Version:       0.0.1
Release:       1
Summary:       Data Viewer executes SPARQL queries and shows the results
Packager:      Alejandro Blanco <ablanco@yaco.es>
Group:         Applications/Internet
License:       EUPL License
URL:           http://www.yaco.es
Source0:       %{name}-%{version}.tar.gz
BuildRoot:     %{_tmppath}/%{name}-%{version}-%{release}-root
Requires:      nodejs

BuildRequires: nodejs
BuildRequires: npm

%description
%{summary}

%prep
%setup -q
mkdir %{installdir}

%build
cp -R * %{installdir}
cd %{installdir}
npm install -d

# clean files not needed
rm -rf %{installdir}/docs
rm -rf %{installdir}/specs

%install
# install forever globally in the system
npm install -g forever

# move the rest to the build root
mkdir -p `dirname $RPM_BUILD_ROOT%{installdir}`
mkdir -p $RPM_BUILD_ROOT%{docdir}
mv %{installdir}/INSTALL.rst $RPM_BUILD_ROOT%{docdir}/
mv %{installdir} `dirname $RPM_BUILD_ROOT%{installdir}`/

# create empty directory to put symlinks later
mkdir -p $RPM_BUILD_ROOT/etc/%{name}

%clean
rm -rf $RPM_BUILD_ROOT

%files
%doc %{docdir}/INSTALL.rst
%{installdir}/public
%{installdir}/routes
%{installdir}/views
%{installdir}/node_modules
%{installdir}/app.js
%{installdir}/package.json
%{installdir}/settings.js
/etc/%{name}
%{installdir}/%{name}.sh
%attr(755,%{name},%{name}) %{installdir}/%{name}.sh
# %config %{installdir}/parts/supervisor/supervisord.conf

%pre
# check if this the first installation
if [ $1 = 1 ]; then
# create group and user
    getent group %{name} || groupadd -r %{name}
    getent passwd %{name} || useradd -d %{installdir} -g %{name} -M -r -s /sbin/nologin %{name}
fi

%post
if [ ! -e /etc/init.d/%{name} ]; then
    ln -s %{installdir}/%{name}.sh /etc/init.d/%{name}
fi

# if [ ! -e /etc/%{name}/supervisord.conf ]; then
#     ln -s %{installdir}/parts/supervisor/supervisord.conf /etc/%{name}/supervisord.conf
# fi

%preun
if [ $1 = 0 ]; then
   rm -f /etc/init.d/%{name}
#    rm -f /etc/%{name}/supervisord.conf
fi

%postun
if [ $1 = 0 ]; then
    getent passwd %{name} > /dev/null && userdel %{name}
fi

%changelog

* Fri Jan 13 2012 Alejandro Blanco <ablanco@yaco.es>
- Initial version
