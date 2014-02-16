var geoTour = new (function () {
    var self = this;

    self.map = null;

    self.initMap = function () {
        require(["esri/map"], function (Map) {
            navigator.geolocation.getCurrentPosition(function (position) {
                
                self.map = new Map("map-surface", {
                    center: [position.coords.longitude, position.coords.latitude]
                });

            });

            
        });
    };


    //Init
    self.initMap();
})();