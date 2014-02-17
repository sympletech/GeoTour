var geoTour = new (function () {
    var self = this;

    //Esri JS Includes
    require(["esri/map", "esri/geometry/Point"], function (Map, Point) {

        self.map = null;

        self.init = function() {
            navigator.geolocation.getCurrentPosition(function(position) {


                self.map = new Map("map-surface", {
                    basemap: 'streets',
                    zoom: 14,
                    center: [position.coords.longitude, position.coords.latitude]
                });

            });

            navigator.geolocation.watchPosition(function(position) {
                var currentLocation = new Point(position.coords.longitude, position.coords.latitude);
                self.map.centerAt(currentLocation);
            });

        };


        //Call Init
        document.addEventListener('deviceready', function() {
            self.init();
        }, false);
    });
    
})();

