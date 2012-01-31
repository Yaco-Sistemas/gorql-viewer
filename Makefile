UJS=node_modules/uglify-js/bin/uglifyjs
UJSFLAGS=-nc

all: public/javascripts/bar.js  public/javascripts/d3.js  public/javascripts/d3.layout.js public/javascripts/domready.js public/javascripts/line.js public/javascripts/map.js public/javascripts/minedata.js public/javascripts/pie.js public/javascripts/sizzle.js
	$(UJS) $(UJSFLAGS) public/javascripts/bar.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/d3.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/d3.layout.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/domready.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/line.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/map.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/minedata.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/pie.js >> public/javascripts/dv-bundle.min.js
	$(UJS) $(UJSFLAGS) public/javascripts/sizzle.js >> public/javascripts/dv-bundle.min.js

clean: public/javascripts/dv-bundle.min.js
	rm -f public/javascripts/dv-bundle.min.js