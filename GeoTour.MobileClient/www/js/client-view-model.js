var clientViewModel = function () {
    var self = this;

    self.showWelcomeScreen = ko.observable(true);
    self.showMapScreen = ko.observable(false);
    self.currentTour = ko.observable({});
    self.currentTourStops = ko.computed(function () {
        return self.currentTour().tourStops;
    });
    
    //************************************
    //  Menu
    //************************************
    self.menu = {
        findTourClick: function () {
            geoTour.showPopup('find-tour-popup');
        },
        TourStopsClick: function () {
            geoTour.showPopup('view-tour-popup');
        },
        ViewTourClick: function () {
            geoTour.showPopup('tour-stop-popup');
        },
    };

    //************************************
    //  Tour Data
    //************************************
    self.loadTour = function (tour) {
        var currentTour = fakeTour;
        self.currentTour(currentTour);

        self.showWelcomeScreen(false);
        self.showMapScreen(true);
        geoTour.init(self.currentTour());

        geoTour.showPopup('view-tour-popup');
    };

    self.currentDestination = ko.observable({});
    self.setDestination = function (tourStop) {
        self.currentDestination(tourStop);
        geoTour.getDirectionsToTourStop(tourStop);
        geoTour.hidePopup();
    };


    self.findTourPopup = {
        search: ko.observable(""),
        results: ko.observableArray([
            "Big Bear North Shore Tour (1.5 Miles)"
        ])
    };

    self.stopDetails = ko.observable({
        name: 'Solar Observatority',
        photos: ['https://i1.ytimg.com/vi/bTUmVM99qow/mqdefault.jpg', 'https://i1.ytimg.com/vi/o3gxOlnzx0I/mqdefault.jpg', 'https://i1.ytimg.com/vi/-9ngOxYFslI/mqdefault.jpg', 'https://i1.ytimg.com/vi/HQdKjwy1gJc/mqdefault.jpg'],
        videos: []
    });


};