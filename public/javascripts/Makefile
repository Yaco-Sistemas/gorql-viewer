# Copyright 2012 Yaco Sistemas S.L.
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

UJS=../../node_modules/uglify-js/bin/uglifyjs
UJSFLAGS=-nc

all: dv-core dv-d3 dv-time dv-openlayers
	cat dv-core.js > dv.min.js
	cat dv-d3.js >> dv.min.js
	cat dv-time.js >> dv.min.js
	cat dv-openlayers.js >> dv.min.js

dv-core: ../../node_modules/uglify-js/bin/uglifyjs ../../client/sizzle.js ../../client/writetable.js ../../client/minedata.js ../../client/domready.js ../../node_modules/jqtpl/lib/jqtpl.js
	echo "// Copyright 2012 Yaco Sistemas S.L. - Developed by <ablanco@yaco.es> - EUPL 1.1 License - http://joinup.ec.europa.eu/software/page/eupl" > dv-core.js
	echo "var exports = {};" >> dv-core.js
	$(UJS) $(UJSFLAGS) ../../client/sizzle.js >> dv-core.js
	$(UJS) $(UJSFLAGS) ../../client/domready.js >> dv-core.js
	$(UJS) $(UJSFLAGS) ../../node_modules/jqtpl/lib/jqtpl.js >> dv-core.js
	$(UJS) $(UJSFLAGS) ../../client/writetable.js >> dv-core.js
	$(UJS) $(UJSFLAGS) ../../client/minedata.js >> dv-core.js

dv-d3: dv-core ../../client/d3.js ../../client/d3.layout.js ../../client/bar.js ../../client/line.js ../../client/pie.js
	$(UJS) $(UJSFLAGS) ../../client/d3.js > dv-d3.js
	$(UJS) $(UJSFLAGS) ../../client/d3.layout.js >> dv-d3.js
	$(UJS) $(UJSFLAGS) ../../client/bar.js >> dv-d3.js
	$(UJS) $(UJSFLAGS) ../../client/line.js >> dv-d3.js
	$(UJS) $(UJSFLAGS) ../../client/pie.js >> dv-d3.js

dv-time: dv-core ../../client/timeline/timeline_js/timeline-api.js ../../client/timeline.js
	cp -R ../../client/timeline/timeline_ajax .
	cp -R ../../client/timeline/timeline_js .
	echo "Timeline_ajax_url='/javascripts/timeline_ajax/simile-ajax-api.js';" > dv-time.js
	echo "Timeline_urlPrefix='/javascripts/timeline_js/';" >> dv-time.js
	echo "Timeline_parameters='bundle=true&defaultLocale=\'es\'';" >> dv-time.js
	$(UJS) $(UJSFLAGS) ../../client/timeline/timeline_js/timeline-api.js >> dv-time.js
	$(UJS) $(UJSFLAGS) ../../client/timeline.js >> dv-time.js

dv-openlayers: dv-core ../../client/openlayers/OpenLayers.js ../../client/map.js
	cp -R ../../client/openlayers/img .
	cp -R ../../client/openlayers/theme .
	cat ../../client/openlayers/OpenLayers.js > dv-openlayers.js
	$(UJS) $(UJSFLAGS) ../../client/map.js >> dv-openlayers.js

clean: dv.min.js dv-core.js dv-d3.js dv-time.js dv-openlayers.js
	rm -f dv.min.js
	rm -f dv-core.js
	rm -f dv-d3.js
	rm -f dv-time.js
	rm -f dv-openlayers.js
	rm -rf img
	rm -rf theme
	rm -rf timeline_ajax
	rm -rf timeline_js

dv-custom: dv-core
	cat dv-core.js > dv-custom.js # dv-core is mandatory, not optional
	# Add the 'cat' commands you need to append (>>) the dv-files you want
	# in your custom bundle. Don't forget to add the rules of those files
	# to this rule, so the corresponding js files get built

cleancustom: dv-custom.js
	rm -f dv-custom.js

bundle: ../../client/bar.js  ../../client/d3.js  ../../client/d3.layout.js ../../client/domready.js ../../client/line.js ../../client/map.js ../../client/minedata.js ../../client/openlayers/OpenLayers.js ../../client/timeline/timeline_js/timeline-api.js ../../client/pie.js ../../client/sizzle.js ../../client/timeline.js ../../client/writetable.js ../../node_modules/jqtpl/lib/jqtpl.js
	echo "var exports = {};" > dv-bundle.js
	cat ../../client/sizzle.js >> dv-bundle.js
	cat ../../client/d3.js >> dv-bundle.js
	cat ../../client/d3.layout.js >> dv-bundle.js
	cat ../../node_modules/jqtpl/lib/jqtpl.js >> dv-bundle.js
	cat ../../client/domready.js >> dv-bundle.js
	cat ../../client/writetable.js >> dv-bundle.js
	cat ../../client/minedata.js >> dv-bundle.js
	cat ../../client/openlayers/OpenLayers.js >> dv-bundle.js
	echo "Timeline_ajax_url='/timeline/timeline_ajax/simile-ajax-api.js';" >> dv-bundle.js
	echo "Timeline_urlPrefix='/timeline/timeline_js/';" >> dv-bundle.js
	echo "Timeline_parameters='bundle=true&defaultLocale=\'es\'';" >> dv-bundle.js
	cat ../../client/timeline/timeline_js/timeline-api.js >> dv-bundle.js
	cat ../../client/bar.js >> dv-bundle.js
	cat ../../client/line.js >> dv-bundle.js
	cat ../../client/map.js >> dv-bundle.js
	cat ../../client/pie.js >> dv-bundle.js
	cat ../../client/timeline.js >> dv-bundle.js

cleanbundle: dv-bundle.js
	rm -f dv-bundle.js