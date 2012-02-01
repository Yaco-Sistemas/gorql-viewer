# Copyright 2012 Junta de Andalucia
#
# Developed by Yaco Sistemas <ablanco@yaco.es>
#
# Licensed under the EUPL, Version 1.1 or – as soon they
# will be approved by the European Commission - subsequent
# versions of the EUPL (the "Licence");
# You may not use this work except in compliance with the
# Licence.
# You may obtain a copy of the Licence at:
#
# http://joinup.ec.europa.eu/software/page/eupl
#
# Unless required by applicable law or agreed to in
# writing, software distributed under the Licence is
# distributed on an "AS IS" basis,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
# express or implied.
# See the Licence for the specific language governing
# permissions and limitations under the Licence.

UJS=node_modules/uglify-js/bin/uglifyjs
UJSFLAGS=-nc

all: node_modules/uglify-js/bin/uglifyjs public/javascripts/bar.js  public/javascripts/d3.js  public/javascripts/d3.layout.js public/javascripts/domready.js public/javascripts/line.js public/javascripts/map.js public/javascripts/minedata.js public/javascripts/pie.js public/javascripts/sizzle.js public/javascripts/timeline.js public/javascripts/writetable.js node_modules/jqtpl/lib/jqtpl.js
	echo "// Copyright 2012 Junta de Andalucia - Developed by Yaco Sistemas - License EUPL 1.1 - http://joinup.ec.europa.eu/software/page/eupl" >> public/javascripts/dv-bundle.min.js
	echo "var exports = {};" >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/sizzle.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/d3.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/d3.layout.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) node_modules/jqtpl/lib/jqtpl.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/domready.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/writetable.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/minedata.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/bar.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/line.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/map.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/pie.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/timeline.js >> public/javascripts/dv-bundle.min.js

bundle: public/javascripts/bar.js  public/javascripts/d3.js  public/javascripts/d3.layout.js public/javascripts/domready.js public/javascripts/line.js public/javascripts/map.js public/javascripts/minedata.js public/javascripts/pie.js public/javascripts/sizzle.js public/javascripts/timeline.js public/javascripts/writetable.js node_modules/jqtpl/lib/jqtpl.js
	echo "var exports = {};" >> public/javascripts/dv-bundle.js
	cat public/javascripts/sizzle.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/d3.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/d3.layout.js >> public/javascripts/dv-bundle.js
	cat node_modules/jqtpl/lib/jqtpl.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/domready.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/writetable.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/minedata.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/bar.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/line.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/map.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/pie.js >> public/javascripts/dv-bundle.js
	cat public/javascripts/timeline.js >> public/javascripts/dv-bundle.js

clean: public/javascripts/dv-bundle.min.js
	rm -f public/javascripts/dv-bundle.min.js

cleanbundle: public/javascripts/dv-bundle.js
	rm -f public/javascripts/dv-bundle.js