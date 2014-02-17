var geoTour = new (function () {
    var self = this;

    //Esri JS Includes
    require(["esri/map", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/graphic",
            "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol"],
        function (esriMap, esriGraphicsLayer, esriPoint, esriPolygon, esriGraphic,
            esriSimpleFillSymbol, esriSimpleLineSymbol) {

            self.map = null;
            self.tourGraphicsLayer = null;
            self.tourData = null;

            self.init = function () {
                navigator.geolocation.getCurrentPosition(function (position) {

                    self.map = new esriMap("map-surface", {
                        basemap: 'streets',
                        zoom: 14,
                        center: [position.coords.longitude, position.coords.latitude]
                    });

                    self.tourGraphicsLayer = new esriGraphicsLayer({
                        opacity : 0.5
                    });
                    
                    self.map.addLayer(self.tourGraphicsLayer);

                    self.map.on('load', function () {
                        self.loadTourData();
                        self.drawHotSpotsForTour();
                    });

                });

                navigator.geolocation.watchPosition(function (position) {
                    var currentLocation = new esriPoint(position.coords.longitude, position.coords.latitude);
                    self.map.centerAt(currentLocation);
                });

            };

            //Tour Data
            self.loadTourData = function () {
                self.tourData = _.map(fakeData, function (dataEntry) {
                    var polyDef = JSON.parse(dataEntry.geomentryJson);

                    var ploygon = new esriPolygon(polyDef.spatialReference);
                    ploygon.rings = polyDef.rings;
                    
                    return $.extend({ geometry: ploygon }, dataEntry);
                });
            };

            self.drawHotSpotsForTour = function () {
                _.each(self.tourData, function (tourEntry) {
                    var symbol = new esriSimpleFillSymbol(esriSimpleFillSymbol.STYLE_SOLID,
                        new esriSimpleLineSymbol(esriSimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color("#000"), 2), new dojo.Color("#fff")
                    );

                    var graphic = new esriGraphic(tourEntry.geometry, symbol);
                    self.tourGraphicsLayer.add(graphic);
                });
            };


            //Call Init
            document.addEventListener('deviceready', function () {
                self.init();
            }, false);
        });

})();

