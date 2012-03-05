/*jslint vars: false, browser: true */
/*global OpenLayers, DV, Sizzle, Base64 */

// Copyright 2012 Yaco Sistemas S.L.
//
// Developed by Yaco Sistemas <ablanco@yaco.es>
//
// Licensed under the EUPL, Version 1.1 or – as soon they
// will be approved by the European Commission - subsequent
// versions of the EUPL (the "Licence");
// You may not use this work except in compliance with the
// Licence.
// You may obtain a copy of the Licence at:
//
// http://joinup.ec.europa.eu/software/page/eupl
//
// Unless required by applicable law or agreed to in
// writing, software distributed under the Licence is
// distributed on an "AS IS" basis,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied.
// See the Licence for the specific language governing
// permissions and limitations under the Licence.

if (!DV) {
    var DV = {};
}

DV.initMapea = function (host) {
    "use strict";
    DV.mapeaKMLHost = host;
};

DV.mapea = function (viewport_id, data_container, options) {
    "use strict";

    var sizzle = Sizzle, // JSLint hack
        viewport = sizzle(viewport_id)[0],
        iframe = document.createElement('iframe'),
        url = "http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/templateMapeaOL.jsp?wmcfile=http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml*Callejero,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto2009.xml*Ortofoto&controls=scaleline,panzoombar,layerswitcher,mouse,navtoolbar,measurebar",
        data = {};

    if (DV.mapeaKMLHost === undefined) {
        DV.mapeaKMLHost = "";
    }

// url += "&layers=KML*Hoteles*http://www.rumbo.es/hotel/espana/sevilla/sevilla/hoteles-sevilla/*s.kml*true";

    url += "&layers=KML*Results*" + DV.mapeaKMLHost + "/kml/*?data=";
    data.query = "PREFIX%20owl%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2002%2F07%2Fowl%23%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20foaf%3A%20%3Chttp%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2F%3E%0APREFIX%20dc%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0APREFIX%20%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2F%3E%0APREFIX%20dbpedia2%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fproperty%2F%3E%0APREFIX%20dbpedia%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2F%3E%0APREFIX%20skos%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0APREFIX%20dbo%3A%20%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2F%3E%0ASELECT%20%3Fname%20%3Flat%20%3Flong%0AWHERE%20%7B%0A%20%20%20%20%20%3Fcity%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fsubject%3E%20%3Chttp%3A%2F%2Fdbpedia.org%2Fresource%2FCategory%3AGerman_state_capitals%3E%20.%0A%20%20%20%20%20%3Fcity%20rdfs%3Alabel%20%3Fname%20.%0A%20%20%20%20%20%3Fcity%20geo%3Alat%20%3Flat%20.%0A%20%20%20%20%20%3Fcity%20geo%3Along%20%3Flong%20.%0A%20%20%20%20%20FILTER%20(LANG(%3Fname)%20%3D%20'de')%20.%0A%7D%0AORDER%20BY%20%3Fname";
    data.lat = options.lat;
    data.long = options.long;
    data.description = options.description;
    data = Base64.encode(JSON.stringify(data));
    url += data + ".kml*true";

    viewport.style.width = options.sizeX + 'px';
    viewport.style.height = options.sizeY + 'px';
    iframe.style.width = options.sizeX + 'px';
    iframe.style.height = options.sizeY + 'px';

    iframe.src = url;

    viewport.appendChild(iframe);
};
