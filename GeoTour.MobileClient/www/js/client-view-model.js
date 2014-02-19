var clientViewModel = function () {
    var self = this;

    self.showWelcomeScreen = ko.observable(true);
    self.showMapScreen = ko.observable(false);
    self.currentTour = ko.observable({});
    self.currentTourStops = ko.computed(function () {
        return self.currentTour().tourStops;
    });
    
    self.loadTour = function (tour) {
        var currentTour = fakeTour;
        self.currentTour(currentTour);

        self.showWelcomeScreen(false);
        self.showMapScreen(true);
        geoTour.init();

        geoTour.showPopup('view-tour-popup');
    };
    



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

    self.findTourPopup = {
        search: ko.observable(""),
        results: ko.observableArray([
            "Big Bear (1.5 Miles)",
            "Big Bear (1.5 Miles)"
        ])
    };

    self.stopDetails = ko.observable({
        name: 'Solar Observatority',
        photos: ['http://www.bbso.njit.edu/Images/tour2.jpg', 'http://www.bbso.njit.edu/Images/tour2.jpg'],
        videos: ['http://www.bbso.njit.edu/Images/tour2.jpg', 'http://www.bbso.njit.edu/Images/tour2.jpg']
    });


};