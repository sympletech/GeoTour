var clientViewModel = function () {
    var self = this;

    self.currentTour = ko.observable({
        name: 'Big Bear Lake California',
        tourStops: [
            {
                id: 1,
                name: 'Fawnskin',
                thumbnail: 'http://www.bbso.njit.edu/Images/tour2.jpg'
            },
            {
                id: 2,
                name: 'Observatority',
                thumbnail: 'http://www.bbso.njit.edu/Images/tour2.jpg'
            }
        ]
    });

    self.showTourStopsButton = ko.observable(true);
    self.showViewTourOnMapButton = ko.observable(true);

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
        search: ko.observable("Hello"),
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