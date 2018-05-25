headerChart = document.getElementById('headerChart')
mainChart = document.getElementById('mainChartContainer')

showingChart = false
prevBtn = null

var dataToGraph = {}

showChart = (buttonID) => {

	//var dataToGraph = {}

	switch(buttonID){
		case 'crimesBtn':
			dataToGraph = crimesPerDistrict
			break
		case 'trafficBtn':
			dataToGraph = trafficPerDistrict
			break
		case 'pollutionBtn':
			dataToGraph = pollutionPerDistrict
			break
		case 'tableBtn':
			dataToGraph = { 101: 20 }
			break
		default:
			dataToGraph = { 101: 20 }
			break
	}

	d3.select('svg').remove()

	if(showingChart==false) {

		headerChart.style.display = 'inline-block'
		mainChart.style.display = 'inline-block'
		drawBarsGraph(dataToGraph)
		showingChart = true

	} else if(prevBtn==buttonID) {

		headerChart.style.display = 'none'
		mainChart.style.display = 'none'
		showingChart = false
		
	} else {
		drawBarsGraph(dataToGraph)
	}

	prevBtn = buttonID
	
}

setClickConfirmingDistrictID = (item) => {
	google.maps.event.addListener(item, 'click', function(e) {
		console.log(getDistrictID(e.latLng))
	})
}