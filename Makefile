UJS=node_modules/uglify-js/bin/uglifyjs
UJSFLAGS=-nc

all: node_modules/uglify-js/bin/uglifyjs public/javascripts/bar.js  public/javascripts/d3.js  public/javascripts/d3.layout.js public/javascripts/domready.js public/javascripts/line.js public/javascripts/map.js public/javascripts/minedata.js public/javascripts/pie.js public/javascripts/sizzle.js public/javascripts/timeline.js public/javascripts/writetable.js node_modules/jqtpl/lib/jqtpl.js
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