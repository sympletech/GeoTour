var fakeTour = {
    name: 'BigBear Lake',
    description: 'A Scenic Tour Of BigBear Lake',
    zoom: 14,
    center: [-116.911101, 34.261119],
    steps: [
        {
            id: 1,
            name: 'Fawnskin',
            geometryJson: '{"type":"polygon","rings":[[[-13018955.681938447,4065140.911282784],[-13018936.572681375,4065150.4659113195],[-13018315.52182656,4065121.8020257126],[-13018277.303312417,4064892.490940857],[-13018860.13565309,4064863.8270552503],[-13018955.681938447,4065140.911282784]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13018955.681938447,"ymin":4064863.8270552503,"xmax":-13018277.303312417,"ymax":4065150.4659113195,"spatialReference":{"wkid":102100}},"_partwise":null}',
            onGeoTrigger: {
                type: 'audio',
                src: 'http://www.villagegeek.com/downloads/webwavs/austinmail2.wav'
            }
        },
        {
            id: 2,
            name: 'Observatority',
            geometryJson: '{"type":"polygon","rings":[[[-13018210.420912668,4063956.137344365],[-13018000.219084883,4064003.910487043],[-13017704.025600279,4063822.3725448665],[-13017866.454285385,4063526.1790602617],[-13018200.866284132,4063612.1707170825],[-13018210.420912668,4063956.137344365]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13018210.420912668,"ymin":4063526.1790602617,"xmax":-13017704.025600279,"ymax":4064003.910487043,"spatialReference":{"wkid":102100}},"_partwise":null} ',
            onGeoTrigger: {
                type: 'audio',
                src: 'http://www.villagegeek.com/downloads/webwavs/austinmail2.wav'
            }
        }
    ]
    

};


var fakeData = [
    {
        //33.954467,-117.211472
        id : 1,
        name : 'Moreno Valley',
        geomentryJson: '{"type":"polygon","rings":[[[-13058345.716513494,4024707.9451128137],[-13033121.497179376,4025319.441339095],[-13026853.660859989,4020580.3455854123],[-13036178.978310784,4012019.3984174696],[-13054982.487268945,4016452.7460580114],[-13059721.583022628,4021497.589924835],[-13058345.716513494,4024707.9451128137]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13059721.583022628,"ymin":4012019.3984174696,"xmax":-13026853.660859989,"ymax":4025319.441339095,"spatialReference":{"wkid":102100}},"_partwise":null}',

        onGeoTrigger : {
            type: 'audio',
            src: 'http://www.villagegeek.com/downloads/webwavs/austinmail2.wav'
        }        

        //onGeoTrigger : {
        //    type: 'youtube',
        //    id: 'XI_lBsf-I6I'
        //}
    }
];
    




