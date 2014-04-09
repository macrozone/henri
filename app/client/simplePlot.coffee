
# local
math = mathjs()
chart = null
series = {}

clearChart = ->
	for serie in chart.series
		serie.setData []



addSerieIfNeeded = (variable, index) ->
	unless series[variable]?[index]?
		series[variable] = [] unless series[variable]?
		series[variable][index] = chart.addSeries 
			data: []
			name: "#{variable} #{index}"
	series[variable][index]

initHighcharts = (container)->
	new Highcharts.Chart
		chart: 
			type: "line"
			renderTo: container
			animation: false
			height: 400
		plotOptions:
			
			line:
				marker: enabled: false
				shadow: false



Template.simplePlot.events
	"click .btn-clear": clearChart

Template.simplePlot.rendered = ->
	maxPoints = 100
	chart =  initHighcharts @find ".chartcontainer"
	
	

	variablesToPlot = ['x', 'v', 'a']
	
	Deps.autorun =>
		lastResult = Session.get "lastResult"
		
		if lastResult?
			for variable in variablesToPlot
				if lastResult[variable]?
					if _.isArray lastResult[variable]
						for value, index in lastResult[variable]
							serie = addSerieIfNeeded variable, index
						
							if _.isArray value
								# it is a vector, take its first dimension
								value = value[0]
								

							shift = serie.data.length >= maxPoints
							serie.addPoint value, false, shift, false

							
			chart.redraw()
