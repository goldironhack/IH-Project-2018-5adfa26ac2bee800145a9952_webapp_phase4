fetchNeighborhoods = () => {
	return fetch(NEIBORHOOD_NAMES_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
    //console.log(data)
		for(var i=0; i<data.length; i++) {

			var latLng = data[i][9]

			latLng = latLng.substring(7)
			latLng = latLng.substring(0, latLng.length-1)

			//var latLng = new google.maps.LatLng(crimes[i].latitude, crimes[i].longitude)

			var latArr = latLng.split(' ')
			lat = latArr[1]
			lng = latArr[0]

			neighborhoods.push({
				name: data[i][10],
				lat,
				lng,
				borough: data[i][16]
			})
		}
		//console.log(neighborhoods)
	})
}

fetchDistrictGeoshapes = () => {
	return fetch(DISTRICT_GEOSHAPES_URL)
	.then(response => response.json())
	.then(json => json.features)
	.then(features => {
    //console.log(features)
		for(var i=0; i<features.length; i++) {
			districtGeoshapes.push({
				properties: features[i].properties,
				geometry: features[i].geometry
			})
		}
	})
}


var crimes = []
var pollution = []
var neighborhoods = []
var districtGeoshapes =[]
var housingData = []
var traffic = []

fetchCrimes = () => {

	return $.ajax({
    url: "https://data.cityofnewyork.us/resource/qgea-i56i.json",
    type: "GET",
    data: {
      "$limit" : 5000
      //"$$app_token" : "YOURAPPTOKENHERE"
    }
	}).done((data) => {
		crimes = data
		return Promise.resolve(crimes)
	})	
}

fetchHousingData = () => {
	return fetch(HOUSING_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
    //console.log(data)
		for(var i=0; i<data.length; i++) {
      if(data[i][23]!==null && data[i][24]!==null)
        housingData.push(data[i])
    }
  })
}

fetchPollution = () => {
	return fetch(POLLUTION_URL)
	.then(response => response.json())
	.then(json => json.data)
	.then(data => {
		//console.log(data)
		benzeneGlobalProp = 'Air Toxics Concentrations- Average Benzene Concentrations'
		formaldehydeGlobalProp = 'Air Toxics Concentrations- Average Formaldehyde Concentrations'
		
		trafficGlobalProp = 'Traffic Density- Annual Vehicle Miles Traveled (VMT)'

		for (var i = 0; i < data.length; i++) {
			tenthProp = data[i][10]
			twelfthProp = data[i][12]
			if((tenthProp == benzeneGlobalProp || tenthProp == formaldehydeGlobalProp) && twelfthProp == "UHF42")
				pollution.push(data[i])
			else if(tenthProp == trafficGlobalProp  && twelfthProp == "UHF42")
				traffic.push(data[i])
		}
	})
}