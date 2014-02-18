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
            self.currentLocation = [];

            self.init = function () {
                navigator.geolocation.getCurrentPosition(function (position) {

                    self.currentLocation = position.coords;

                    //Initialize Map
                    self.map = new esriMap("map-surface", {
                        basemap: 'streets',
                        zoom: 14,
                        center: [self.currentLocation.longitude, self.currentLocation.latitude]
                    });

                    self.tourGraphicsLayer = new esriGraphicsLayer({
                        opacity : 0.5
                    });
                    
                    self.map.addLayer(self.tourGraphicsLayer);

                    self.map.on('load', function () {
                        self.loadTourData();
                        self.drawHotSpotsForTour();
                        //self.checkGeoFences();
                    });

                });

                //Handle Location Change
                navigator.geolocation.watchPosition(function (position) {
                    if (self.currentLocation.longitude != position.coords.longitude || self.currentLocation.latitude != position.coords.latitude) {
                        self.currentLocation = position.coords;
                        self.locationChanged();
                    }
                });
            };

            //**************************************
            // Map Functions
            //**************************************
            self.locationChanged = function () {
                var currentLocationPt = new esriPoint(self.currentLocation.longitude, self.currentLocation.latitude);
                self.map.centerAt(currentLocationPt);
                self.checkGeoFences();
            };            


            //**************************************
            // Tour Data
            //**************************************
            self.loadTourData = function () {
                self.tourData = _.map(fakeData, function (dataEntry) {
                    var polyDef = JSON.parse(dataEntry.geomentryJson);

                    var ploygon = new esriPolygon(polyDef.spatialReference);
                    ploygon.rings = polyDef.rings;
                    
                    return $.extend({ geometry: ploygon }, dataEntry);
                });
            };

            //Paint Tour's Hot Spots On Map
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

            //Check if current location is inside a geo fence of the tour
            self.checkGeoFences = function () {
                var currentLocationPt = new esriPoint(self.currentLocation.longitude, self.currentLocation.latitude);
                _.each(self.tourData, function (tourEntry) {
                    if (tourEntry.geometry.contains(currentLocationPt)) {
                        if (tourEntry.onGeoTrigger.played == null) {
                            self.playTourGeoFenceContent(tourEntry);
                        }
                    }
                });
            };

            //Play content for current tour entry
            self.playTourGeoFenceContent = function (tourEntry) {
                $('.popup-content').hide();
                
                switch (tourEntry.onGeoTrigger.type) {
                    case 'audio':
                        $("#audio-popup").show();
                        var audioPlayer = $("#audio-player");
                        audioPlayer.attr("src", tourEntry.onGeoTrigger.src);
                        audioPlayer[0].play();
                        break;
                    case 'youtube':
                        $("#youtube-popup").show();
                        var youtubePlayer = $("#youtube-player");
                        youtubePlayer.attr('src', '//www.youtube.com/embed/' + tourEntry.onGeoTrigger.id + '?autoplay=1');
                        break;
                    
                    default:
                        
                    break;
                }
                
                $("#popup-wrapper").fadeIn();
            };


            //Call Init
            document.addEventListener('deviceready', function () {
                self.init();
            }, false);
        });

})();

