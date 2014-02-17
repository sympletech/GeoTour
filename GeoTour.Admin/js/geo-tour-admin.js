var geoTourAdmin = new (function () {
    var self = this;

    self.map = null;

    self.init = function() {
        navigator.geolocation.getCurrentPosition(function(location) {

            require(["esri/map"], function (Map) {
                self.map = new Map("map-surface", {
                    basemap: 'streets',
                    zoom: 10,
                    center: [location.coords.longitude, location.coords.latitude],
                });
            });
        });        
    };
    self.init();
})();