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

all: ../../node_modules/uglify-js/bin/uglifyjs ../../client/bar.js  ../../client/d3.js  ../../client/d3.layout.js ../../client/domready.js ../../client/line.js ../../client/map.js ../../client/minedata.js ../../client/openlayers/OpenLayers.js ../../client/timeline/timeline_js/timeline-api.js ../../client/pie.js ../../client/sizzle.js ../../client/timeline.js ../../client/writetable.js ../../node_modules/jqtpl/lib/jqtpl.js
	echo "// Copyright 2012 Yaco Sistemas S.L. - Developed by <ablanco@yaco.es> - EUPL 1.1 License - http://joinup.ec.europa.eu/software/page/eupl" > dv-bundle.min.js
	echo "var exports = {};" >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/sizzle.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/d3.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/d3.layout.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../node_modules/jqtpl/lib/jqtpl.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/domready.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/writetable.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/minedata.js >> dv-bundle.min.js
	cat ../../client/openlayers/OpenLayers.js >> dv-bundle.min.js
	echo "Timeline_ajax_url='/timeline/timeline_ajax/simile-ajax-api.js';" >> dv-bundle.min.js
	echo "Timeline_urlPrefix='/timeline/timeline_js/';" >> dv-bundle.min.js
	echo "Timeline_parameters='bundle=true&defaultLocale=\'es\'';" >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/timeline/timeline_js/timeline-api.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/bar.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/line.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/map.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/pie.js >> dv-bundle.min.js
	$(UJS) $(UJSFLAGS) ../../client/timeline.js >> dv-bundle.min.js

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

clean: dv-bundle.min.js
	rm -f dv-bundle.min.js

cleanbundle: dv-bundle.js
	rm -f dv-bundle.js