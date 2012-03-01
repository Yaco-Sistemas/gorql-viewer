/*jslint vars: false, browser: true */
/*global OpenLayers, DV, Sizzle */

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

DV.initMap = function (host) {
    "use strict";
    OpenLayers.ImgPath = host + "/javascripts/img/";
};

DV.mapea = function (viewport_id, data_container, options) {
    "use strict";

    var sizzle = Sizzle, // JSLint hack
        viewport = sizzle(viewport_id)[0],
        iframe = document.createElement('iframe'),
        url = "http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/templateMapeaOL.jsp?wmcfile=http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml*Callejero,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto2009.xml*Ortofoto&controls=scaleline,panzoombar,layerswitcher,mouse,navtoolbar,measurebar";

    url += "&layers=KML*Hoteles*http://www.rumbo.es/hotel/espana/sevilla/sevilla/hoteles-sevilla/*s.kml*true"

// http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/templateMapeaOL.jsp?wmcfile=http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml*Callejero,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto2009.xml*Ortofoto&controls=scaleline,panzoombar,layerswitcher,mouse,navtoolbar,measurebar

// http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/templateMapeaOL.jsp?wmcfile=http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml*Callejero,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto2009.xml*Ortofoto&layers=KML*Arboles*http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/kml/*arbda_sing_se.kml*true&controls=scaleline,panzoombar,layerswitcher,mouse,navtoolbar,measurebar

    viewport.style.width = options.sizeX + 'px';
    viewport.style.height = options.sizeY + 'px';
    iframe.style.width = options.sizeX + 'px';
    iframe.style.height = options.sizeY + 'px';

    iframe.src = url;

    viewport.appendChild(iframe);
};
