var fakeTour = {
    name: 'BigBear North Shore Tour',
    description: 'A Scenic Tour Of BigBear Lake',
    zoom: 14,
    center: [-116.911101, 34.261119],
    tourStops: [
        {
            id: 1,
            name: 'Enjoy The Beautiful North Shore',
            geometryJson: '{"type":"polygon","rings":[[[-13016977.87383157,4064386.095628465],[-13016949.209945964,4064395.6502570007],[-13016098.848006293,4064214.1123148235],[-13016194.394291649,4063879.700316076],[-13017035.201602785,4064089.9021438602],[-13016977.87383157,4064386.095628465]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13017035.201602785,"ymin":4063879.700316076,"xmax":-13016098.848006293,"ymax":4064395.6502570007,"spatialReference":{"wkid":102100}},"_partwise":null}',
            thumbnail: 'https://i1.ytimg.com/vi/bTUmVM99qow/mqdefault.jpg',
            onGeoTrigger: {
                type: 'youtube',
                id: 'o3gxOlnzx0I'
            }
        },
        {
            id: 2,
            name: 'Views From Route 38',
            geometryJson: '{"type":"polygon","rings":[[[-13019204.102280373,4063573.9522029324],[-13018497.059768736,4063784.1540307165],[-13018229.530169738,4063487.9605461117],[-13019051.228223803,4063344.641118077],[-13019204.102280373,4063573.9522029324]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13019204.102280373,"ymin":4063344.641118077,"xmax":-13018229.530169738,"ymax":4063784.1540307165,"spatialReference":{"wkid":102100}},"_partwise":null}',
            thumbnail: 'https://i1.ytimg.com/vi/o3gxOlnzx0I/mqdefault.jpg',
            onGeoTrigger: {
                type: 'youtube',
                id: 'n1wZJIJNCGg'
            }
        },
        {
            id: 3,
            name: 'Big Bear Shore View',
            geometryJson: '{"type":"polygon","rings":[[[-13015592.452693904,4063965.691972893],[-13015573.343436833,4063984.8012299645],[-13014617.88058327,4064166.3391721416],[-13014503.225040842,4063898.8095731437],[-13015516.015665619,4063784.1540307165],[-13015592.452693904,4063965.691972893]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13015592.452693904,"ymin":4063784.1540307165,"xmax":-13014503.225040842,"ymax":4064166.3391721416,"spatialReference":{"wkid":102100}},"_partwise":null}',
            thumbnail: 'https://i1.ytimg.com/vi/-9ngOxYFslI/mqdefault.jpg',
            onGeoTrigger: {
                type: 'youtube',
                id: '-9ngOxYFslI'
            }
        },
        {
            id: 4,
            name: 'Fawnskin, A City by the Lake.',
            geometryJson: '{"type":"polygon","rings":[[[-13018936.572681375,4065121.802025705],[-13018286.857940953,4065102.692768634],[-13018267.748683881,4064873.3816837785],[-13018898.354167232,4064844.7177981716],[-13018936.572681375,4065121.802025705]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13018936.572681375,"ymin":4064844.7177981716,"xmax":-13018267.748683881,"ymax":4065121.802025705,"spatialReference":{"wkid":102100}},"_partwise":null}',
            thumbnail: 'https://i1.ytimg.com/vi/HQdKjwy1gJc/mqdefault.jpg',
            onGeoTrigger: {
                type: 'youtube',
                id: 'HQdKjwy1gJc'
            }
        },
        {
            id: 5,
            name: 'Finishing the Tour as you enter Big Bear City',
            geometryJson: '{"type":"polygon","rings":[[[-13010948.903225586,4064395.650256997],[-13010031.658886164,4064510.3057994246],[-13010079.432028843,4064214.11231482],[-13010853.35694023,4064175.8938006773],[-13010948.903225586,4064395.650256997]]],"_ring":0,"spatialReference":{"wkid":102100},"_centroid":null,"_extent":{"xmin":-13010948.903225586,"ymin":4064175.8938006773,"xmax":-13010031.658886164,"ymax":4064510.3057994246,"spatialReference":{"wkid":102100}},"_partwise":null}',
            thumbnail: 'https://i1.ytimg.com/vi/0U-WrMZzrPc/mqdefault.jpg',
            onGeoTrigger: {
                type: 'youtube',
                id: '0U-WrMZzrPc'
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
    




