/* Copyright (c) 2006-2008 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires Mapea/Util.js
 * @requires Mapea/Map.js
 * @requires OpenLayers/Util.js
 * @requires OpenLayers/Events.js
 * @requires OpenLayers/Tween.js
 * @requires OpenLayers/Console.js
 *
 */

/**
 * Class: Mapea.SigcMapea Instances of Mapea.SigcMapea are interactive
 * maps embedded in a web page. Create a new map with the <Mapea.SigcMapea>
 * constructor.
 *
 * To define the different WMC files by default, use the three properties below.
 * You must to specific these files separates by comma <,>:
 * contexto - context name
 * url - service URL
 * title - context title to show in a button
 *
 * Inherits from: - <OpenLayers.Map>
 */
Mapea.SigcMapea = OpenLayers.Class({

 /*****************************************************************************************/
 /**/                                                      								/**/
 /* /                          WMC FILES PROPERTIES BY DEFAULT         					/* /
 /**/                                                      								/**/
 /**/  contexto: 'callejero,ortofoto,idea,ortofoto09'                               	/**/
,/**/  url: 'http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto.xml,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextIDEA.xml,http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextOrtofoto2009.xml'
,/**/  title: 'mapa del callejero, mapa ortofoto, mapa idea, mapa ortofoto09'           /**/
,/**/                                                      								/**/
 /*****************************************************************************************/


	/**
	* Variables for search funcionality
	*/

	swCallejero: 'http://www.juntadeandalucia.es/servicios/mapas/callejero/geocoder/services/callejero?wsdl',

	arrayRoadsType: null,

	arrayServicesType: null,

	arrayStreet: null,

	arrayLocality: null,

	arrayLocFromProv: null,

	arrayOu: null,

	arrayServices: null,

	arrayRoads: null,

	layer_style : null,

	style_blue : null,

	style_green : null,

	style_mark : null,

	callejeroProxy: null,

	vectorlayer : null,

	buttons: new Array(),
	/**
	 * Property: noStringAttributes
	 */
	noStringAttributes: new Array(),

	/**
	 * Property: dateAttributes
	 */
	dateAttributes: new Array(),

	/**
	 * Property: dateTimeAttributes
	 */
	dateTimeAttributes: new Array(),

	/**
	 * Property: timeAttributes
	 */
	timeAttributes: new Array(),

	/**
	 * Property: durationAttributes
	 */
	durationAttributes: new Array(),

	/**
	 * Property: geomColumn
	 */
	geomColumn: null,

	/**
	 * Property: geomColumnDef
	 */
	geomColumnDef: false,

	/**
	 * Property: noStrAttributes
	 */
	noStrAttributes: new Array(),

	/**
	 * Property: attributionWfsLayer
	 */
	attributionWfsLayer: new Array(),

	/**
	 * Property: contextBase
	 */
	contextBase: {
		url: null,
		title: null
	},

	/**
	 * Property: contextBaseHasButton
	 */
	contextBaseHasButton: false,

	/**
	 * Property: wfsLayers
	 */
	wfsLayers: new Array(),

	/**
	 * Property: queryableLayers
	 */
	queryableLayers: new Array(),

	/**
	 * Property: clearUnsavedOper
	 */
	clearUnsavedOper: null,


	/**
	 * Property: addition
	 */
	addition: 0,

	/**
	 * Property: featureInfoGML
	 */
	featureInfoGML: false,

	/**
	 * Property: featureInfoAdded
	 */
	featureInfoAdded: false,

	/**
	 * Property: multipleType
	 */
	multipleType: false,

	/**
	 * Property: wmsFullArray
	 */
	wmsFullArray: new Array(),

	/**
	 * Property: listExtentLayers
	 */
	listExtentLayers: new Array(),

	/**
	 * Property: extractAttributes
	 */
	extractAttributes: false,

	/**
	 * APIProperty: ticket
	 * {String} user session ticket.
	 */
	ticket: null,

   /**
	* Property: contextButtonsDiv
	* {DOMElement} element that contains the buttons to change the defined contexts.
	*/
	contextButtonsDiv: null,

	/**
 	* Property: measureDiv
 	* {DOMElement} element that contains the measure information when 'measurebar' control is activated.
 	*/
	measureDiv: null,

	/**
	 * Property: contextUrls
	 * {Array(String)} Array with the context urls.
	 */
	contextUrls: new Array(),

	/**
	 * Property: contextTitles
	 * {Array(String)} Array with the context titles.
	 */
	contextTitles: new Array(),

	/**
	 * Property: strLon
	 * {String} Longitude
	 */
	 strLon: null,

	/**
	 * Property: strLat
	 * {String} Latitude
	 */
	 strLat: null,

	/**
	 * Property: editAttribute
	 * {Mapea.Control.EditAttributeFeature_sigc} .
	 */
	 editAttribute: null,

	/**
	 * Property: schema
	 * {Schema} .
	 */
	 schema: null,

	/**
	 * Property: wfsLayer
	 * {Mapea.Layer.WFS_sigc} .
	 */
	 wfsLayer: null,

	/**
	 * Property: wfsreq
	 * {Mapea.Util.WFSrequest} .
	 */
	 wfsreq: null,

	/**
	 * Property: typeN
	 * {String} .
	 */
	 typeN: null,

	/**
	 * Property: strFilterfeaturesid
	 * {String} .
	 */
	 strFilterfeaturesid: null,

	/**
	 * Property: layerAux
	 * {String} .
	 */
	 layerAux: null,

	/**
	 * v: featureT
	 * {String} .
	 */
	 featureT: null,

	/**
	 * Property: handlerType
	 * {Function} .
	 */
	 handlerType: null,

	/**
	 * Property: loadLayerWFST
	 * {Boolean} It indicates if the wfs layer is loaded.
	 */
	 loadLayerWFST: false,

	/**
	 * Property: kmlLayers
	 * {Array(Mapea.Layer)} .
	 */
	kmlLayers: new Array(),

	/**
	 * Property: listLayerExtern
	 * {Array(Mapea.Layer.WMS)} .
	 */
	listLayerExtern: new Array(),

	/**
	 * Property: query
	 * {Query} .
	 */
	query: false,

	/**
	 * Property: info
	 * {Mapea.Control.GetLayersInfo_sigc} .
	 */
	info: null,

	/**
	 * Property: hasContextLoaded
	 * {Boolean} It indicates if the context is loaded.
	 */
	hasContextLoaded: false,

	/**
	 * Property: hasBaseLayer
	 * {Boolean} It indicates if the base layer is loaded.
	 */
	hasBaseLayer: false,

	/**
	 * APIProperty: map
	 * {Mapea.Map} the main map to show.
	 */
	map: null,

	/**
	 * Property: wmc
	 * { } wmc file to load.
	 */
	wmc: null,

	/**
	 * APIProperty: version
	 * {Object} SigcMapea API version.
	 */
	version: {
		v: '2.1.0',
		d: '02/08/2011'
	},

	/**
	 * Property: sgcmOptionsDefault
	 * {Object} SigcMapea defaults options
	 */
	sgcmOptionsDefault: {
		projectionDefault: 'EPSG:23030*m',
		wmcfileDefault: ['http://www.juntadeandalucia.es/servicios/mapas/mapea/Componente/mapConfig/contextCallejero.xml*Callejero'],
		layersDefault: null,
		controlsDefault: ['panzoom'],
		centerDefault: '0,0',
		zoomDefault: '0',
		labelDefault: null,
		bboxDefault: '0,0,0,0',
		getfeautreinfoDefault: null,
		maxExtentDefault: null
	},

	/**
	 * Property: sgcmOptions
	 * {Object} SigcMapea options
	 */
	sgcmOptions: {
		projection: null,
		wmcfile: null,
		layers: null,
		controls: null,
		center: null,
		zoom: null,
		label: null,
		bbox: null,
		getfeautreinfo: null,
		maxExtent: null
	},

	/**
	 * Property: error
	 * {Boolean} It indicates if there are any errors.
	 */
	error: false,

	/**
	 * Property: sgcmDiv
	 * {DOMElement} - The contaniner that the map should be rendered to.
	 */
	sgcmDiv: null,

	/**
     * Method: unloadDestroy
     * Function that is called to destroy the map on page unload. stored here
     *     so that if map is manually destroyed, we can unregister this.
     */
	unloadDestroy: null,

	/**
     * Constructor: Mapea.SigcMapea
     * Constructor for a new Mapea.SigcMapea instance.There are many possible
     * ways to call the map constructor. See the examples below.
     *
     * Parameters:
     * div - {DOMElement|String} The container that the map should be rendered to.
     *                           If different than the current container, the map
     *                           viewport will be moved from the current to the new container.
     * projection - {String} Optional parameter. Set in the map options to override the default projection string
     *                       this map. Default is "EPSG:23030".
     * wmcfile - {Array(String)} Optional parameter. The WMC files to use.
     * layers - {Array(String)} Optional parameter. The layers to add to this.map.
     * controls - {Array(String)} Optional parameter. The controls to add to this.map.
     * center - {String} Optional parameter. Coordenada X,Y del punto donde se centrará en mapa. Si se especifica junto
     *                   con el parámetro zoom, se centrará a la coordenada dada al nivel de zoom especificado.
     * zoom - {Integer} Optional parameter. Especifica el nivel de zoom con el que se quiere visualizar el mapa. El máximo es 16.
     * label - {String} Optional parameter. Se usa una cadena de texto que será visualizada como html en un popup
     *                  centrado en las coordenadas especificadas por el parámetro center.
     * bbox - {String} Optional parameter. String representation of bounds object.
     * getfeatureinfo - {String} Optional parameter. Get Obtiene información asociada a cada una de las capas consultables
     *                           de la coordenada especificada. Valores = {plain|gml}
     *
     * Examples:
     * (code)
     * // create a map with default options in an element with the id "map1"
     * var map = new Mapea.SigcMapea("map1");
     *
     * // create a map with a WMC file and two wms layers in an element with the id "map2"
     * var map = new Mapea.SigcMapea({
     *     div: 'map2',
     *     projection: '23030*m',
     *     wmcfile: {'http://url/contextCallejero.xml*Callejero'},
     *     layers: {'WMS*nombre_capa_leyenda_capa1*url_servicio_capa1*nombre_capa_capa1*transparencia_capa1,tileado_capa1',
     *              'WMS*nombre_capa_leyenda_capa2*url_servicio_capa2*nombre_capa_capa2*transparencia_capa2,tileado_capa2'},
     *     controls: {'panzoombar', 'layerswitcher'}
     *     });
     *
     * // create a map with a WMC file, a WMS_FULL layer and a KML layer
		// centrada en una coordenaada y en un determinado nivel in an element
		// with the id "map3"
     * var map = new Mapea.SigcMapea({
     *     div: 'map3'
     *     wmcfile: {'http://url/contextCallejero.xml*Callejero'}
     *     layers: {'WMS_FULL*url_servicio1*tileado','KML*nombre_capa_leyenda_capa1*url_servicio_capa1*nombre_capa_capa1*extraer*atributos_capa1'},
     *     controls: {'navtoolbar','measurebar','mouse'},
     *     center: '2563214,4125421',
     *     zoom: 7
     *     });
     * (end)
     */
    initialize: function(param){
		IEpath(); //path for IE to support 'indexOf' on Arrays.
        this.listExtentLayers = new Array();
        this.contextUrls = new Array();
        this.contextTitles = new Array();
        this.sgcmOptions.wmcfile=null;

// PARAMETERS START
		if(typeof(param) == 'string'){
    		this.sgcmDiv = OpenLayers.Util.getElement(param);
    		this.sgcmOptions.projection = this.sgcmOptionsDefault.projectionDefault;
    		this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
    		this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
    		this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
    		this.sgcmOptions.center = this.sgcmOptionsDefault.centerDefault;
    		this.sgcmOptions.zoom = this.sgcmOptionsDefault.zoomDefault;
    		this.sgcmOptions.label = this.sgcmOptionsDefault.labelDefault;
    		this.sgcmOptions.bbox = this.sgcmOptionsDefault.bboxDefault;
    		this.sgcmOptions.getfeautreinfo = this.sgcmOptionsDefault.getfeautreinfoDefault;
    	}else{
    		if (param.div.nodeType && param.div.nodeType == 1) {
    			this.sgcmDiv = param.div;
    			if(!this.sgcmDiv.id)
    				this.sgcmDiv.id = OpenLayers.Util.createUniqueID('sigcMapeaDiv_');
    		}else{
    			this.sgcmDiv = OpenLayers.Util.getElement(param.div);
    		}

    		//check if there is any base layers (its transparent attribute is false)
    		var isBaseLayer = false;
    		if(param.layers){
    			var layerSize = param.layers.length;
    			for(var i=0; i<layerSize; i++){
    				var layer = param.layers[i].split('*');
    				if(layer.length == 5 || layer.length == 6){
    					layer[0] = layer[0].toUpperCase();
    					if (layer[0].indexOf('WMS') != -1){
    						if (layer[4] && layer[4].toLowerCase() == 'false'){
    							isBaseLayer = true;
    							break;
    						}
    					}
    				}else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){
    					isBaseLayer = true;
    					break;
   					}
    			}
    		}


      	// PROJECTION =========================================================================
    		if(param.projection){
    			if(typeof param.projection != 'string')
    				window.alert('SigcMapea.constructor: El parámetro projection debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.projection);
    			else
    				this.sgcmOptions.projection = param.projection;
    		}else{
    			this.sgcmOptions.projection = this.sgcmOptionsDefault.projectionDefault;
    		}
    	// WMC FILE =========================================================================
    		if(param.wmcfile){
    			if(!isArray(param.wmcfile)){
    				window.alert('SigcMapea.constructor: El parámetro wmcfile debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.wmcfile);
    			}else if(isArray(param.wmcfile) && ((param.wmcfile.length == 0) || (param.wmcfile.length == 1 && param.wmcfile[0] == ''))){
	    			if(!param.layers ||!isBaseLayer ){
	    				this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
	    			}
    			}else{
    				this.sgcmOptions.wmcfile = param.wmcfile;
    			}
    		}else if(!param.layers || !isBaseLayer){
    			this.sgcmOptions.wmcfile = this.sgcmOptionsDefault.wmcfileDefault;
    		}
      	// LAYERS =========================================================================
    		if(param.layers){
    			if(!isArray(param.layers))
    				window.alert('SigcMapea.constructor: El parámetro layers debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.layers);
    			else if(isArray(param.layers) && ((param.layers.length == 0) || (param.layers.length == 1 && param.layers[0] == '')))
    				this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
    			else
    				this.sgcmOptions.layers = param.layers;
    		}else{
    			//OpenLayers.Control.prototype.initialize.apply(this, arguments);
    			this.sgcmOptions.layers = this.sgcmOptionsDefault.layersDefault;
    		}
       	// CONTROLS =========================================================================
    		if(param.controls){
    			if(!isArray(param.controls))
    				window.alert('SigcMapea.constructor: El parámetro controls debe ser un Array de String y se ha introducido un parámetro tipo: '+ typeof param.controls);
    			else if(isArray(param.controls) && ((param.controls.length == 0) || (param.controls.length == 1 && param.controls[0] == '')))
    				this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
    			else
    				this.sgcmOptions.controls = param.controls;
    		}else{
    			this.sgcmOptions.controls = this.sgcmOptionsDefault.controlsDefault;
    		}
       	// CENTER =========================================================================
    		if(param.center){
    			if(typeof param.center != 'string')
    				window.alert('SigcMapea.constructor: El parámetro center debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.center);
    			else
    				this.sgcmOptions.center = param.center;
    		}else{
    			this.sgcmOptions.center = this.sgcmOptionsDefault.centerDefault;
    		}
       	// ZOOM =========================================================================
    		if(param.zoom){
    			if(isNaN(param.zoom))
    				window.alert('SigcMapea.constructor: El parámetro zoom debe ser un número válido y se ha introducido el valor: '+ param.zoom);
    			else
    				this.sgcmOptions.zoom = param.zoom;
    		}else{
    			this.sgcmOptions.zoom = this.sgcmOptionsDefault.zoomDefault;
    		}
       	// LABEL ================================================================================
    		if(param.label){
    			if(typeof param.label != 'string')
    				window.alert('SigcMapea.constructor: El parámetro label debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.label);
    			else
    				this.sgcmOptions.label = param.label;
    		}else{
    			this.sgcmOptions.label = this.sgcmOptionsDefault.labelDefault;
    		}
      	// BBOX ==================================================================================
    		if(param.bbox){
    			if(typeof param.bbox != 'string')
    				window.alert('SigcMapea.constructor: El parámetro bbox debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.bbox);
    			else
    				this.sgcmOptions.bbox = param.bbox;
    		}else{
    			this.sgcmOptions.bbox = this.sgcmOptionsDefault.bboxDefault;
    		}
       	// GETFEATUREINFO =========================================================================
    		if(param.getfeatureinfo){
    			if(typeof param.getfeatureinfo != 'string')
    				window.alert('SigcMapea.constructor: El parámetro bbox debe ser un String y se ha introducido un parámetro tipo: '+ typeof param.getfeatureinfo);
    			else
    				this.sgcmOptions.getfeatureinfo = param.getfeatureinfo;
    		}else{
    			this.sgcmOptions.getfeatureinfo = this.sgcmOptionsDefault.getfeatureinfoDefault;
    		}
       	//=========================================================================================
    	}

// PARAMETERS END



// STARTING MAP BUILDER

		OpenLayers.Events.prototype.includeXY = true;
	    OpenLayers.ProxyHost=location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';

/** #################################### WMC FILE #########################################################*/
		if(this.sgcmOptions.wmcfile){
			//A new context is loaded.
			var wmcfileSize = this.sgcmOptions.wmcfile.length;
			var contextTmp = null;
			var file = '';

			for(var i=0; i<wmcfileSize ;i++){
				file = this.sgcmOptions.wmcfile[i];
				contextTmp = file.split('*');
				if(contextTmp.length == 1){ //Context is predefined in the properties on top
					var urls = this.url.split(',');
					var titles = this.title.split(',');
					var contexts = this.contexto.split(',');
					for(var e=0; e<contexts.length; e++){
						if(contexts[e] == contextTmp){
							this.contextBase.url = urls[e]+'&mapeaop=wmc';
							this.contextBase.title = titles[e];
							this.contextUrls[i] = urls[e]+'&mapeaop=wmc';
							this.contextTitles[i] = titles[e];
							break;
						}
					}
				}else if(contextTmp.length == 2){
					if(i == 0){
						this.contextBase.url = contextTmp[0]+'&mapeaop=wmc';
						this.contextBase.title = contextTmp[1];
					}
					this.contextUrls[i]=contextTmp[0]+'&mapeaop=wmc';
					this.contextTitles[i]=contextTmp[1];
				}else{
					alert('Error: El formato del context (' + file + ') no se reconoce.');
					this.error = true;
				}
			}

			if(!this.error){
				this.wmc = new Mapea.Format.WMC({layerOptions : {buffer :0 , numZoomLevels: 16}});

				// create the map ----------------------
				var request = new OpenLayers.Ajax.Request(this.contextUrls[0], {asynchronous :false});
				if (request) {
					try {
				 		this.map = this.wmc.read(request.transport.responseText, {map : this.sgcmDiv.id, controls: [new OpenLayers.Control.PanZoomBar()], numZoomLevels: 6});
						this.map.restrictedExtent = this.map.maxExtent;
			        }catch (err) {
						alert(err);
						this.error = true;
					}
				}
				//-----------------------------------------

				this.map.units = this.map.baseLayer.units;
				if(this.sgcmOptions.projection && this.sgcmOptions.projection != this.sgcmOptionsDefault.projectionDefault){
					var projUn = this.sgcmOptions.projection.split('*');
					if(projUn[1].toLowerCase() == 'd'){
						projUn[1]='degrees';
					}
					var origSRS = this.map.projection;
					var destSRS = projUn[0];
	                if(origSRS!=destSRS){
	                	var srcProj = new OpenLayers.Projection(origSRS);
	                	var dstProj = new OpenLayers.Projection(destSRS);
	                	var oldExtent = this.map.getExtent();

	                	this.map.setOptions({projection:new OpenLayers.Projection(destSRS)});
	    		     	this.map.setOptions({displayProjection:new OpenLayers.Projection(destSRS)});
	    		     	this.map.units = projUn[1].toLowerCase();

	    		     	var oldMaxExtent = this.map.maxExtent;
	    		       	var newMaxExtent = oldMaxExtent.transform(srcProj,dstProj);
	                 	this.map.maxExtent = newMaxExtent;
	    		     	this.map.restrictedExtent = newMaxExtent;
	    		     	var newExtent = oldExtent.transform(srcProj,dstProj);
	    		     	var newCenter = this.map.getCenter().transform(srcProj, dstProj);
	    		     	var newZoom = this.map.getZoomForExtent(newExtent, true);
	    		     	this.map.setCenter(newCenter, newZoom, false, true);

	    			 	for (i=0;i<this.map.getNumLayers();i++){
	    			 		var layer = this.map.layers[i];
	    			 		layer.projection= new OpenLayers.Projection(destSRS);
	    			 		layer.maxExtent = newMaxExtent;
	    			 		layer.units = projUn[1];
	    			 		layer.options.units = projUn[1];
	    			 		layer.initResolutions();
	    			 	}
	                }
				}

				var id = OpenLayers.Util.createUniqueID('contextButtonsDiv');
	    		this.contextButtonsDiv = OpenLayers.Util.createDiv(id);
	    		this.contextButtonsDiv.style.zIndex='100000';
	    		this.contextButtonsDiv.style.position='relative';
	    		this.contextButtonsDiv.style.top='0px';
	    		this.contextButtonsDiv.style.marginLeft='50px';

	    		this.map.viewPortDiv.appendChild(this.contextButtonsDiv);
				this.hasBaseLayer = true;
				this.hasContextLoaded = true
				if(this.contextUrls.length>1){
					addContextButtons(this.contextUrls, this.contextTitles, this.contextButtonsDiv, this.sgcmDiv, this.wmc, this.map, this.loadLayerWFST, this.wfsLayer, this.listLayerExtern, this.kmlLayers, this.buttons, this.attachedContext);
					this.contextBaseHasButton = true;
				}
			}
			var maxExtentLayer = this.map.maxExtent;
            this.listExtentLayers.push(maxExtentLayer);
		}


/**############################################# LAYERS #######################################################*/
		if(this.sgcmOptions.layers && !this.error){
			if(!this.hasContextLoaded){
				//a new map is created
				var projUn = this.sgcmOptions.projection.split('*');
				if(projUn[1].toLowerCase() == 'd' || projUn[1].toLowerCase() == 'degrees'){
					projUn[1] = 'degrees';
				}
				if( projUn.length == 2 )
					this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: projUn[1].toLowerCase(), maxResolution:'auto', projection: projUn[0]});
				else
				    this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: 'UNDEFINED', maxResolution:'auto', projection: 'UNDEFINED'});
			}
			//layers are added to map
			var layers = this.sgcmOptions.layers;
			var layerSize = this.sgcmOptions.layers.length;
			var projUn = this.sgcmOptions.projection.split('*');
			var srs = projUn[0];
			for(var i=0; i<layerSize; i++){
				var layer = layers[i].split('*');
				if(layer.length == 5 || layer.length == 6){
					layer[0] = layer[0].toUpperCase();

					// WMS
					if (layer[0].indexOf('WMS') != -1){
						var strTransparent = false;
						var strSingleTile = false;
						if (layer[4]){
							strTransparent = layer[4].toLowerCase() == 'true';
						}
						if (!strTransparent && !this.hasBaseLayer){
							this.hasBaseLayer = true;
						}

						if (layer.length == 6){
							if (layer[5].toLowerCase() == 'false'){
								strSingleTile = true;
							}
						}

						var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3],srs);
						
						if(maxExtentLayer != -1){
						this.listExtentLayers.push(maxExtentLayer);
						var newLayerOL = new Mapea.Layer.WMS(layer[1],layer[2],{layers: layer[3], transparent: strTransparent},{singleTile: strSingleTile, ratio: 1, queryable: this.query});

						var QL = {id: newLayerOL.id, tagname: layer[1], url: layer[2], name: layer[3], transparent: strTransparent, tile: strSingleTile, srs: srs};
						this.queryableLayers.push(QL);

						this.map.addLayer(newLayerOL);
						this.listLayerExtern.push(newLayerOL);
                        }
					// KML
					}else if (layer[0].indexOf("KML") != -1){
						this.extractAttributes = false;

						if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
							this.extractAttributes = (layer[4].toLowerCase() == 'true');
						}
						var newLayerOL = new Mapea.Layer.GML(layer[1],layer[2] + layer[3] + '&mapeaop=kml',{format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: this.extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}});
						this.map.addLayer(newLayerOL);
						this.listLayerExtern.push(newLayerOL);

						if (this.extractAttributes){
							var numLayers = this.map.getNumLayers();
							this.kmlLayers.push(this.map.layers[numLayers-1]);
						}

					// WFS
					}else if (layer[0].indexOf('WFST') != -1){


						 //In a called to the mapea only can defined a wfst layer for editing.
						layer[4] = layer[4].toUpperCase();

						if (layer[4] == 'POINT'){
							this.loadLayerWFST = true;
							this.handlerType = OpenLayers.Handler.Point;
							this.multipleType = false;
						}else if (layer[4] == 'LINE'){
							this.loadLayerWFST = true;
							this.handlerType = OpenLayers.Handler.Path;
							this.multipleType = true;
						}else if (layer[4] == 'POLYGON'){
							this.loadLayerWFST = true;
							this.handlerType = OpenLayers.Handler.Polygon;
							this.multipleType = true;
						}else{
							window.alert('Error: El tipo de capa WFS no se reconoce. Los tipos disponibles son: POINT, LINE, POLYGON.');
							this.error = true;
						}
						this.featureT = layer[4];
						if(layer.length >= 6){
							this.layerAux = layer[3].substring(layer[3].indexOf(':')+1);
							var FeaturesidNames = layer[5].split('-');
							this.strFilterfeaturesid = ',featureid: ' + this.layerAux + "." + FeaturesidNames[0];
							for (var index = 1; index < FeaturesidNames.length; index++){
								this.strFilterfeaturesid = this.strFilterfeaturesid + ',' + this.layerAux + '.' + FeaturesidNames[index];
							}
							this.strFilterfeaturesid = this.strFilterfeaturesid+"'";

						}
						else{
							this.strFilterfeaturesid = '';
						}

						//typeName can not contain Namespace id.
						var begin = layer[3].indexOf(':');
						if(begin != -1)
							this.typeN = layer[3].substring(begin+1);
						else
							this.typeN = layer[3];

						if (this.loadLayerWFST){
							this.wfsreq = new Mapea.Util.WFSrequest(layer[2],layer[3]);
							this.wfsreq.requestLayers();
							this.schema = this.wfsreq.getSchema();
			/**************************************************************************************/
							this.attributionWfsLayer = new Array();
						 	var noStringAttributes = new Array();
						 	this.dateAttributes = new Array();
						 	this.dateTimeAttributes = new Array();
						 	this.timeAttributes = new Array();
						 	this.durationAttributes = new Array();
						 	var type = null;
						 	this.geomColumnDef = false;
						 	// Insert into the vector the names of feature's attributes
						 	for(i=0;i<this.schema.featureTypes[0].properties.length;i++){
						 		type = this.schema.featureTypes[0].properties[i].localType;
						 		if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType"){
						 			this.attributionWfsLayer.push(this.schema.featureTypes[0].properties[i].name);
						 			if(type == "dateTime"){
						 				this.dateTimeAttributes.push(this.schema.featureTypes[0].properties[i].name);
						 			}
						 			else if(type == "date"){
						 				this.dateAttributes.push(this.schema.featureTypes[0].properties[i].name);
						 			}
						 			else if(type == "time"){
						 				this.timeAttributes.push(this.schema.featureTypes[0].properties[i].name);
						 			}
						 			else if(type == "duration"){
						 				this.durationAttributes.push(this.schema.featureTypes[0].properties[i].name);
						 			}
						 		}
						 		else{
						 			//Save the name of geometry column
						 			this.geomColumnDef = true;
						 			this.geomColumn = this.schema.featureTypes[0].properties[i].name;
						 		}
						 		//Check if the attribute's type is integer.
						 		if(this.schema.featureTypes[0].properties[i].localType == "int" || this.schema.featureTypes[0].properties[i].localType == "float" || this.schema.featureTypes[0].properties[i].localType == "double" || this.schema.featureTypes[0].properties[i].localType == "decimal"
						 			|| this.schema.featureTypes[0].properties[i].localType == "short" || this.schema.featureTypes[0].properties[i].localType == "byte" || this.schema.featureTypes[0].properties[i].localType == "integer" || this.schema.featureTypes[0].properties[i].localType == "long"
						 			|| this.schema.featureTypes[0].properties[i].localType == "negativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonNegativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonPositiveInteger" || this.schema.featureTypes[0].properties[i].localType == "positiveInteger"
						 			|| this.schema.featureTypes[0].properties[i].localType == "unsignedLong" || this.schema.featureTypes[0].properties[i].localType == "unsignedInt" || this.schema.featureTypes[0].properties[i].localType == "unsignedShort" || this.schema.featureTypes[0].properties[i].localType == "unsignedByte"){
						 			this.noStringAttributes.push(this.schema.featureTypes[0].properties[i].name)
						 		}
						 	}
			/*************************************************************************************/
							var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3],srs);
							if( maxExtentLayer != -1){
								this.listExtentLayers.push(maxExtentLayer);
							}	
							
							if(this.geomColumnDef){
								this.wfsLayer = new Mapea.Layer.WFS_sigc(this.clearUnsavedOper, layer[1],layer[2],{typename: this.typeN + this.strFilterfeaturesid},{typename: this.typeN, featureNS: this.schema.targetNamespace, extractAttributes: true, geometry_column: this.geomColumn});
							}else{
								this.wfsLayer = new Mapea.Layer.WFS_sigc(this.clearUnsavedOper, layer[1],layer[2],{typename: this.typeN + this.strFilterfeaturesid },{typename: this.typeN, featureNS: this.schema.targetNamespace, extractAttributes: true});
							}
							this.wfsLayer.setAttributesNames(this.attributionWfsLayer);
							this.wfsLayer.commitReport = function(response) {
								if (response.indexOf('SUCCESS') != -1) {
									window.alert('Operación realizada correctamente.');
								}else{
									window.alert('La operación solicitada no se ha podido realizar.');
								}
								OpenLayers.Console.log('commit realizado por capa WFST.');
								};
							if(maxExtentLayer != -1){
								this.map.addLayer(this.wfsLayer);
								var selectFeatureWFS = new OpenLayers.Control.SelectFeature(this.wfsLayer,{});
						   	    this.map.addControl(selectFeatureWFS);
						   	    selectFeatureWFS.activate();
						    	strLayerName = selectFeatureWFS;
						    }
						}
					}else{
						window.alert('Error: El tipo de layer ('+ layers[0] + ') no está soportado. Consulte los servicios disponibles con action=getServicesAvailable.');
						this.error = true;
					}

				}else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){ //Format: WMS_FULL-urlService-singletile(optional)
					this.hasBaseLayer = true;
					var strSingleTile = 'false';
					if (layer.length == 3){
						if (layer[2] == 'false'){
							strSingleTile = 'true';
						}
					}

					var wmsFull = new Mapea.Util.WMSfull_sigc(this.map, layer[1] + '&mapeaop=wmsfull');
					wmsFull.setOptions({singleTile: strSingleTile});
					var maxExtentLayer = wmsFull.getBoundingBoxEnvolved(layer[1],srs);
					if( maxExtentLayer != -1){
					this.listExtentLayers.push(maxExtentLayer);
					wmsFull.addServiceToMap();
					this.wmsFullArray.push(wmsFull);}
				}else {
					window.alert('Error: El formato del layer (' + layers[i] + ') no se reconoce.');
					this.error = true;
				}
			}
		}
/**-----------------------------------------------------------------------------------------------------------*/
		var maxExtentEnvolved=getMaxExtentEnvolved(this.listExtentLayers);
		this.map.baseLayer.maxExtent = maxExtentEnvolved;
		this.map.setOptions({maxExtent: maxExtentEnvolved});
		this.map.setOptions({restrictedExtent: maxExtentEnvolved});

	    // Reset layers resolutions
	    for (i=0;i<this.map.getNumLayers();i++){
	        var layer = this.map.layers[i];
		 	if(!layer.isBaseLayer){
		 		layer.projection = this.map.baseLayer.projection;
		 		layer.maxExtent = this.map.baseLayer.maxExtent;
		 		layer.units = this.map.baseLayer.units;
		 	}
		 	layer.initResolutions();
	    }
/**-----------------------------------------------------------------------------------------------------------*/

	    if(this.extractAttributes){
			//KML select feature
	    	//var selectFeatureKML = new OpenLayers.Control.SelectFeature(kmlLayers,{onSelect: onFeatureSelect(feature,map), onUnselect: onFeatureUnselect(feature,map)});
			selectFeatureKML = new OpenLayers.Control.SelectFeature(this.kmlLayers,{onSelect: function(feature) {
			     var selectedFeature = feature;
			     var html = "";
			     for(var i in feature.attributes){
			        if (i == "name" ){
			        		html += "<h2>" + feature.attributes[i] + "</h2>";
			        }else if ( i == "description"){
			        		html += feature.attributes[i];
			        }else{
			        }
			     }

			     popup = new Mapea.Popup.FramedCloud("popup_feature",
			                              feature.geometry.getBounds().getCenterLonLat(),
			                             new OpenLayers.Size(400,300),
			                             html,
			                             null, true, function PopupClose(){strLayerName.unselect(selectedFeature);});
			     feature.popup = popup;
			     this.map.addPopup(popup);
			 }, onUnselect: function(feature) {
			      this.map.removePopup(feature.popup);
			      feature.popup.destroy();
			      feature.popup = null;
			  }});
		    this.map.addControl(selectFeatureKML);
		    selectFeatureKML.activate();
		    strLayerName = selectFeatureKML;
		}

/**############################################# CONTROLS ####################################################*/
		if(this.sgcmOptions.controls && !this.error){
			//this.addControls(this.sgcmOptions.controls);
			//Controls are added to map.
			var controlsToEditionPanel = new Array();
			var controlEditionAttribute = false;
			var editSelected = false;

			for(var i=0; i<this.sgcmOptions.controls.length;i++){
				if (this.sgcmOptions.controls[i] == 'panzoombar'){
					this.map.addControl(new Mapea.Control.PanZoomBar());
				}
				else if (this.sgcmOptions.controls[i] == 'panzoom'){
					this.map.addControl(new Mapea.Control.PanZoom());
				}
				else if (this.sgcmOptions.controls[i] == 'layerswitcher'){
					this.map.addControl(new Mapea.Control.LayerSwitcher_sigc(null,this.map));
				}
				else if (this.sgcmOptions.controls[i] == 'mouse'){
					this.map.addControl(new OpenLayers.Control.MousePosition());
				}
				else if (this.sgcmOptions.controls[i] == 'navtoolbar'){
					this.map.addControl(new Mapea.Control.NavToolbar_sigc({displayClass:'olControlNavToolbar'}));
					this.addition = this.addition + 1;
				}
				else if (this.sgcmOptions.controls[i] == 'overviewmap'){
					var optionsOverviewmap = {projection:this.map.getProjection(),units:this.map.getUnits(),singleTile:true,maxExtent:this.map.getMaxExtent()};
					this.map.addControl(new Mapea.Control.OverviewMap({mapOptions: optionsOverviewmap}));
				}
				else if (this.sgcmOptions.controls[i] == 'navigation'){
				    this.map.addControl(new OpenLayers.Control.Navigation());
				}
				else if (this.sgcmOptions.controls[i] == 'measurebar'){
					this.addition = this.addition + 2;
					createMeasurePanel(this.measureDiv,this.map, this.addition);
				}
				else if (this.sgcmOptions.controls[i] == 'scale'){
					this.map.addControl(new Mapea.Control.Scale());
 				}
 				else if (this.sgcmOptions.controls[i] == 'scaleline'){
 					this.map.addControl(new OpenLayers.Control.ScaleLine());
				}
				else if ((this.sgcmOptions.controls[i] == 'drawfeature') && this.loadLayerWFST){
					var draw = new Mapea.Control.DrawFeature_sigc(this.dateTimeAttributes,this.dateAttributes,this.timeAttributes,this.durationAttributes,this.noStringAttributes,this.wfsLayer, this.handlerType,{id: 'drawfeature', title: 'Dibujar elemento',displayClass: 'MapeaControlDrawFeature',handlerOptions: {multi: this.multipleType}});
					controlsToEditionPanel.push(draw);
				}
				else if ((this.sgcmOptions.controls[i] == 'modifyfeature') && this.loadLayerWFST){
					var edit = new OpenLayers.Control.ModifyFeature(this.wfsLayer,{id: 'modifyfeature', title: 'Modificar elemento',displayClass: 'olControlModifyFeature'});
					controlsToEditionPanel.push(edit);
				}
				else if ((this.sgcmOptions.controls[i] == 'deletefeature') && this.loadLayerWFST){
					var del = new Mapea.Control.DeleteFeature(this.wfsLayer, {id: 'deletefeature', title: 'Eliminar elemento', displayClass: 'MapeaControlDeleteFeature'});
					controlsToEditionPanel.push(del);
				}
				else if ((this.sgcmOptions.controls[i] == 'editattribute') && this.loadLayerWFST){
					this.editAttribute = new Mapea.Control.EditAttributeFeature_sigc(this.map, this.schema, this.wfsLayer, {title: 'Editar atributos del elemento', displayClass: 'MapeaControlEditAttributeFeature'});
					controlsToEditionPanel.push(this.editAttribute);
					editSelected = true;
				}else {
					if ((this.sgcmOptions.controls[i] == 'drawfeature' || this.sgcmOptions.controls[i] == 'modifyfeature' || this.sgcmOptions.controls[i] == 'deletefeature' || this.sgcmOptions.controls[i] == 'editattribute') && !this.loadLayerWFST){
						window.alert('Error: El control (' + this.sgcmOptions.controls[i] + ') no se puede añadir al mapa porque no existe una capa WFS cargada.');
					}else{
						window.alert('Error: El valor del parámetro controls no coincide con los valores establecidos en esta plantilla. Consulte los controles disponibles con action=getControlsAvailable.');
					}
				}
			}
			if (this.loadLayerWFST && controlsToEditionPanel.length>0){
				this.clearUnsavedOper = new Mapea.Control.ClearUnsavedOperations(this.wfsLayer,this.featureT);
				this.wfsLayer.setClearUnsavedOper(this.clearUnsavedOper);
				// Panel is created for edition controls.
				var panelEdition = createEditPanel(this.clearUnsavedOper, this.map);

				//var save = new OpenLayers.Control.Button({title:'Guardar elementos',trigger:OpenLayers.Function.bind(this.wfsLayer.commit,this.wfsLayer),displayClass:'olControlSaveFeatures'});
				var save = new OpenLayers.Control.Button({title:'Guardar elementos',trigger: OpenLayers.Function.bind(function(){
					if(this.editAttribute && this.editAttribute.feature && this.editAttribute.feature.popup){
						var feature = this.editAttribute.feature;
						//GUARDAR LOS VALORES INTRODUCIDOS EN EL POPUP
					    for(var i=0, len=this.attributionWfsLayer.length; i<len; ++i) {
					    	var fieldName = this.attributionWfsLayer[i];
					    	try{
					    		feature.attributes[fieldName] = document.getElementById("idInputText_"+fieldName).value;
					    	}catch(errs){

					    	}
					    	feature.state = OpenLayers.State.UPDATE;
					    }
					    this.wfsLayer.commit();

					    this.map.removePopup(feature.popup);
					    feature.popup.destroy();
					    feature.popup = null;
					}else{
						this.wfsLayer.commit();
					}
				},this),displayClass:'olControlSaveFeatures'});
				var clearOp = new OpenLayers.Control.Button({title:'Deshacer los cambios no salvados',trigger:OpenLayers.Function.bind(this.clearUnsavedOper.clearOperations,this.clearUnsavedOper),displayClass:'MapeaControlClearUnsavedOperations'});

				if (!editSelected || (editSelected && controlsToEditionPanel.length > 1)){
					controlsToEditionPanel.push(save);
					controlsToEditionPanel.push(clearOp);
				}

				panelEdition.addControls(controlsToEditionPanel);
				this.map.addControl(panelEdition);
			}

			if(this.hasBaseLayer)
				this.map.zoomToMaxExtent();
		}


/**############################################# CENTER ##############################################*/
		if(this.sgcmOptions.center && this.sgcmOptions.center!= this.sgcmOptionsDefault.centerDefault && !this.error){
			var latLon = this.sgcmOptions.center.split(",");
			if (latLon.length == 2){
				this.strLon = latLon[0];
				this.strLat = latLon[1];
				this.map.setCenter(new OpenLayers.LonLat(this.strLon,this.strLat),this.sgcmOptions.zoom);
			}
		}

/**############################################# ZOOM #################################################*/
		if(this.sgcmOptions.zoom && this.sgcmOptions.zoom != this.sgcmOptionsDefault.zoomDefault){
			this.map.zoomTo(this.sgcmOptions.zoom);
		}

/**############################################# LABEL ################################################*/
		if(this.sgcmOptions.label){
			this.addLabel(this.sgcmOptions.label);
		}

/**############################################# BBOX #################################################*/
		if(this.sgcmOptions.bbox != this.sgcmOptionsDefault.bboxDefault){
			var bounding = this.sgcmOptions.bbox.split(",");
			if (bounding.length == 4 ){
				var minX = bounding[0];
				var minY = bounding[1];
				var maxX = bounding[2];
				var maxY = bounding[3];

				this.map.zoomToExtent(new OpenLayers.Bounds(minX, minY, maxX, maxY));
			}
		}

/**######################################## GETFEATUREINFO #############################################*/
		if(this.sgcmOptions.getfeatureinfo){
			this.addGetfeatureinfo(this.sgcmOptions.getfeatureinfo);
		}
    },

// MAP BUILDER END

    /********************************************************/
    /*                                                      */
    /*                 Adding Functions                     */
    /*                                                      */
    /*    The following functions, all publicly exposed     */
    /*     in the API, allow us to add some properties      */
    /*                                                      */
    /*                                                      */
    /********************************************************/

   /**
    * Method: addControls
    * Parameters:
    * controls - {Array(String)}
    */
    addControls: function(controls){
    	if(!controls || controls == ''){
    		window.alert('SigcMapea.addControls: Debe introducir un control.');
    		return;
    	}
    	if(!isArray(controls)){
    		window.alert('SigcMapea.addControls: El parámetro controls debe ser un Array de String.');
    		return;
    	}
		var controlsToEditionPanel = new Array();
		var controlEditionAttribute = false;
		var editSelected = false;

		for(var i=0; i<controls.length; i++){
			if (controls[i] == 'panzoombar'){
				if(this.map.getControlsByClass('Mapea.Control.PanZoomBar').length == 0)
					this.map.addControl(new Mapea.Control.PanZoomBar());
			}
			else if (controls[i] == 'panzoom'){
				if(this.map.getControlsByClass('Mapea.Control.PanZoom').length == 0)
					this.map.addControl(new Mapea.Control.PanZoom());
			}
			else if (controls[i] == 'layerswitcher'){
				if(this.map.getControlsByClass('Mapea.Control.LayerSwitcher_sigc').length == 0)
					this.map.addControl(new Mapea.Control.LayerSwitcher_sigc(null,this.map));
			}
			else if (controls[i] == 'mouse'){
				if(this.map.getControlsByClass('OpenLayers.Control.MousePosition').length == 0)
					this.map.addControl(new OpenLayers.Control.MousePosition());
			}
			else if (controls[i] == 'navtoolbar'){
				if(this.map.getControlsByClass('Mapea.Control.NavToolbar_sigc').length == 0){
					this.addition = this.addition +1;
					if(this.addition == 3){ //measurePanel added
						this.map.addControl(new Mapea.Control.NavToolbar_sigc({displayClass:'olControlNavToolbar2'}));
					}else if(this.addition == 5){ //infoPanel added
						this.map.addControl(new Mapea.Control.NavToolbar_sigc({displayClass:'olControlNavToolbar1'}));
					}else if(this.addition == 7){ //infoPanel and measurePanel added
						this.map.addControl(new Mapea.Control.NavToolbar_sigc({displayClass:'olControlNavToolbar3'}));
					}else{ //none
						this.map.addControl(new Mapea.Control.NavToolbar_sigc({displayClass:'olControlNavToolbar'}));
					}
				}
			}
			else if (controls[i] == 'overviewmap'){
				if(this.map.getControlsByClass('Mapea.Control.OverviewMap').length == 0){
					var optionsOverviewmap = {projection:this.map.getProjection(),units:this.map.getUnits(),singleTile:true,maxExtent:this.map.getMaxExtent()};
					this.map.addControl(new Mapea.Control.OverviewMap({mapOptions: optionsOverviewmap}));
				}
			}
			else if (controls[i] == 'navigation'){
				if(this.map.getControlsByClass('OpenLayers.Control.Navigation').length == 0)
					this.map.addControl(new OpenLayers.Control.Navigation());
			}
			else if (controls[i] == 'measurebar'){
				if(this.map.getControlsBy('id','measurePanelId').length == 0){
					this.addition = this.addition + 2;
					createMeasurePanel(this.measureDiv,this.map, this.addition);
				}
			}
			else if (controls[i] == 'scale'){
				if(this.map.getControlsByClass('Mapea.Control.Scale').length == 0)
					this.map.addControl(new Mapea.Control.Scale());
 			}
 			else if (controls[i] == 'scaleline'){
 				if(this.map.getControlsByClass('OpenLayers.Control.ScaleLine').length == 0)
 					this.map.addControl(new OpenLayers.Control.ScaleLine());
 			}
			else if ((controls[i] == 'drawfeature') && this.loadLayerWFST){
				if(this.map.getControlsBy('id', 'drawfeature').length == 0){
					var draw = new Mapea.Control.DrawFeature_sigc(this.dateTimeAttributes,this.dateAttributes,this.timeAttributes,this.durationAttributes,this.noStringAttributes,this.wfsLayer, this.handlerType,{id: 'drawfeature', title: 'Dibujar elemento',displayClass: 'MapeaControlDrawFeature',handlerOptions: {multi: this.multipleType}});
					controlsToEditionPanel.push(draw);
				}
			}
			else if ((controls[i] == 'modifyfeature') && this.loadLayerWFST){
				if(this.map.getControlsBy('id', 'modifyfeature').length == 0){
					var edit = new OpenLayers.Control.ModifyFeature(this.wfsLayer,{id: 'modifyfeature', title: 'Modificar elemento',displayClass: 'olControlModifyFeature'});
					controlsToEditionPanel.push(edit);
				}
			}
			else if ((controls[i] == 'deletefeature') && this.loadLayerWFST){
				if(this.map.getControlsBy('id', 'deletefeature').length == 0){
					var del = new Mapea.Control.DeleteFeature(this.wfsLayer, {id: 'deletefeature', title: 'Eliminar elemento', displayClass: 'MapeaControlDeleteFeature'});
					controlsToEditionPanel.push(del);
				}
			}
			else if ((controls[i] == 'editattribute') && this.loadLayerWFST){
				if(this.map.getControlsByClass('Mapea.Control.EditAttributeFeature_sigc').length == 0){
					this.editAttribute = new Mapea.Control.EditAttributeFeature_sigc(this.map, this.schema, this.wfsLayer, {title: 'Editar atributos del elemento', displayClass: 'MapeaControlEditAttributeFeature'});
					controlsToEditionPanel.push(this.editAttribute);
					editSelected = true;
				}
			}else {
				if ((controls[i] == 'drawfeature' || controls[i] == 'modifyfeature' || controls[i] == 'deletefeature' || controls[i] == 'editattribute') && !this.loadLayerWFST){
					window.alert('Error: El control (' + controls[i] + ') no se puede añadir al mapa porque no existe una capa WFS cargada.');
				}else{
					window.alert('Error: El valor del parámetro controls no coincide con los valores establecidos en esta plantilla. Consulte los controles disponibles con action=getControlsAvailable.');
				}
			}
		}

		if (this.loadLayerWFST && controlsToEditionPanel.length>0){
			this.clearUnsavedOper = new Mapea.Control.ClearUnsavedOperations(this.wfsLayer,this.featureT);
			this.wfsLayer.setClearUnsavedOper(this.clearUnsavedOper);

			//Edition Panel
			var panelEdition = createEditPanel(this.clearUnsavedOper,this.map);

			//var save = new OpenLayers.Control.Button({title:'Guardar elementos',trigger:OpenLayers.Function.bind(this.wfsLayer.commit,this.wfsLayer),displayClass:'olControlSaveFeatures'});
			var save = new OpenLayers.Control.Button({title:'Guardar elementos',trigger: OpenLayers.Function.bind(function(){
				if(this.editAttribute && this.editAttribute.feature && this.editAttribute.feature.popup){
				var feature = this.editAttribute.feature;
					//GUARDAR LOS VALORES INTRODUCIDOS EN EL POPUP
				    for(var i=0, len=this.attributionWfsLayer.length; i<len; ++i) {
				    	var fieldName = this.attributionWfsLayer[i];
				    	try{
				    		feature.attributes[fieldName] = document.getElementById("idInputText_"+fieldName).value;
				    	}catch(errs){

				    	}
				    	feature.state = OpenLayers.State.UPDATE;
				    }
				    this.wfsLayer.commit();

				    this.map.removePopup(feature.popup);
				    feature.popup.destroy();
				    feature.popup = null;
				}else{
					this.wfsLayer.commit();
				}
				},this),displayClass:'olControlSaveFeatures'});
				controlsToEditionPanel.push(save);

			var clearOp = new OpenLayers.Control.Button({title:'Deshacer los cambios no salvados',trigger:OpenLayers.Function.bind(this.clearUnsavedOper.clearOperations,this.clearUnsavedOper),displayClass:'MapeaControlClearUnsavedOperations'});

			if(this.map.getControlsBy('id', 'drawfeature').length != 0)
				controlsToEditionPanel.push(this.map.getControlsBy('id', 'drawfeature')[0]);

			if(this.map.getControlsBy('id', 'modifyfeature').length != 0)
				controlsToEditionPanel.push(this.map.getControlsBy('id', 'modifyfeature')[0]);

			if(this.map.getControlsBy('id', 'deletefeature').length != 0)
				controlsToEditionPanel.push(this.map.getControlsBy('id', 'deletefeature')[0]);

			if(this.map.getControlsByClass('Mapea.Control.EditAttributeFeature_sigc').length != 0){
				controlsToEditionPanel.push(this.map.getControlsByClass('Mapea.Control.EditAttributeFeature_sigc')[0]);
				editSelected = true;
			}

			if (!editSelected || (editSelected && controlsToEditionPanel.length > 1)){
				controlsToEditionPanel.push(save);
				controlsToEditionPanel.push(clearOp);
			}
			panelEdition.addControls(controlsToEditionPanel);
			this.map.addControl(panelEdition);
			extendEventButtonFunction(this.map);
		}

		//KML select feature
		if(this.extractAttributes){
			//KML select feature
			selectFeatureKML = new OpenLayers.Control.SelectFeature(this.kmlLayers,{onSelect: function(feature) {
			     var selectedFeature = feature;
			     var html = "";
			     for(var i in feature.attributes){
			        if (i == "name" ){
			        		html += "<h2>" + feature.attributes[i] + "</h2>";
			        }else if ( i == "description"){
			        		html += feature.attributes[i];
			        }else{
			        }
			     }
			     popup = new Mapea.Popup.FramedCloud("popup_feature",
			                              feature.geometry.getBounds().getCenterLonLat(),
			                             new OpenLayers.Size(400,300),
			                             html,
			                             null, true, function PopupClose(){strLayerName.unselect(selectedFeature);});
			     feature.popup = popup;
			     this.map.addPopup(popup);
			 }, onUnselect: function(feature) {
			      this.map.removePopup(feature.popup);
			      feature.popup.destroy();
			      feature.popup = null;
			  }});
		    this.map.addControl(selectFeatureKML);
		    selectFeatureKML.activate();
		    strLayerName = selectFeatureKML;
		}

		// Label
		if(!(this.sgcmOptions.label == null)){
			var lonlat = this.sgcmOptions.center.split(',');
			this.strLon = lonlat[0];
			this.strLat = lonlat[1];
			var popup = new Mapea.Popup.FramedCloud('popup_feature',new OpenLayers.LonLat(lonlat[0],lonlat[1]),new OpenLayers.Size(100,50),this.sgcmOptions.label,null, true);
			this.map.addPopup(popup);
		}
	},

	/**
	 * Method: addLayers
	 *
	 */
	addLayers: function(layers){
		if(!layers || layers == ''){
    		window.alert('SigcMapea.addLayers: Debe introducir, al menos, una capa.');
    		return;
    	}
    	if(!isArray(layers)){
    		window.alert('SigcMapea.addLayers: El parámetro layers debe ser un Array de String.');
    		return;
    	}
		var projUn = this.sgcmOptions.projection.split('*');
		if((projUn[1].toLowerCase() == 'd') || (projUn[1].toLowerCase() == 'degrees')){
			// if(defaultExtent)
			// strMaxExtent = strDefaultMaxExtentDegrees;
		}
		var srs = projUn[0];
		if(!this.hasBaseLayer){
			//A new map is created.
			if( projUn.length == 2 )
				this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: projUn[1].toLowerCase(), maxResolution:'auto', projection: projUn[0]});
			else
			    this.map = new Mapea.Map(this.sgcmDiv.id, {controls: [], units: 'UNDEFINED', maxResolution:'auto', projection: 'UNDEFINED'});
		}
		var layerSize = layers.length;
		for(var i=0; i<layerSize; i++){
			var layer = layers[i].split('*');
			if(layer.length == 5 || layer.length == 6){ //Layer is extern typeLayer-legendname-urlLayer-nameLayer-baselayer-singletile
				layer[0] = layer[0].toUpperCase();
				if (layer[0].indexOf('WMS') != -1){
					var strTransparent = false;
					var strSingleTile = false;
					if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
						strTransparent = layer[4].toLowerCase() == 'true';
					}
					if (!strTransparent){
						if (!this.hasBaseLayer){
							this.hasBaseLayer = true;
						}
					}

					if (layer.length == 6){
						if (layer[5].toLowerCase() == 'false'){
							strSingleTile = true;
						}
					}
                 
					var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3],srs);
					if(maxExtentLayer != -1){
					this.listExtentLayers.push(maxExtentLayer);
					var newLayerOL = new Mapea.Layer.WMS(layer[1],layer[2],{layers: layer[3], transparent: strTransparent},{singleTile: strSingleTile, ratio: 1, queryable: this.query});

					var QL = {id: newLayerOL.id, tagname: layer[1], url: layer[2], name: layer[3], transparent: strTransparent, tile: strSingleTile, srs: srs};
					this.queryableLayers.push(QL);

					this.map.addLayer(newLayerOL);
					this.listLayerExtern.push(newLayerOL);
                    }
				}else if (layer[0].indexOf('KML') != -1){
					this.extractAttributes = false;

					if (layer[4].toLowerCase() == 'true' || layer[4].toLowerCase() == 'false'){
						this.extractAttributes = (layer[4].toLowerCase() == 'true');
					}
					var newLayerOL = new Mapea.Layer.GML(layer[1],layer[2] + layer[3] + '&mapeaop=kml',{format: Mapea.Format.KML,formatOptions: {extractStyles: true, extractAttributes: this.extractAttributes , mainMapProjection: this.map.getProjection(), isBaseLayer:true, transparent:false}});
					this.map.addLayer(newLayerOL);
					this.listLayerExtern.push(newLayerOL);

					if (this.extractAttributes){
						//Feature info activate.
						var numLayers = this.map.getNumLayers();
						this.kmlLayers.push(this.map.layers[numLayers-1]);
					}
				}else if (layer[0].indexOf('WFST') != -1){
					 //In a called to the mapea only can defined a wfst layer for editing.
					layer[4] = layer[4].toUpperCase();

					if (layer[4] == 'POINT'){
						this.loadLayerWFST = true;
						this.handlerType = OpenLayers.Handler.Point;
						this.multipleType = false;
					}else if (layer[4] == 'LINE'){
						this.loadLayerWFST = true;
						this.handlerType = OpenLayers.Handler.Path;
						this.multipleType = true;
					}else if (layer[4] == 'POLYGON'){
						this.loadLayerWFST = true;
						this.handlerType = OpenLayers.Handler.Polygon;
						this.multipleType = true;
					}else{
						window.alert('Error: El tipo de capa WFS no se reconoce. Los tipos disponibles son: POINT, LINE, POLYGON.');
						this.error = true;
					}
					this.featureT = layer[4];
					if(layer.length >= 6){
						this.layerAux = layer[3].substring(layer[3].indexOf(':')+1);
						var FeaturesidNames = layer[5].split('-');
						this.strFilterfeaturesid = ',featureid: ' + this.layerAux + "." + FeaturesidNames[0];
						for (var index = 1; index < FeaturesidNames.length; index++){
							this.strFilterfeaturesid = this.strFilterfeaturesid + ',' + this.layerAux + '.' + FeaturesidNames[index];
						}
						this.strFilterfeaturesid = this.strFilterfeaturesid+"'";

					}
					else{
						this.strFilterfeaturesid = '';
					}

					//typeName can not contain Namespace id.
					var begin = layer[3].indexOf(':');
					if(begin != -1)
						this.typeN = layer[3].substring(begin+1);
					else
						this.typeN = layer[3];

					if (this.loadLayerWFST){
						this.wfsreq = new Mapea.Util.WFSrequest(layer[2],layer[3]);
						this.wfsreq.requestLayers();
						this.schema = this.wfsreq.getSchema();
		/**************************************************************************************/
						this.attributionWfsLayer = new Array();
					 	var noStringAttributes = new Array();
					 	this.dateAttributes = new Array();
					 	this.dateTimeAttributes = new Array();
					 	this.timeAttributes = new Array();
					 	this.durationAttributes = new Array();
					 	var type = null;
					 	this.geomColumnDef = false;
					 	// Insert into the vector the names of feature's attributes
					 	for(i=0;i<this.schema.featureTypes[0].properties.length;i++){
					 		type = this.schema.featureTypes[0].properties[i].localType;
					 		if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType"){
					 			this.attributionWfsLayer.push(this.schema.featureTypes[0].properties[i].name);
					 			if(type == "dateTime"){
					 				this.dateTimeAttributes.push(this.schema.featureTypes[0].properties[i].name);
					 			}
					 			else if(type == "date"){
					 				this.dateAttributes.push(this.schema.featureTypes[0].properties[i].name);
					 			}
					 			else if(type == "time"){
					 				this.timeAttributes.push(this.schema.featureTypes[0].properties[i].name);
					 			}
					 			else if(type == "duration"){
					 				this.durationAttributes.push(this.schema.featureTypes[0].properties[i].name);
					 			}
					 		}
					 		else{
					 			//Save the name of geometry column
					 			this.geomColumnDef = true;
					 			this.geomColumn = this.schema.featureTypes[0].properties[i].name;
					 		}
					 		//Check if the attribute's type is integer.
					 		if(this.schema.featureTypes[0].properties[i].localType == "int" || this.schema.featureTypes[0].properties[i].localType == "float" || this.schema.featureTypes[0].properties[i].localType == "double" || this.schema.featureTypes[0].properties[i].localType == "decimal"
					 			|| this.schema.featureTypes[0].properties[i].localType == "short" || this.schema.featureTypes[0].properties[i].localType == "byte" || this.schema.featureTypes[0].properties[i].localType == "integer" || this.schema.featureTypes[0].properties[i].localType == "long"
					 			|| this.schema.featureTypes[0].properties[i].localType == "negativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonNegativeInteger" || this.schema.featureTypes[0].properties[i].localType == "nonPositiveInteger" || this.schema.featureTypes[0].properties[i].localType == "positiveInteger"
					 			|| this.schema.featureTypes[0].properties[i].localType == "unsignedLong" || this.schema.featureTypes[0].properties[i].localType == "unsignedInt" || this.schema.featureTypes[0].properties[i].localType == "unsignedShort" || this.schema.featureTypes[0].properties[i].localType == "unsignedByte"){
					 			this.noStringAttributes.push(this.schema.featureTypes[0].properties[i].name)
					 		}
					 	}
		/*************************************************************************************/
							var maxExtentLayer = getBoundingBoxFromCapabilities(layer[2],layer[3],srs);
							if( maxExtentLayer != -1){
								this.listExtentLayers.push(maxExtentLayer);
							}	
						
						
						if(this.geomColumnDef){
							this.wfsLayer = new Mapea.Layer.WFS_sigc(this.clearUnsavedOper, layer[1],layer[2],{typename: this.typeN + this.strFilterfeaturesid},{typename: this.typeN, featureNS: this.schema.targetNamespace, extractAttributes: true, geometry_column: this.geomColumn});
						}else{
							this.wfsLayer = new Mapea.Layer.WFS_sigc(this.clearUnsavedOper, layer[1],layer[2],{typename: this.typeN + this.strFilterfeaturesid },{typename: this.typeN, featureNS: this.schema.targetNamespace, extractAttributes: true});
						}
						this.wfsLayer.setAttributesNames(this.attributionWfsLayer);
						this.wfsLayer.commitReport = function(response) {
							if (response.indexOf('SUCCESS') != -1) {
								window.alert('Operación realizada correctamente.');
							}else{
								window.alert('La operación solicitada no se ha podido realizar.');
							}
							OpenLayers.Console.log('commit realizado por capa WFST.');
							};
					  if( maxExtentLayer != -1){	
						this.map.addLayer(this.wfsLayer);
						var selectFeatureWFS = new OpenLayers.Control.SelectFeature(this.wfsLayer,{});
					    this.map.addControl(selectFeatureWFS);
					    selectFeatureWFS.activate();
					    strLayerName = selectFeatureWFS;
						}
					}
				}else{
					window.alert('Error: El tipo de layer ('+ layers[0] + ') no está soportado. Consulte los servicios disponibles con action=getServicesAvailable.');
					this.error = true;
				}

			}else if((layer.length == 2 || layer.length == 3) && layer[0].indexOf('WMS_FULL') != -1){ //Format: WMS_FULL-urlService-singletile(optional)
				this.hasBaseLayer = true;
				var strSingleTile = 'false';
				if (layer.length == 3){
					if (layer[2] == 'false'){
						strSingleTile = 'true';
					}
				}

				var wmsFull = new Mapea.Util.WMSfull_sigc(this.map, layer[1] + '&mapeaop=wmsfull');
				wmsFull.setOptions({singleTile: strSingleTile});
				var maxExtentLayer = wmsFull.getBoundingBoxEnvolved(layer[1],srs);
				if( maxExtentLayer != -1){
				this.listExtentLayers.push(maxExtentLayer);
				wmsFull.addServiceToMap();
				this.wmsFullArray.push(wmsFull);}
			}else {
				window.alert('Error: El formato del layer (' + layers[i] + ') no se reconoce.');
				this.error = true;
			}
		}

/**-----------------------------------------------------------------------------------------------------------*/
		var extentAnt = this.map.getExtent();
		var maxExtentEnvolved=getMaxExtentEnvolved(this.listExtentLayers);
		this.map.baseLayer.maxExtent = maxExtentEnvolved;
		this.map.setOptions({maxExtent: maxExtentEnvolved});
		this.map.setOptions({restrictedExtent: maxExtentEnvolved});

	    // Reset layers resolutions
	    for (i=0;i<this.map.getNumLayers();i++){
	        var layer = this.map.layers[i];
		 	if(!layer.isBaseLayer){
		 		layer.projection = this.map.baseLayer.projection;
		 		layer.maxExtent = this.map.baseLayer.maxExtent;
		 		layer.units = this.map.baseLayer.units;
		 	}
		 	layer.initResolutions();
	    }
	    
	    
	        this.map.fractionalZoom = true;
	        this.map.zoomToExtent(extentAnt);
	        //this.map.fractionalZoom = false;
	    
	  
/**-----------------------------------------------------------------------------------------------------------*/
	    if(this.extractAttributes){
			//KML select feature
	    	//var selectFeatureKML = new OpenLayers.Control.SelectFeature(this.kmlLayers,{onSelect: onFeatureSelect(feature,this.map), onUnselect: onFeatureUnselect(feature,this.map)});
			selectFeatureKML = new OpenLayers.Control.SelectFeature(this.kmlLayers,{onSelect: function(feature) {
			     var selectedFeature = feature;
			     var html = "";
			     for(var i in feature.attributes){
			        if (i == "name" ){
			        		html += "<h2>" + feature.attributes[i] + "</h2>";
			        }else if ( i == "description"){
			        		html += feature.attributes[i];
			        }else{
			        }
			     }

			     popup = new Mapea.Popup.FramedCloud("popup_feature",
			                              feature.geometry.getBounds().getCenterLonLat(),
			                             new OpenLayers.Size(400,300),
			                             html,
			                             null, true, function PopupClose(){strLayerName.unselect(selectedFeature);});
			     feature.popup = popup;
			     this.map.addPopup(popup);
			 }, onUnselect: function(feature) {
			      this.map.removePopup(feature.popup);
			      feature.popup.destroy();
			      feature.popup = null;
			  }});

		    this.map.addControl(selectFeatureKML);
		    selectFeatureKML.activate();
		    strLayerName = selectFeatureKML;
		}
	},

	/**
	 *
	 * Method: addWmcfiles
	 */
	 addWmcfiles: function(wmcfiles){
		if(!wmcfiles || wmcfiles == ''){
    		window.alert('SigcMapea.addWmcfiles: Debe introducir, al menos, un archivo WMC.');
    		return;
    	}
    	if(!isArray(wmcfiles)){
    		window.alert('SigcMapea.addWmcfiles: El parámetro wmcfiles debe ser un Array de String.');
    		return;
    	}
		var wmcfileSize = wmcfiles.length;
		var contextTmp = null;
		var file = '';
		var contextUrlsTemp = new Array();
		var contextTitlesTemp = new Array();

		for(var i=0; i<wmcfileSize ;i++){
			file = wmcfiles[i];
			contextTmp = file.split('*');
			if(contextTmp.length == 1){ //Context is predefined in properties on top
				var urls = this.url.split(',');
				var titles = this.title.split(',');
				var contexts = this.contexto.split(',');
				for(var e=0; e<contexts.length; e++){
					if(contexts[e] == contextTmp){
						this.contextUrls.push(contextTmp[0]);
						contextUrlsTemp[i] = urls[e]+'&mapeaop=wmc';
						this.contextTitles.push(contextTmp[1]);
						contextTitlesTemp[i] = titles[e];
						break;
					}
				}
			}else if(contextTmp.length == 2){
				this.contextUrls.push(contextTmp[0]+'&mapeaop=wmc');
				contextUrlsTemp[i]=contextTmp[0];
				this.contextTitles.push(contextTmp[1]);
				contextTitlesTemp[i]=contextTmp[1];
			}else{
				alert('Error: El formato del context (' + file + ') no se reconoce.');
				this.error = true;
			}
		}

		if(!this.error && (this.contextUrls.length>1)){
			if(!this.contextBaseHasButton){
				this.contextBaseHasButton = true;
				contextUrlsTemp.push(this.contextBase.url);
				contextTitlesTemp.push(this.contextBase.title);
			}
			addContextButtons(contextUrlsTemp, contextTitlesTemp, this.contextButtonsDiv, this.sgcmDiv, this.wmc, this.map, this.loadLayerWFST, this.wfsLayer, this.listLayerExtern, this.kmlLayers, this.buttons, this.attachedContext);
		}
	},

	/**
	 *
	 * Method: addLabel
	 */
	addLabel: function(text){
		if(!text || text == ''){
    		window.alert('SigcMapea.addLabel: Debe introducir el texto a mostrar.');
    		return;
    	}
		var lonlat = new Array();
		if(this.sgcmOptions.center != this.sgcmOptionsDefault.centerDefault){
			lonlat = this.sgcmOptions.center.split(',');
			this.strLon = lonlat[0];
			this.strLat = lonlat[1];
		}
		else{
			lonlat = this.map.getCenter();
			this.strLon = lonlat.lon;
			this.strLat = lonlat.lat;
		}
		var popup = new Mapea.Popup.FramedCloud('popup_feature',new OpenLayers.LonLat(this.strLon,this.strLat),new OpenLayers.Size(100,50),text,null, true);
		this.map.addPopup(popup);
	},

	/**
	 *
	 * Method: getOlmap
	 */
	getOlmap: function(){
		return this.map;
	},

	/**
	 *
	 * Method: getVersion
	 */
	getVersion: function(){
		return this.version;
	},



	  /********************************************************/
	  /*                                                      */
	  /*                  Setting Functions                   */
	  /*                                                      */
	  /*    The following functions, all publicly exposed     */
	  /*    in the API, allow us to set some properties       */
	  /*                                                      */
	  /********************************************************/

	/**
	 *
	 * Method: setBbox
	 */
	setBbox: function(xmin,ymin,xmax,ymax){
		if(!xmin || !ymin || !xmax || !ymax){
			window.alert('SigcMapea.setBbox: se deben de especificar xmin, ymin, xmax e ymax para modificar el bbox del mapa');
		}else{
			this.sgcmOptions.bbox = xmin+','+ymin+','+xmax+','+ymax;
			this.map.zoomToExtent(new OpenLayers.Bounds(xmin,ymin,xmax,ymax));
		}
	},

	/**
	 *
	 * Method: setCenter
	 */
	setCenter: function(x,y,zoom){
		if(!x || !y){
			window.alert('SigcMapea.setCenter: se deben de especificar x e y para modificar el centro del mapa');
			return;
		}else if(isNaN(x) || isNaN(y)){
			window.alert('SigcMapea.setCenter: x e y deben ser coordenadas.');
			return;
		}
		this.sgcmOptions.center = x + ',' + y;
		this.strLon = x;
		this.strLat = y;
		this.sgcmOptions.zoom = zoom;
		this.map.setCenter(new OpenLayers.LonLat(x,y),zoom);
	},

	/**
	 *
	 * Method: setTicket
	 */
	setTicket: function(ticket){
		this.ticket = ticket;
		OpenLayers.ProxyHost=location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?ticket='+this.ticket+'&url=';
	},

	/**
	 *
	 * Method: addGetfeatureinfo
	 */
	addGetfeatureinfo: function(format){
		/**if(activate){*/
			if(!format || (format.indexOf('plain') != -1)){
				if(this.map.getControlsBy('id','infoPanelId').length>0){
					var ctrlLayerInfo = this.map.getControlsBy('id','infoPanelId')[0];
					ctrlLayerInfo.deactivate();
					this.map.removeControl(ctrlLayerInfo);
					this.info = new Mapea.Control.GetLayersInfo_sigc('text/plain',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
					createInfoPanel(this.info,this.map,this.featureInfoGML, this.addition);
					checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers, this.listLayerExtern);
					this.featureInfoAdded = true;
				}else{
					this.addition = this.addition+4;
					this.info = new Mapea.Control.GetLayersInfo_sigc('text/plain',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
					createInfoPanel(this.info,this.map,this.featureInfoGML, this.addition);
					checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers, this.listLayerExtern);
					this.featureInfoAdded = true;
				}
			}else if(format && (format.indexOf('gml') != -1)){
				if(this.map.getControlsBy('id','infoPanelId').length>0){
					var ctrlLayerInfo = this.map.getControlsBy('id','infoPanelId')[0];
					ctrlLayerInfo.deactivate();
					this.map.removeControl(ctrlLayerInfo);
					this.info = new Mapea.Control.GetLayersInfo_sigc('application/vnd.ogc.gml',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
					createInfoPanel(this.info,this.map,this.featureInfoGML, this.addition);
					checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers, this.listLayerExtern);
					this.featureInfoAdded = true;
				}else{
					this.addition = this.addition+4;
					this.info = new Mapea.Control.GetLayersInfo_sigc('application/vnd.ogc.gml',{title: 'Información de las capas', displayClass: 'MapeaControlGetLayersInfo'});
					createInfoPanel(this.info,this.map,this.featureInfoGML, this.addition);
					checkQueriesLayers(this.map,this.info,this.queryableLayers,this.listExtentLayers, this.listLayerExtern);
					this.featureInfoAdded = true;
				}
			}else if(format){
				window.alert('El formato solicitado para la información no está disponible. Inténtelo utilizando gml o plain.');
			}
	},

	/**
	 *
	 * Method: setZoom
	 */
	setZoom: function(zoomlevel){
		if(!zoomlevel){
			window.alert('SigcMapea.setZoom: Debe especificar el nivel de zoom.');
			return;
		}else if(isNaN(zoomlevel)){
			window.alert('SigcMapea.setZoom: Debe especificar un nivel de zoom válido.');
			return;
		}
		this.sgcmOptions.zoom = zoomlevel;
		this.map.zoomTo(zoomlevel);
	},

	/**
	 *
	 * Method: addEventHandler
	 */
	addEventHandler: function(type,callback_function){
		if(!type){
			window.alert('SigcMapea.addEventHandler: Debe especificar el tipo de evento a añadir sobre el mapa.');
			return;
		}else if(!callback_function){
			window.alert('SigcMapea.addEventHandler: Debe especificar la función de llamada que realizará el evento.');
			return;
		}else if(typeof callback_function != 'function'){
			window.alert('SigcMapea.addEventHandler: La función introducida no es una función.');
			return;
		}
		this.map.events.register(type,this.map,callback_function);
	},
	
	
	/**
	 *
	 * Method: getRoadType
	 */
	 
	 getRoadType: function(){
	
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayRoadsType = null;
		obtenerTiposViaSigc();
		
	 },
	
	/**
	 *
	 * Method: getLocalityFromProv
	 */
	 
	 getLocalityFromProv: function(codProv){
	
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayLocFromProv = null;
		obtenerMunicipiosSigc(codProv);
		
	 },
	          
	          
	/**
	 *
	 * Method: getServiceType
	 */
	 
	 getServiceType: function(){
	
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayServicesType = null;
		obtenerTiposServiciosSigc();
		
	  },
	
	/**
	 *
	 * Method: searchStreet
	 */
	 
	 searchStreet: function(type,name,number,locality){
	           
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayStreet = null;
		obtenerDireccionesSigc(name, number, type, locality);
		
	  },
	          
	  
	 /**
	 *
	 * Method: searchStreetLocProv
	 */
	 
	 searchStreetLocProv: function(type,name,number,localityName,province){
	           
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayStreet = null;
		obtenerDireccionesMunProvSigc(name, number, type, localityName,province);
		
	 },
	          
	          
	 /**
	 *
	 * Method: searchService
	 */
	 
	 searchService: function(codINE,cadena,codProv){
	         
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayServices = null;
		localizarServiciosSigc(codINE,cadena,codProv);
		
	 },
	          
	 /**
	 *
	 * Method: searchOrganizationalUnit
	 */
	 
	 searchOrganizationalUnit: function(codINE,cadena,codProv){
	          
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayOu = null;
		localizarSedesSigc(codINE,cadena,codProv);
		
	 },
	 
	 
	 /**
	 *
	 * Method: searchLocality
	 */
	 
	 searchLocality: function(name){
	            
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayLocality = null;
		localizarNucleosSigc(name);
		
	 },
	
	 /**
	 *
	 * Method: searchRoad
	 */
	 
	 searchRoad: function(cadena,pk){
	            
		callejeroProxy = new IMPL_CallejeroService();
		var proxy = location.href.substring(0,location.href.indexOf('/Componente'))+'/proxy?url=';
		callejeroProxy.url = proxy + this.swCallejero;
		this.arrayRoads = null;
		localizarCarreterasSigc(cadena,pk);
		
	 },
	
	
	 
	 

	/**
	 *
	 * Method: removeEventHandler
	 */
	removeEventHandler: function(type){
		if(!type){
			window.alert('SigcMapea.removeEventHandler: Debe especificar el tipo de evento a eliminar del mapa.');
		}
		this.map.events.remove(type);
	},


    CLASS_NAME: "Mapea.SigcMapea"
});

/**
 * Method: getQueryable
 *
 */
function getQueryable(layerInfo,url,layerName){

 	layerInfo.loadCapabilities(url);
 	var capabilities = layerInfo.returnCapabilities();

 	var NumLayers = capabilities.layers[0].layers.length;
 	var layers = capabilities.layers[0];

 	for(var i=0; i<NumLayers; i++){
 		if(layers.layers[i].name == layerName){
 			if(typeof(layers.layers[i].layers) == 'undefined')
 				return true; // Is not dataset
 			else{ //Search in the tree leaves
 				for(var j=0; j<layers.layers[i].layers.length; j++){
 					if(layers.layers[i].layers[j].options.queryable == true)
 						return true;
 				}
 			}
 			return false; // All leaves are not queryable
 		}
 		//Search in sub-layers
 		else{
 			if(typeof (layers.layers[i].layers) != 'undefined'){
 				for(var j=0; j<layers.layers[i].layers.length; j++){
 					if(layers.layers[i].layers[j].name == layerName){
 						return layers.layers[i].layers[j].options.queryable;
 					}
 				}
 			}
 		}
 	}
 }

 /**
 * Method: executeAction
 *
 */
 function executeAction(element) {
 	for(key in measureControls)
 	{
 		var control = measureControls[key];

 		if( element == key ) {
 			control.activate();
 		}else {
 			control.deactivate();
 		}
 	}

 	var element = document.getElementById('idMeasure');
 	element.innerHTML = "";
 }

 /**
 * Method: executeDelete
 *
 */
function executeDelete(map) {

 	var controlsMeasure = map.getControlsBy("id","measurePanelId");

 	if ( controlsMeasure.length > 0 ){

 			controlsMeasure[0].controls[0].deactivate();
 			controlsMeasure[0].controls[1].deactivate();

 		}

 	var element = document.getElementById('idMeasure');
 	element.innerHTML = "";
 	controlsMeasure[0].controls[2].deactivate();
 }

 /**
 * Method: handleMeasurements
 *
 */
 function handleMeasurements(event) {
 	var geometry = event.geometry;
 	var units = event.units;
 	var order = event.order;
 	var measure = event.measure;
 	var element = document.getElementById('idMeasure');
 	var out = "";
 	if(order == 1) {
 		out += "Longitud: " + measure.toFixed(3) + " " + units;
 	} else {
 		out += "Superficie: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
 	}
 	element.innerHTML = out;
 }

 /**
  * Method: generaAtributos
  *
  */
  function generaAtributos(objeto, attributionWfsLayer,geomColumnDef,noStringAttributes,dateAttributes,dateTimeAttributes,timeAttributes,durationAttributes){

 	attributionWfsLayer = [];
 	var noStringAttributes = [];
 	dateAttributes = [];
 	dateTimeAttributes = [];
 	timeAttributes = [];
 	durationAttributes = [];
 	var type = null;
 	geomColumnDef = false;
 	// Insert into the vector the names of feature's attributes
 	for(i=0;i<objeto.featureTypes[0].properties.length;i++){
 		type = objeto.featureTypes[0].properties[i].localType;
 		if(type != "PointPropertyType" && type != "PolygonPropertyType" && type != "LineStringPropertyType" && type != "GeometryPropertyType" && type != "MultiSurfacePropertyType" && type != "MultiLineStringPropertyType"){
 			attributionWfsLayer.push(objeto.featureTypes[0].properties[i].name);
 			if(type == "dateTime"){
 				dateTimeAttributes.push(objeto.featureTypes[0].properties[i].name);
 			}
 			else if(type == "date"){
 				dateAttributes.push(objeto.featureTypes[0].properties[i].name);
 			}
 			else if(type == "time"){
 				timeAttributes.push(objeto.featureTypes[0].properties[i].name);
 			}
 			else if(type == "duration"){
 				durationAttributes.push(objeto.featureTypes[0].properties[i].name);
 			}
 		}
 		else{
 			//Save the name of geometry column
 			this.geomColumnDef = true;
 			geomColumn = objeto.featureTypes[0].properties[i].name;
 		}
 		//Check if the attribute's type is integer.
 		if(objeto.featureTypes[0].properties[i].localType == "int" || objeto.featureTypes[0].properties[i].localType == "float" || objeto.featureTypes[0].properties[i].localType == "double" || objeto.featureTypes[0].properties[i].localType == "decimal"
 			|| objeto.featureTypes[0].properties[i].localType == "short" || objeto.featureTypes[0].properties[i].localType == "byte" || objeto.featureTypes[0].properties[i].localType == "integer" || objeto.featureTypes[0].properties[i].localType == "long"
 			|| objeto.featureTypes[0].properties[i].localType == "negativeInteger" || objeto.featureTypes[0].properties[i].localType == "nonNegativeInteger" || objeto.featureTypes[0].properties[i].localType == "nonPositiveInteger" || objeto.featureTypes[0].properties[i].localType == "positiveInteger"
 			|| objeto.featureTypes[0].properties[i].localType == "unsignedLong" || objeto.featureTypes[0].properties[i].localType == "unsignedInt" || objeto.featureTypes[0].properties[i].localType == "unsignedShort" || objeto.featureTypes[0].properties[i].localType == "unsignedByte"){
 			noStringAttributes.push(objeto.featureTypes[0].properties[i].name)
 		}
 	}
 }

/**
  * Method: createInfoPanel
  *
  */
  function createInfoPanel(info,map,infoFeatureGML,addition) {
	  var activo = false;
	  var infoPanel;

	  if(addition == 7){
		  var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo3', id:'infoPanelId'});
	  }else if(addition == 4){
		  var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo1', id:'infoPanelId'});
	  }else if(addition == 6){
		  var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo4', id:'infoPanelId'});
	  }else{
		  var infoPanel = new OpenLayers.Control.Panel({displayClass:'MapeaGetFeatureInfo2', id:'infoPanelId'});
	  }

	    infoPanel.onClick = function(ctrl, evt)
		{
	        var controlsInfo = map.getControlsBy('id','infoPanelId');
				if(activo){
				   controlsInfo[0].controls[0].deactivate();
				   activo=false;
				}
				else{
				   this.activateControl(ctrl);
				   activo=true;
				}


			var controlsNav = map.getControlsByClass('Mapea.Control.NavToolbar_sigc');
			var controlsMeasure = map.getControlsBy('id','measurePanelId');
			if ( controlsNav.length > 0 ){
				controlsNav[0].controls[0].deactivate();
				controlsNav[0].controls[1].deactivate();
			}
			if ( controlsMeasure.length > 0 ){
				controlsMeasure[0].controls[0].deactivate();
				controlsMeasure[0].controls[1].deactivate();
			}

			OpenLayers.Event.stop(evt ? evt : window.event);
		};

		infoPanel.addControls(info);
		map.addControl(infoPanel);
 }

  function addContextButtons(contextUrls, contextTitles, contextButtonsDiv, mapDiv, wmc, map, loadLayerWFST, wfsLayer, listLayerExtern, kmlLayers, buttons,attachedContext){
	   if(!contextButtonsDiv)
		   return window.alert('no se ha creado el div para los botones.');

	   for(var i=0; i<contextUrls.length; i++){
		   var url = contextUrls[i];
		   var title = contextTitles[i];
		   var button = document.createElement('input');
		   button.type = 'button';
		   button.value = title;
		   button.id = 'contextButton_'+title;
		   //button.url = url;
		   //button.wmc = wmc;
		   var but = {url: url, wmc: wmc, id: button.id};
		   buttons.push(but);
		   var f = function(){
			   window.alert('entra ie');
			   window.alert('valor de this: '+this);
			   window.alert('valor de this string: '+this.toString());
			   for(var e=0; e<buttons.length; e++){
				   window.alert('valor de button.id: '+button.id);
				   var b = buttons[e];
				   if(b.id == button.id){
					   changeContext(b.url,b.wmc,mapDiv,map);
					   addLayersExtern(loadLayerWFST, map, wfsLayer, listLayerExtern, kmlLayers);
					   break;
				   }
			   }
		   };

		   if(button.addEventListener) {
			   button.addEventListener('click', function(){
				   for(var e=0; e<buttons.length; e++){
					   var b = buttons[e];
					   if(b.id == this.id){
						   changeContext(b.url,b.wmc,mapDiv,map);
						   addLayersExtern(loadLayerWFST, map, wfsLayer, listLayerExtern, kmlLayers);
						   break;
					   }
				   }
			   }, false);
		   }else{
			   //attachedContext(buttons,mapDiv,map,loadLayerWFST,wfsLayer,listLayerExtern,kmlLayers);
			   var fie = function(){
				   f.call(button,window.event);
			   };
			   button.attachEvent('onclick', fie);
		   }
		   contextButtonsDiv.appendChild(button);
	   }
  }

   function addLayersExtern(loadLayerWFST, map, wfsLayer, listLayerExtern, kmlLayers){
		if(sigcMap.vectorlayer != null){
		   map.addLayer(sigcMap.vectorlayer);
		}
		
		if(loadLayerWFST){   //In a called to the mapea only can defined a wfst layer.
			map.addLayer(wfsLayer);
		}
		for (var i=0; i<listLayerExtern.length ;i++){
			map.addLayer(listLayerExtern[i]);
			var numLayers = map.getNumLayers();

			//if (listLayerExtern.get(i).CLASS_NAME == "Mapea.Layer.GML" && listLayerExtern.get(i).formatOptions.extractAttributes == "true"){
			if(map.layers[numLayers-1].CLASS_NAME == 'Mapea.Layer.GML'){
				if(map.layers[numLayers-1].formatOptions.extractAttributes == true){
					//Feature info activate.
					kmlLayers.push(map.layers[numLayers-1]);
				}
			}
		}

		selectFeatureKML = new OpenLayers.Control.SelectFeature(kmlLayers,{onSelect: function(feature) {
		     var selectedFeature = feature;
		     var html = "";
		     for(var i in feature.attributes){
		        if (i == "name" ){
		        		html += "<h2>" + feature.attributes[i] + "</h2>";
		        }else if ( i == "description"){
		        		html += feature.attributes[i];
		        }else{
		        }
		     }

		     popup = new Mapea.Popup.FramedCloud("popup_feature",
		                              feature.geometry.getBounds().getCenterLonLat(),
		                             new OpenLayers.Size(400,300),
		                             html,
		                             null, true, function PopupClose(){strLayerName.unselect(selectedFeature);});
		     feature.popup = popup;
		     this.map.addPopup(popup);
		 }, onUnselect: function(feature) {
		      this.map.removePopup(feature.popup);
		      feature.popup.destroy();
		      feature.popup = null;
		  }});
		map.addControl(selectFeatureKML);
		selectFeatureKML.activate();
		strLayerName = selectFeatureKML;
}//Close_function_addLayersExtern


   /**
    * Method: changeContext
    *
    */
function changeContext(url,wmc,mapDiv,map){
   var peticionTmp = new OpenLayers.Ajax.Request(url, {asynchronous :false});
   if (peticionTmp) {
	   try {
		//No return a map object because the name is context and no map. Return a context object.
		var context = wmc.read(peticionTmp.transport.responseText, {
				context : mapDiv.id, controls: [new OpenLayers.Control.PanZoomBar()],
               numZoomLevels: 6
               });

		Mapea.Util.removeLayers(map);
		map.addLayers(context.layers);
		//map.zoomToMaxExtent();
	   }catch (err) {
		   alert(err);
	   }
   }
}

function extendEventButtonFunction(map){
	if(map!=null){
		var control = map.getControlsByClass('OpenLayers.Control.NavToolbar_sigc');

		if( control.length > 0 ) {
			OpenLayers.Util.extend( control[0].controls[0], {
				activate: function () {
					executeAction( "no" );
					if( this.active ) {
						return false;
					}

					if( this.handler ) {
						this.handler.activate();
					}

					this.active = true;
					this.events.triggerEvent("activate");
					return true;
				}
			});

			OpenLayers.Util.extend( control[0].controls[1], {
				activate: function () {
					executeAction( "no" );
					if( this.active ) {
						return false;
					}

					if( this.handler ) {
						this.handler.activate();
					}

					this.active = true;
					this.events.triggerEvent("activate");
					return true;
				}
			});
		}}
}


function createMeasurePanel(measureDiv,map, addition){
	if(!measureDiv){
		measureDiv = OpenLayers.Util.createDiv('idMeasure');
		measureDiv.className = 'olControlMeasurePosition';
	}
	var zIndex = map.Z_INDEX_BASE['Control'] + map.controls.length;
	measureDiv.style.zIndex = zIndex;
	map.viewPortDiv.appendChild(measureDiv);
	var deleMeasure= new Mapea.Control.DelMeasure({id:'deleteMeasures', title: 'Eliminar medidas', displayClass: 'MapeaControlDeleteFeature'});
	var measurePanel;

	if(addition == 2){
		measurePanel = new OpenLayers.Control.Panel({displayClass:'olControlPanel1',id:'measurePanelId'});
	}else if(addition == 3){
		measurePanel = new OpenLayers.Control.Panel({displayClass:'olControlPanel2',id:'measurePanelId'});
	}else if(addition == 6){
		measurePanel = new OpenLayers.Control.Panel({displayClass:'olControlPanel4',id:'measurePanelId'});
	}else{
    	measurePanel = new OpenLayers.Control.Panel({displayClass:'olControlPanel3',id:'measurePanelId'});
    }

	measurePanel.onClick = function(ctrl, evt)
	{
		var controlsNav = map.getControlsByClass('Mapea.Control.NavToolbar_sigc');
		if ( controlsNav.length > 0 ){
			controlsNav[0].controls[0].deactivate();
			controlsNav[0].controls[1].deactivate();
		}
		var controlsInfo = map.getControlsBy("id","infoPanelId");

		if ( controlsInfo.length > 0 ){
			controlsInfo[0].controls[0].deactivate();
		}

		OpenLayers.Event.stop(evt ? evt : window.event);

		this.activateControl(ctrl);

		if(ctrl.id == 'measureDist'){
			executeAction('line');
		}
		else if(ctrl.id == 'measurePer')
		{
			executeAction('polygon');
		}
		else if(ctrl.id == 'deleteMeasures')
		{
			executeDelete(map);
		};
	};

	var sketchSymbolizers = {
			"Point": {
				pointRadius: 6,
				graphicName: "circle",
				fillColor: "#ee9900",
				fillOpacity: 0.3,
				strokeWidth: 3,
				strokeOpacity: 1,
				strokeColor: "#ee9900"
			},
			"Line": {
				strokeWidth: 3,
				strokeOpacity: 1,
				strokeColor: "#ee9900",
				strokeDashstyle: "none"
			},
			"Polygon": {
				strokeWidth: 3,
				strokeOpacity: 1,
				strokeColor: "#ee9900",
				fillColor: "#ee9900",
				fillOpacity: 0.5
			}
		};

	var style = new OpenLayers.Style();
	style.addRules([new OpenLayers.Rule({symbolizer: sketchSymbolizers})]);

	var styleMapa = new OpenLayers.StyleMap({"default": style});

	measureControls = {
		line: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Path, {
				id:'measureDist',
				displayClass: "olControlMeasureDist",
				persist: true,
				handlerOptions: {
					layerOptions: {styleMap: styleMapa}
				}
			}
		),
		polygon: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Polygon, {
				id:'measurePer',
				displayClass: "olControlMeasurePer",
				persist: true,
				handlerOptions: {
					layerOptions: {styleMap: styleMapa}
				}
			}
		)
	};

	var controlMeasure;
	for(var key in measureControls) {
		controlMeasure = measureControls[key];
		controlMeasure.events.on({
			"measure": handleMeasurements,
			"measurepartial": handleMeasurements
		});
		measurePanel.addControls( controlMeasure );

	}
    measurePanel.addControls (deleMeasure);
	map.addControl( measurePanel );
}

function getMaxExtentEnvolved(list){
    var lefts = new Array();
    var rights = new Array();
    var tops = new Array();
    var bottoms = new Array();


    for(var i=0;i<list.length;i++){
     lefts.push(list[i].left);
      rights.push(list[i].right);
       tops.push(list[i].top);
        bottoms.push(list[i].bottom);
     }

     var sortLeft= lefts.sort(sortNumber);
     var sortBottom= bottoms.sort(sortNumber);
     var sortRight= rights.sort(sortNumber);
     var sortTop= tops.sort(sortNumber);
     var newLeft = sortLeft[0];
     var newBottom = sortBottom[0];
     var newRight = sortRight[rights.length-1];
     

     var newTop = sortTop[tops.length-1];
     var bounds = new OpenLayers.Bounds(newLeft,newBottom,newRight,newTop);

     return bounds;
}

/**
* Method: getBoundingBoxFromCapabilities
*
*/

function getBoundingBoxFromCapabilities(url,layerName,srs){

	var cont= new Mapea.Util.ReadMaxExtent(url);
	cont.loadCapabilities(url);
	var capabilities = cont.returnCapabilities();
	var NumLayers = capabilities.layers[0].layers.length;
	var layers = capabilities.layers[0];

    if(layers.name == layerName) {
          
      if((layers.arraySRS.indexOf(srs) == -1)&&(layers.arraySRS[0].indexOf(srs) == -1)){
         alert("La capa " + layerName + " no se encuentra disponible en: " + srs);
         return -1; 
      }
      
      if(layers.srsArray){

      var find = layers.srsArray.indexOf(srs);

      if(find > -1){
         return layers.bboxArray[find];
      }
      else {
        var srcProj = new OpenLayers.Projection(layers.srsArray[0]);
		var dstProj = new OpenLayers.Projection(srs);
		var extent = layers.bboxArray[0];
		var newExtent = extent.transform(srcProj,dstProj);
		return newExtent;
      }

      }
      else{
         var auxiliar = getBoundingDataset(layers,srs);
         return auxiliar;
      }
    }

   else{

	for(var i=0; i<NumLayers; i++){
		if(layers.layers[i].name == layerName){
                
                   var checkArraySRS = layers.layers[i].arraySRS;
                   
                   if( checkArraySRS == undefined){
                       checkArraySRS = layers.arraySRS;
                   }
                   
                                 
                   if((checkArraySRS.indexOf(srs) == -1)&&(checkArraySRS[0].indexOf(srs) == -1)){
         			alert("La capa " + layerName + " no se encuentra disponible en: " + srs);
         			return -1; 
      			   }
                
                
		       //dataset
		    if(typeof (layers.layers[i].layers) != "undefined"){
				var find=false;

				// defined srs
				if(layers.layers[i].srsArray){
				  var NumSRS = layers.layers[i].srsArray.length;
			      for(var k=0; i<NumSRS; k++){
			         // match srs
			         if(layers.layers[i].srsArray[k] == srs){
				       find=true;
				       return layers.layers[i].bboxArray[k];
				       }
		            }

		         }

		         // no defined srs || no match srs
		         if(find==false){

		         var numChilds = layers.layers[i].layers.length;

		         for (var h=0; h<numChilds;h++){
		             var aux = new Array();
		             var arraySRS = layers.layers[i].layers[h].srsArray;
		             if (arraySRS == undefined){
					        arraySRS = layers.srsArray;
					   }
		             var srsFound = arraySRS.indexOf(srs); 
		               
		                  if(srsFound > -1 ){
		                   var bboxReturn = layers.layers[i].layers[h].bboxArray;
		                  
		                  if( bboxReturn == undefined){
	                       bboxReturn = layers.bboxArray; 
	                      }
	                  
	            		var extent = bboxReturn[srsFound];
	            		aux.push(extent);
	                   }
		         	    else{
		         	       var srcProj = new OpenLayers.Projection(arraySRS[0]);
		         	       var dstProj = new OpenLayers.Projection(srs);
		         	       var bboxAux = layers.layers[i].layers[h].bboxArray;
		                   if( bboxAux == undefined){
		                       bboxAux = layers.bboxArray;
		                   }
		                   var extent = bboxAux[0];
		         	       var newExtent = extent.transform(srcProj,dstProj);
		         	       aux.push(extent);
		         	    }
		           
		         }
		              
		         
		              var dev = getMaxExtentEnvolved(aux);
		              return dev;
		         }

		     }

		      //layer
		   else{
		      var arraySRS = layers.layers[i].srsArray;
		      if (arraySRS == undefined){
					        arraySRS = layers.srsArray;
					   }
		      
		     var srsFound = arraySRS.indexOf(srs);


		          if(srsFound > -1 ){
		                   
		                   var bboxReturn = layers.layers[i].bboxArray;
		                  
		                  if( bboxReturn == undefined){
	                       bboxReturn = layers.bboxArray; 
	                      }
	                  
	            		   var extent = bboxReturn[srsFound];
		                   
		                   return extent;
		          }
		          else{
		                   var srcProj = new OpenLayers.Projection(arraySRS[0]);
		         	       var dstProj = new OpenLayers.Projection(srs);
		                   var bboxAux = layers.layers[i].bboxArray;
		                   if( bboxAux == undefined){
		                       bboxAux = layers.bboxArray;
		                   }
		                   var extent = bboxAux[0];
		         	       var newExtent = extent.transform(srcProj,dstProj);
		                   return newExtent;
		          }
		   }

 }
		//Search in sub-layers
		else{
			//layer
			if(typeof (layers.layers[i].layers) != "undefined"){
				for(var j=0; j<layers.layers[i].layers.length; j++){
				     
				    
					if(layers.layers[i].layers[j].name == layerName){
					
					  var checkArraySRS = layers.layers[i].layers[j].arraySRS;
                   
                      if( checkArraySRS == undefined){
                        checkArraySRS = layers.arraySRS;
                      }
					   
					    if((checkArraySRS.indexOf(srs) == -1)&&(checkArraySRS[0].indexOf(srs) == -1)){
         					alert("La capa " + layerName + " no se encuentra disponible en: " + srs);
         					return -1; 
      					}
					   
					
					   var arraySRS = layers.layers[i].layers[j].srsArray;
					   if (arraySRS == undefined){
					        arraySRS = layers.srsArray;
					   }
		               var srsFound = arraySRS.indexOf(srs);

			           if(srsFound > -1 ){
		                   var bboxReturn = layers.layers[i].layers[j].bboxArray;
		                  
		                  if( bboxReturn == undefined){
	                       bboxReturn = layers.bboxArray; 
	                      }
	                  
	            		return bboxReturn[srsFound];
	                   }
	          	   else{
		          	       var srcProj = new OpenLayers.Projection(arraySRS[0]);
		         	       var dstProj = new OpenLayers.Projection(srs)
		                   var bboxAux = layers.layers[i].layers[j].bboxArray;
		                   if( bboxAux == undefined){
		                       bboxAux = layers.bboxArray;
		                   }
		                   var extent = bboxAux[0];
		         	       var newExtent = extent.transform(srcProj,dstProj);
		                   return newExtent;
		          }
				}
			  }
			}
		}
	}
  }
}


/**
* Method: getBoundingDataset
*
*/


function getBoundingDataset(layers,srs){

var NumLayers=layers.length;
var srsDataset = new Array();

for(var i=0; i<NumLayers; i++){


		    if(typeof (layers.layers[i].layers) != "undefined"){
				var find=false;

				// srs definded
				if(layers.layers[i].srsArray){
				  var NumSRS = layers.layers[i].srsArray.length;
			      for(var k=0; i<NumSRS; k++){
			         // match srs
			         if(layers.layers[i].srsArray[k] == srs){
				       find=true;
				       srsDataset.push(layers.layers[i].bboxArray[k]);
				       }
		            }

		         }


		         if(find==false){

		         var numChilds = layers.layers[i].layers.length;
	         
		          for (var h=0; h<numChilds;h++){
		             var aux = new Array();
		             var arraySRS = layers.layers[i].layers[h].srsArray;
		             if (arraySRS == undefined){
					        arraySRS = layers.srsArray;
					   }
		             var srsFound = arraySRS.indexOf(srs); 
		               
		                  if(srsFound > -1 ){
		                   var bboxReturn = layers.layers[i].layers[h].bboxArray;
		                  
		                  if( bboxReturn == undefined){
	                       bboxReturn = layers.bboxArray; 
	                      }
	                  
	            		var extent = bboxReturn[srsFound];
	            		aux.push(extent);
	                   }
		         	    else{
		         	       var srcProj = new OpenLayers.Projection(arraySRS[0]);
		         	       var dstProj = new OpenLayers.Projection(srs);
		         	       var bboxAux = layers.layers[i].layers[h].bboxArray;
		                   if( bboxAux == undefined){
		                       bboxAux = layers.bboxArray;
		                   }
		                   var extent = bboxAux[0];
		         	       var newExtent = extent.transform(srcProj,dstProj);
		         	       aux.push(extent);
		         	    }
		           
		         }
		              
		         
		         
		              var dev = getMaxExtentEnvolved(aux);
		              srsDataset.push(dev);
		         }

		     }

		   else{
		   
		   var arraySRS = layers.layers[i].srsArray;
		      if (arraySRS == undefined){
					        arraySRS = layers.srsArray;
					   }
		      
		     var srsFound = arraySRS.indexOf(srs);


		          if(srsFound > -1 ){
		                   
		                   var bboxReturn = layers.layers[i].bboxArray;
		                  
		                  if( bboxReturn == undefined){
	                       bboxReturn = layers.bboxArray; 
	                      }
	                  
	            		   var extent = bboxReturn[srsFound];
		                   
		                  srsDataset.push(extent);
		          }
		          else{
		                   var srcProj = new OpenLayers.Projection(arraySRS[0]);
		         	       var dstProj = new OpenLayers.Projection(srs);
		                   var bboxAux = layers.layers[i].bboxArray;
		                   if( bboxAux == undefined){
		                       bboxAux = layers.bboxArray;
		                   }
		                   var extent = bboxAux[0];
		         	       var newExtent = extent.transform(srcProj,dstProj);
		                   srsDataset.push(newExtent);
		          }
		   
		   
		   }



	}
    var devSrsDataset = getMaxExtentEnvolved(srsDataset);
    return devSrsDataset;
}


function sortNumber(a,b){
	return a - b;
}

/**
* Method: createEditPanel
*
*/
function createEditPanel(clearUnsavedOper,map){

     var activo = false;
     var panel = new OpenLayers.Control.Panel({displayClass:'customEditingToolbar', id:'editPanelId'});


     panel.onClick = function(ctrl, evt){
        var controlsNav = map.getControlsByClass('Mapea.Control.NavToolbar');
        if (controlsNav.length>0){
        	controlsNav[0].controls[0].deactivate();
        	controlsNav[0].controls[1].deactivate();
        }
        OpenLayers.Event.stop(evt ? evt : window.event);

	    if(ctrl.displayClass != "olControlSaveFeatures"){
	      	clearUnsavedOper.loadCoord("Modify");
	    }

      //Patch for desactive controls and enable ControlSelectFeature in KML.
      if(ctrl.active){
         ctrl.deactivate();
      }
      else{
         this.activateControl(ctrl);
      }
    }
     return panel;
}


function checkQueriesLayers(map,info,queryableLayers,listExtentLayers,listLayerExtern){
	var query = '';
	for(var i=0; i<queryableLayers.length; i++){
		var QL = queryableLayers[i];
		var layer = map.getLayersBy('id', QL.id)[0];

		map.removeLayer(layer);
		query = getQueryable(info,QL.url+'?mapeaop=wmsinfo', QL.name);

		var maxExtentLayer = getBoundingBoxFromCapabilities(QL.url,QL.name, QL.srs);
		if(maxExtentLayer != -1){
		listExtentLayers.push(maxExtentLayer);

		var newLayerOL = new Mapea.Layer.WMS(QL.tagname,QL.url,{layers: QL.name, transparent: QL.transparent},{singleTile: QL.tile, ratio: 1, queryable: query});
		map.addLayer(newLayerOL);
		listLayerExtern.push(newLayerOL);
		}
	}

/**-----------------------------------------------------------------------------------------------------------*/
	var maxExtentEnvolved=getMaxExtentEnvolved(listExtentLayers);
	map.baseLayer.maxExtent = maxExtentEnvolved;
	map.setOptions({maxExtent: maxExtentEnvolved});
	map.setOptions({restrictedExtent: maxExtentEnvolved});

	// Reset layers resolutions
	for (i=0;i<map.getNumLayers();i++){
	    var layer = map.layers[i];
	 	if(!layer.isBaseLayer){
	 		layer.projection = map.baseLayer.projection;
	 		layer.maxExtent = map.baseLayer.maxExtent;
	 		layer.units = map.baseLayer.units;
	 	}
	 	layer.initResolutions();
	}
/**-----------------------------------------------------------------------------------------------------------*/
}


/**
* Method: onFeatureSelect
*
*/
function onFeatureSelect(feature, map) {
    selectedFeature = feature;
    var html = "";
    for(var i in feature.attributes){
       if (i == "name" ){
       		html += "<h2>" + feature.attributes[i] + "</h2>";
       }else if ( i == "description"){
       		html += feature.attributes[i];
       }else{
       }
    }

    popup = new Mapea.Popup.FramedCloud("popup_feature",
                             feature.geometry.getBounds().getCenterLonLat(),
                            new OpenLayers.Size(400,300),
                            html,
                            null, true, function PopupClose(){strLayerName.unselect(selectedFeature);});
    feature.popup = popup;
    map.addPopup(popup);
}

function changeTheButtonContext(url,wmc,mapDiv,map,loadLayerWFST, map, wfsLayer, listLayerExtern, kmlLayers){
	 window.alert('la url vale:  '+url);
	 changeContext(url,wmc,mapDiv,map);
	 addLayersExtern(loadLayerWFST, map, wfsLayer, listLayerExtern, kmlLayers);

}
/**
* Method: onFeatureUnselect
*
*/
function onFeatureUnselect(feature, map) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
}

function IEpath(){
	//IE  support for Array.indexOf
	if (!Array.indexOf) {
	  Array.prototype.indexOf = function (obj, start) {
	    for (var i = (start || 0); i < this.length; i++) {
	      if (this[i] == obj) {
	        return i;
	      }
	    }
	    return -1;
	  }
	}
}

function isArray(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}


/**
 * Constant: TILE_WIDTH
 * {Integer} 256 Default tile width (unless otherwise specified)
 */
Mapea.SigcMapea.TILE_WIDTH = 256;
/**
 * Constant: TILE_HEIGHT {Integer} 256 Default tile height (unless otherwise
 * specified)
 */
Mapea.SigcMapea.TILE_HEIGHT = 256;
