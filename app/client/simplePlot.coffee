initHighcharts = (container)->
	new Highcharts.Chart
		chart: 
			type: "line"
			renderTo: container
			animation: false
		height: 800
		plotOptions:
			
			line:
				marker: enabled: false
				shadow: false



Template.simplePlot.rendered = ->
	maxPoints = 100
	chart =  initHighcharts @find ".chartcontainer"
	series = {}
	addSerieIfNeeded = (variable, index) ->
		unless series[variable]?[index]?
			series[variable] = [] unless series[variable]?
			series[variable][index] = chart.addSeries 
				data: []
				name: "#{variable} #{index}"
		series[variable][index]

	variablesToPlot = ['x']
	
	Deps.autorun =>
		lastResult = Session.get "lastResult"
		
		if lastResult?
			for variable in variablesToPlot
				if lastResult[variable]?
					if _.isArray lastResult[variable]
						for oneObject, index in lastResult[variable]
							serie = addSerieIfNeeded variable, index
						
							if _.isArray oneObject
								shift = serie.data.length >= maxPoints
								serie.addPoint oneObject[0], false, shift, false

							
			chart.redraw()
