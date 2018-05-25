var data = []
var max = -1
var min = 999999999999

drawBarsGraph = (dataPerDistrict) => {

	data = []

	for(var key of Object.keys(dataPerDistrict)) {
		
		const districtID = key
		const amount = dataPerDistrict[key]

		data.push({
			amount,
			districtID
		})

		if(amount > max) max = amount
		if(amount < min) min = amount

	}

	var margin = {
	top: 30,
	right: 30,
	bottom: 10,
	left: 50
}

	var barWidth = 10
	var height = 259 - margin.top - margin.bottom
	var width = data.length*barWidth - margin.right - margin.left
	var animateDuration = 700
	var animateDelay = 500/data.length

	var tooltip = d3.select('body')
		.append('div')
			.style('position', 'absolute')
			.style('background', '#f4f4f4')
			.style('padding', '5 15px')
			.style('border', '1px solid #333')
			.style('border-radius', '5px')
			.style('opacity', '0')

	var yScale = d3.scale.linear()
		.domain([0, max]) // conjunct of values
		.range([0, height])        // actual size

	var xScale = d3.scale.ordinal()
		.domain(d3.range(0, data.length))
		.rangeBands([0, width])

	var colors = d3.scale.linear()
		.domain([0, data.length])
		.range(['lightpink', 'pink'])


	var chart = d3.select('#mainChart')
	.append('svg')
		.attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
			.attr('transform', 'translate('+margin.left+', '+margin.top+')')
		.style('background', 'lightgrey')
		.selectAll('rect')
			.data(data)
			.enter()
			.append('rect')
				.style('fill', (d, i) => colors(i))
				.attr('width', xScale.rangeBand())
				.attr('height', 0)
				.attr('x', (d, i) => {
					return xScale(i)
				})
				.attr('y', height)

		.on('mouseover', function(d){
			tooltip.transition()
				.style('opacity', 1)

			tooltip.html(d)
				.style('left', (d3.event.pageX)+'px')
				.style('top', (d3.event.pageY+'px'))

			d3.select(this)
				.style('opacity', 0.5)

		})
		.on('mouseout', function(d){
			tooltip.transition()
				.style('opacity', 0)

			d3.select(this)
				.style('opacity', 1)
		})

	chart.transition()
		.attr('height', function(d) {
			return yScale(d.amount)
		})
		.attr('y', function(d) {
			return height - yScale(d.amount)
		})
		.duration(animateDuration)
		
		.delay(function(d, i) {
			return i*animateDelay
		})
		.ease('elastic')


	var vScale = d3.scale.linear()
		.domain([0, max])
		.range([height, 0])

	var hScale = d3.scale.ordinal()
		.domain(d3.range(0, data.length))
		.rangeBands([0, width])

	// Vertical Axis
	var vAxis = d3.svg.axis()
		.scale(vScale) 
		.orient('left')
		.ticks(5)
		.tickPadding(5)

	// Vertical Guide
	var vGuide = d3.select('svg')
		.append('g')
			vAxis(vGuide)
			vGuide.attr('transform', 'translate('+margin.left+', '+margin.top+')')
			vGuide.selectAll('path')
				.style('fill', 'none')
				.style('stroke', 'black')
			vGuide.selectAll('line')
				.style('stroke', 'black')


	// Horizontal Axis
	var hAxis = d3.svg.axis()
		.scale(hScale)
		.orient('bottom')
		.tickValues(hScale.domain().filter(function(d, i) {
			return !(i % (data.length/5))
		}))

	// Horizontal Guide
	var hGuide = d3.select('svg')
		.append('g')
			hAxis(hGuide)
			hGuide.attr('transform', 'translate('+margin.left+', '+(height+margin.top)+')')
			hGuide.selectAll('path')
				.style('fill', 'none')
				.style('stroke', 'black')
			hGuide.selectAll('line')
			.style('stroke', 'black')

	return Promise.resolve()

}

