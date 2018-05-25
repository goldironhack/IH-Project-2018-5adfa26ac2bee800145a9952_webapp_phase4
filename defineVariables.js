const NEIBORHOOD_NAMES_URL = 'https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD'
const DISTRICT_GEOSHAPES_URL = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson'
const CRIMES_URL = 'https://data.cityofnewyork.us/resource/9s4h-37hy.json?cmplnt_fr_dt=1015-02-14T00:00:00.000'
const HOUSING_URL = 'https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?acces'
const POLLUTION_URL = 'https://data.cityofnewyork.us/api/views/c3uy-2p5r/rows.json?accessType=DOWNLOAD'

const SCHOOL_COORDS = {lat: 40.729754, lng: -73.996330}

var map

var housingDataById = {}

var polygons = []

const UHF42ToDistricts = {
	101: [208, 226],
	102: [226, 212],
	103: [207, 227],
	104: [211, 209, 210, 228],
	105: [205, 206, 227],
	106: [204, 203],
	107: [201, 202, 401],
	201: [301],
	202: [302, 306],
	203: [308, 309, 316],
	204: [305],
	205: [307],
	206: [312],
	207: [314, 317, 355],
	208: [318, 356],
	209: [310, 311],
	210: [313, 315],
	211: [303, 304],
	301: [112],
	302: [109, 110],
	303: [111],
	304: [107, 164],
	305: [108],
	306: [104, 105],
	307: [106],
	308: [102],
	309: [103],
	310: [101],
	401: [401],
	402: [480, 403, 402, 404, 481],
	403: [407, 481],
	404: [411],
	405: [405, 406],
	406: [408, 481],
	407: [409, 410],
	408: [412, 483],
	409: [413],
	410: [414],
	501: [501],
	502: [501, 502, 595],
	503: [502],
	504: [503, 595]
}