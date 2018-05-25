var crimesPerBorough = {}
var crimesPerDistrict = {}

var pollutionPerBorough = {}
var pollutionPerUHF42 = {}
var pollutionPerDistrict = {}

var trafficPerBorough = {}
var trafficPerUHF42 = {}
var trafficPerDistrict = {}


var KdTree
var distance = function(a, b){
  return Math.pow(a.lat - b.lat, 2) +  Math.pow(a.lng - b.lng, 2);
}

mapCrimesToDistricts = (crimes, districtCentroids) => {

	//console.log(crimes)
	//console.log(districtCentroids)

	const helperArray = []
	for (const key of Object.keys(districtCentroids))
		helperArray.push({lat: districtCentroids[key].lat, lng: districtCentroids[key].lng})

	KdTree = new kdTree(helperArray, distance, ["lat", "lng"])

	const helperMap = {}
	for (const key of Object.keys(districtCentroids)) {

	var newKey = districtCentroids[key].lat.toString() + districtCentroids[key].lng.toString()
	helperMap[newKey] = key
	}

	//console.log(helperMap)

	for (var i = 0; i < crimes.length; i++) {
		const lat = parseFloat(crimes[i].latitude)
		const lng = parseFloat(crimes[i].longitude)

		delete crimes[i].lat_lon
		delete crimes[i].latitude
		delete crimes[i].longitude

		crimes[i]['lat'] = lat
		crimes[i]['lng'] = lng

		var nearest = KdTree.nearest({lat: crimes[i].lat, lng: crimes[i].lng}, 1)

		var nearestToKey = nearest[0][0].lat.toString() + nearest[0][0].lng.toString()

		if(!crimes[i].hasOwnProperty('districtID'))
			crimes[i].districtID = helperMap[nearestToKey]

		//console.log(helperMap[nearestToKey])

	}
	//console.log(crimes)

	for (var i = 0; i < crimes.length; i++) {

		const key = crimes[i].districtID


		if(!crimesPerDistrict.hasOwnProperty(key))
			crimesPerDistrict[crimes[i].districtID] = 1
		else 
			crimesPerDistrict[crimes[i].districtID] += 1
	}
	//console.log(crimesPerDistrict)
	crimes = null
}


treatPollution = (pollution) => {
	//console.log(pollution)
	for (var i = 0; i < 5; i++)
		pollutionPerBorough[pollution[i][14]] = {
				amount: pollution[i][16],
				place: null
			}
	
	for (var i = 0; i < pollution.length; i++) {

		var uhf42 = pollution[i][13]
		var name = pollution[i][14]
		var amount = parseFloat(pollution[i][16])

		if(!pollutionPerUHF42.hasOwnProperty(uhf42)) {
			pollutionPerUHF42[uhf42] = {
				amount,
				name
			}
		} else {
			const prevAmount = pollutionPerUHF42[uhf42].amount
			pollutionPerUHF42[uhf42].amount = ((prevAmount+amount)/2)
		}

	}
	//console.log(pollutionPerBorough)
	//console.log(pollutionPerUHF42)

	pollution = null
	return Promise.resolve()
}

treatTraffic = (traffic) => {
	//console.log(traffic)

	for (var i = 0; i < 5; i++)
		trafficPerBorough[traffic[i][14]] = {
			ammount: traffic[i][16],
			place: null
		}
	
	for (var i = 0; i < traffic.length; i++) {

		var uhf42 = traffic[i][13]
		var name = traffic[i][14]
		var amount = parseFloat(traffic[i][16])

		if(!trafficPerUHF42.hasOwnProperty(uhf42)) {
			trafficPerUHF42[uhf42] = {
				amount,
				name
			}
		} else {
			const prevAmount = trafficPerUHF42[uhf42].amount
			trafficPerUHF42[uhf42].amount = ((prevAmount+amount)/2)
		}

	}
	//console.log(trafficPerBorough)
	//console.log(trafficPerUHF42)

	traffic = null
	return Promise.resolve()
}


mapUHF42ToDistricts = (dataPerUHF42, UHF42ToDistricts, dataPerDistrict) => {

	//console.log(UHF42ToDistricts)
	//console.log(dataPerUHF42)

	for(var key of Object.keys(dataPerUHF42)) {

		const numberOfDistrictsInThatUHF42 = UHF42ToDistricts[key].length;

		for (var i = 0; i < numberOfDistrictsInThatUHF42; i++) {

			const districtID = UHF42ToDistricts[key][i]
			const dataInThatUHF42 = dataPerUHF42[key].amount

			//console.log(districtID)
			//console.log(dataInThatUHF42)

			if(!dataPerDistrict.hasOwnProperty(districtID))
				dataPerDistrict[districtID] = (dataInThatUHF42/numberOfDistrictsInThatUHF42)
			else
				dataPerDistrict[districtID] += (dataInThatUHF42/numberOfDistrictsInThatUHF42)
		}
	}
	//console.log(dataPerDistrict)

	dataPerUHF42 = null
	return Promise.resolve()
}