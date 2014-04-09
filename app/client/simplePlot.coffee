
# local
maxPoints = 100
variablesToPlot = ['x', 'v', 'a']

math = mathjs()
chart = null
series = {}

chartOptions = 
	chart: 
		type: "line"
		animation: false
		height: 400
	plotOptions:
		line:
			marker: enabled: false
			shadow: false


Template.simplePlot.events
	"click .btn-clear": clearChart


# a little optimisation with the "chartReady", this will cause the engine to wait publishing its initial state until the chart is ready
# do not forget to set it to false when the chart is destroyed
Session.set "chartReady", false
Template.simplePlot.rendered = ->
	chart = initHighcharts @find ".chartcontainer"
	Session.set "chartReady", true

Template.simplePlot.destroyed = ->
	Session.set "chartReady", false
	
# plot it
Deps.autorun ->
	# wait for the chart to be ready
	if Session.get "chartReady"
		currentScope = Session.get "currentScope"
	
		for variable in variablesToPlot
			if currentScope?[variable]?
				if _.isArray currentScope[variable]
					for value, index in currentScope[variable]
						serie = addSerieIfNeeded variable, index
					
						if _.isArray value
							# it is a vector, take its first dimension
							value = value[0]
							
						shift = serie.data.length >= maxPoints
						serie.addPoint value, false, shift, false
		chart.redraw()


clearChart = ->
	serie.setData [] for serie in chart.series

initHighcharts = (container)->
	series = {}
	chart?.destroy()
	chartOptions.chart.renderTo = container
	new Highcharts.Chart chartOptions

addSerieIfNeeded = (variable, index) ->
	unless series[variable]?[index]?
		series[variable] = [] unless series[variable]?
		series[variable][index] = chart.addSeries 
			data: []
			name: "#{variable} #{index}"
	series[variable][index]
