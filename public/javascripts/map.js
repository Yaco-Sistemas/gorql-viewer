/*jslint vars: false, browser: true */
/*global OpenLayers */

function initMap(fields, headers, results, viewport_id, options) {
    "use strict";
    var map = new OpenLayers.Map(viewport_id),
        osm = new OpenLayers.Layer.OSM("Open Street Map"),
        markers = new OpenLayers.Layer.Markers("Markers"),
        size = new OpenLayers.Size(21, 25),
        icon = new OpenLayers.Icon(
            "/openlayers/img/marker.png",
            size,
            new OpenLayers.Pixel(-(size.w / 2), -size.h)
        ),
        aux,
        latIdx,
        longIdx,
        i;

    // Get the indexes of the fields
    for (i = 0; i < headers.length; i += 1) {
        aux = headers[i];
        if (aux === fields.lat) {
            latIdx = i;
        } else if (aux === fields.long) {
            longIdx = i;
        }
    }

    if (latIdx === undefined || longIdx === undefined) {
        // abort
        return;
    }

    for (i = 0; i < results.length; i += 1) {
        aux = results[i];
        markers.addMarker(
            new OpenLayers.Marker(
                new OpenLayers.LonLat(
                    parseFloat(aux[longIdx]),
                    parseFloat(aux[latIdx])
                ),
                icon.clone()
            )
        );
    }

    // Initialize map
    map.addLayer(osm);
    map.setCenter(new OpenLayers.LonLat(0, 0), 0);
    map.addLayer(markers);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.zoomToMaxExtent();
}