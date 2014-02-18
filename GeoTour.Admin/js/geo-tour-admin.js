var geoTourAdmin = new (function () {
    var self = this;

    //Esri JS Includes
    require(["esri/map", "esri/toolbars/draw", "esri/graphic", "esri/symbols/SimpleFillSymbol"],
        function (esriMap, esriDraw, esriGraphic, esriSimpleFillSymbol) {


        self.map = null;
        self.toolbar = null;

        self.init = function() {
            navigator.geolocation.getCurrentPosition(function(location) {


                self.map = new esriMap("map-surface", {
                    basemap: 'streets',
                    zoom: 14,
                    //center: [location.coords.longitude, location.coords.latitude],
                    center: [-116.910672, 34.259984]
                });

                self.map.on('load', function() {
                    self.initDrawingTool();
                    self.startDrawingPolygon();
                });
            });
        };
        self.init();
        
        //Drawing Tools
        self.initDrawingTool = function() {
            self.toolbar = new esriDraw(self.map);

            self.toolbar.on("draw-end", function (evt) {
                self.toolbar.deactivate();

                var symbol = new esriSimpleFillSymbol();
                var graphic = new esriGraphic(evt.geometry, symbol);
                self.map.graphics.add(graphic);

                self.map.showZoomSlider();

                console.log(JSON.stringify(evt.geometry));

            });
        };

        self.startDrawingPolygon = function () {
            self.map.hideZoomSlider();

            self.toolbar.activate(esriDraw.POLYGON, {
                showTooltips: true
            });
        };


    });

})();