
# local
shownTimeRange = 50
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
	"click .btn-clear": ->
		serie.setData [] for serie in chart.series

compution = null
Template.simplePlot.rendered = ->
	chart = initHighcharts @find ".chartcontainer"
	engine = @data.engine
	compution = Deps.autorun ->
		currentScope = engine.getScope()
		for variable in variablesToPlot
			if currentScope?[variable]?
				if _.isArray currentScope[variable]
					for value, index in currentScope[variable]
						serie = addSerieIfNeeded variable, index
					
						if _.isArray value
							# it is a vector, take its first dimension
							value = value[0]
					
						shift = currentScope.t - serie.data[0]?.x > shownTimeRange
						serie.addPoint [currentScope.t, value], false, shift, false
		chart.redraw()

Template.simplePlot.destroyed = ->
	compution?.stop()


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
