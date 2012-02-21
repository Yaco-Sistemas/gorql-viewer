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

DV.map = function (viewport_id, data_container, options) {
    "use strict";

    var sizzle = Sizzle, // JSLint hack
        headers,
        results,
        container = document.createElement('div'),
        map,
        osm = new OpenLayers.Layer.OSM("Open Street Map"),
        markers = new OpenLayers.Layer.Markers("Markers"),
        size = new OpenLayers.Size(21, 25),
        icon = new OpenLayers.Icon(
            "/openlayers/img/marker.png",
            size,
            new OpenLayers.Pixel(-(size.w / 2), -size.h) // offset
        ),
        feature,
        marker,
        markerClick,
        aux,
        iconAux,
        lonlat,
        latIdx,
        longIdx,
        descriptionIdx,
        i;

    container.id = "ol_viewport";
    container.style.width = options.sizeX + 'px';
    container.style.height = options.sizeY + 'px';
    aux = sizzle(viewport_id)[0];
    aux.style.width = options.sizeX + 'px';
    aux.style.height = options.sizeY + 'px';
    aux.appendChild(container);

    map = new OpenLayers.Map("ol_viewport", {
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanZoomBar(),
            new OpenLayers.Control.LayerSwitcher()
        ]
    });
    map.addLayer(osm);
    map.addLayer(markers);

    aux = DV.extractData(data_container, options);
    headers = aux.headers;
    results = aux.results;

    // Get the indexes of the fields
    for (i = 0; i < headers.length; i += 1) {
        aux = headers[i];
        if (aux === options.lat) {
            latIdx = i;
        } else if (aux === options.long) {
            longIdx = i;
        } else if (aux === options.description) {
            descriptionIdx = i;
        }
    }

    if (latIdx === undefined || longIdx === undefined) {
        // abort
        return;
    }

    markerClick = function (evt) {
        if (this.popup === null || this.popup === undefined) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        } else {
            this.popup.toggle();
        }
        OpenLayers.Event.stop(evt);
    };

    for (i = 0; i < results.length; i += 1) {
        aux = results[i];
        lonlat = new OpenLayers.LonLat(parseFloat(aux[longIdx]), parseFloat(aux[latIdx]));
        lonlat.transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            map.getProjectionObject() // to Spherical Mercator Projection
        );
        iconAux = icon.clone();
        marker = new OpenLayers.Marker(lonlat, iconAux);
        markers.addMarker(marker);

        if (descriptionIdx !== undefined) {
            // Add bubbles
            feature = new OpenLayers.Feature(markers, lonlat);
            feature.closeBox = true;
            feature.popupClass = OpenLayers.Class(OpenLayers.Popup.Anchored, { 'autoSize': true });
            feature.data.popupContentHTML = "<span class='description bubble'>" + aux[descriptionIdx] + "</span>";
            feature.data.overflow = "auto";
            marker.events.register("mousedown", feature, markerClick);
        }
    }

    // Initialize map
    map.zoomToExtent(markers.getDataExtent());
};
