Promise.all([

	fetchNeighborhoods(),
	//.then(() => drawNeighborhoodIcons()), 

	fetchHousingData()
	.then(() => drawHouseIcons(housingData))
	])
.then(() => {
	//console.log(housingDataById)

})


Promise.all([

	fetchDistrictGeoshapes()
	.then(() => drawDistrictGeoshapes(districtGeoshapes)),

	fetchCrimes(),

	fetchPollution()
	.then(() => treatPollution(pollution))
	.then(()=> treatTraffic(traffic))

]).then(() => {
	
	mapCrimesToDistricts(crimes, districtCentroids)
	
	mapUHF42ToDistricts(pollutionPerUHF42, UHF42ToDistricts, pollutionPerDistrict)

	mapUHF42ToDistricts(trafficPerUHF42, UHF42ToDistricts, trafficPerDistrict)

})


