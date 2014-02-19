var geoTour = new (function () {
    var self = this;
    self.proxyUrl = "http://webappsproxydev.esri.com/OAuth";
    
    var debugMode = true;

    //Esri JS Includes
    require(["esri/map", "esri/layers/GraphicsLayer", "esri/geometry/Point", "esri/geometry/Polygon", "esri/graphic",
            "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/PictureMarkerSymbol",
            "esri/urlUtils", "esri/dijit/Directions", "esri/tasks/RouteParameters", "esri/geometry/webMercatorUtils"],
        function (esriMap, esriGraphicsLayer, esriPoint, esriPolygon, esriGraphic,
            esriSimpleFillSymbol, esriSimpleLineSymbol, esriPictureMarkerSymbol,
            esriurlUtils, esriDirections, esriRouteParameters, esriwebMercatorUtils) {

            self.map = null;
            self.tourGraphicsLayer = null;
            self.trackerGraphicsLayer = null;
            self.tourData = null;
            self.currentLocation = [];
            self.directionFinder = null;

            self.init = function () {
                esriurlUtils.addProxyRule({
                    urlPrefix: "route.arcgis.com",
                    proxyUrl: 'http://webappsproxydev.esri.com/OAuth'
                });                

                navigator.geolocation.getCurrentPosition(function (position) {

                    self.currentLocation = position.coords;

                    //Initialize Map
                    self.map = new esriMap("map-surface", {
                        basemap: 'streets',
                        zoom: 14,
                        center: [self.currentLocation.longitude, self.currentLocation.latitude]
                    });

                    self.tourGraphicsLayer = new esriGraphicsLayer();
                    self.trackerGraphicsLayer = new esriGraphicsLayer();
                    
                    self.map.addLayer(self.tourGraphicsLayer);
                    self.map.addLayer(self.trackerGraphicsLayer);

                    self.map.on('load', function () {
                        self.loadTourData();
                        self.drawCurrentLocation();
                        self.drawHotSpotsForTour();
                        self.checkGeoFences();

                        self.getDirections(self.tourData[1].geometry);
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
                self.drawCurrentLocation();
                self.checkGeoFences();

                var startCoords = currentLocationPt.x + "," + currentLocationPt.y;
                self.directionFinder.updateStop(startCoords, 0);
                self.directionFinder.getDirections();
            };

            self.drawCurrentLocation = function () {
                var currentLocationPt = new esriPoint(self.currentLocation.longitude, self.currentLocation.latitude);
                var starIcon = new esriPictureMarkerSymbol("img/star.png", 25, 25);
                var starIconGraphic = new esriGraphic(currentLocationPt, starIcon);

                self.trackerGraphicsLayer.clear();
                self.trackerGraphicsLayer.add(starIconGraphic);
            };

            
            self.getDirections = function (destination) {
                var currentLocationPt = new esriPoint(self.currentLocation.longitude, self.currentLocation.latitude);
                var destinationPt = esriwebMercatorUtils.webMercatorToGeographic(destination.getCentroid());
                
                var rParams = new esriRouteParameters();
                rParams.directionsLengthUnits = esri.Units.MILES;
                var startCoords = currentLocationPt.x + "," + currentLocationPt.y;
                var finishCoords = destinationPt.x + "," + destinationPt.y;
                
                self.directionFinder = new esriDirections({
                    map: self.map,
                    routeParams: rParams,
                    geocoderOptions: { autoNavigate: false },
                    stops: [startCoords , finishCoords]
                }, "directions-surface");

                self.directionFinder.startup();

                setTimeout(function () {
                    self.directionFinder.getDirections();
                    self.directionFinder.on('directions-finish', function () {
                        self.readRoute();
                    });
                }, 1000);
                

            };
            self.routeList = null;
            
            self.readRoute = function () {
                self.routeList = $('.esriRoute');

                $("#route-wrapper").html(self.routeList[1].outerHTML);

                var routeDetails = "";
                for (var i = 2; i < self.routeList.length; i++) {
                    routeDetails += self.routeList[i].outerHTML;
                }
                $("#route-detail-wrapper").html(routeDetails);
            };


            //**************************************
            // Tour Data
            //**************************************
            self.loadTourData = function () {
                self.tourData = _.map(fakeTour.steps, function (dataEntry) {
                    var polyDef = JSON.parse(dataEntry.geometryJson);

                    var ploygon = new esriPolygon(polyDef.spatialReference);
                    ploygon.rings = polyDef.rings;
                    
                    return $.extend({ geometry: ploygon }, dataEntry);
                });
            };

            //Paint Tour's Hot Spots On Map
            self.drawHotSpotsForTour = function () {
                _.each(self.tourData, function (tourEntry) {
                    if (debugMode) {
                        var symbol = new esriSimpleFillSymbol(esriSimpleFillSymbol.STYLE_SOLID,
                            new esriSimpleLineSymbol(esriSimpleLineSymbol.STYLE_SOLID,
                                new dojo.Color("#000"), 2), new dojo.Color("#fff")
                        );

                        var graphic = new esriGraphic(tourEntry.geometry, symbol);
                        self.tourGraphicsLayer.add(graphic);
                    }

                    var pushPin = new esriPictureMarkerSymbol("img/esri-pins/Beta_MapPin_BlueStar36.png", 19, 36);
                    var pushPinGraphic = new esriGraphic(tourEntry.geometry.getCentroid(), pushPin);
                    self.tourGraphicsLayer.add(pushPinGraphic);
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
                $(".media-player").hide();

                switch (tourEntry.onGeoTrigger.type) {
                    case 'audio':
                        var audioPlayer = $("#audio-player");
                        audioPlayer.attr("src", tourEntry.onGeoTrigger.src);
                        audioPlayer[0].play();
                        audioPlayer.show();
                        break;
                    case 'youtube':
                        var youtubePlayer = $("#youtube-player");
                        youtubePlayer.attr('src', '//www.youtube.com/embed/' + tourEntry.onGeoTrigger.id + '?autoplay=1');
                        youtubePlayer.show();
                        break;
                    
                    default:
                        
                    break;
                }
                
                self.showPopup('tour-stop-popup');
            };

            self.showPopup = function (popupName) {
                $('.popup-content-wrapper').hide();
                $("#" + popupName).show();
                $("#popup-wrapper").fadeIn();

            };

            self.hidePopup = function () {
                $("#popup-wrapper").fadeOut();
            };

            //**************************************
            // Menu
            //**************************************
            self.registerMenuButtons = function () {
                $("#menu-button").on("click", function () {
                    var $menu = $("#menu"),
                        curHeight = $menu.height(),
                        targetHeight = curHeight == 0 ? 100 : 0;

                    TweenLite.to($menu, 0.5, { height: targetHeight });

                });

                $(".close-popup").on("click", function () {
                    self.hidePopup();
                });

                $("#route-wrapper").on("click", function () {
                    var $routeDetails = $("#route-detail-wrapper");
                    if ($routeDetails.is(':visible')) {
                        $routeDetails.fadeOut();
                    } else {
                        $routeDetails.fadeIn();
                    }
                });

            };

            //Call Init
            document.addEventListener('deviceready', function () {

            }, false);
            $(function() {
                self.init();
                self.registerMenuButtons();
            });

        });

})();

