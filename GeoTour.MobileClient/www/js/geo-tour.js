var geoTour = new (function () {
    var self = this;

    self.map = null;

    self.init = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
            require(["esri/map"], function (Map) {
                self.map = new Map("map-surface", {
                    basemap: 'streets',
                    zoom: 14,
                    center: [position.coords.longitude, position.coords.latitude]
                });
            });
        });
        
        navigator.geolocation.watchPosition(function (position) {
            require(["esri/geometry/Point"], function (Point) {
                var currentLocation = new Point(position.coords.longitude, position.coords.latitude);
                self.map.centerAt(currentLocation);

            });
        });


    };


    //Init
    document.addEventListener('deviceready', function () {
        self.init();
    }, false);
    
})();