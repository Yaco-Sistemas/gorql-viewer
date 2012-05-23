%define name forever
%define installdir /tmp/%{name}

Name: %{name}
Version: 0.9.1
Release: 1
Summary: A simple CLI tool for ensuring that a given node script runs continuously (i.e. forever)
Packager: Alejandro Blanco <ablanco@yaco.es>
Group: Applications/Internet
License: MIT License
URL: https://github.com/nodejitsu/forever
Source: %{name}-%{version}.tgz
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root
Requires: nodejs = 0.6.17
BuildRequires: nodejs = 0.6.17, npm

%description
%{summary}

%prep
rm -rf %{installdir}
mkdir %{installdir}

%build
cd %{installdir}
npm install $RPM_SOURCE_DIR/%{name}-%{version}.tgz

%install
mkdir -p $RPM_BUILD_ROOT%{_prefix}/lib/node_modules/
mv %{installdir}/node_modules/%{name} $RPM_BUILD_ROOT%{_prefix}/lib/node_modules/

%clean
rm -rf $RPM_BUILD_ROOT

%files
%{_prefix}/lib/node_modules/%{name}
%attr(755,root,root) %{_prefix}/lib/node_modules/%{name}/bin/%{name}
%attr(755,root,root) %{_prefix}/lib/node_modules/%{name}/bin/%{name}d

%post
if [ ! -e %{_bindir}/%{name} ]; then
    ln -s %{_prefix}/lib/node_modules/%{name}/bin/%{name} %{_bindir}/%{name}
fi

if [ ! -e %{_bindir}/%{name}d ]; then
    ln -s %{_prefix}/lib/node_modules/%{name}/bin/%{name}d %{_bindir}/%{name}d
fi

%preun
if [ $1 = 0 ]; then
   rm -f %{_bindir}/%{name}
   rm -f %{_bindir}/%{name}d
fi

%changelog
* Tue May 22 2012 Alejandro Blanco <ablanco@yaco.es>
- Initial version
