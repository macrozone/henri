

@addNewPlot_x_t = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "x_t"
		variablesToPlot:['x', 'v', 'a']
		timeRange: 50
		highchartsOptions:
			chart: 
				zoomType: "x"
				type: "line"
				animation: false
				height: 400
			plotOptions:
				line:
					marker: enabled: false
					shadow: false

Template.plot_x_t.rendered = ->

	series = {}
	chart?.destroy()
	data = @data
	chartOptionsCompution = Deps.autorun ->
		#update the data reactivly, this is only needed in the drawDataOnChart-Function
		data.plot = Plots.findOne {_id:data.plot._id}

	@data.plot.highchartsOptions.chart.renderTo = @find ".chartcontainer"
	chart = new Highcharts.Chart @data.plot.highchartsOptions
	engine = @data.engine
	experimentID = @data.experimentID
	
	chartDrawCompution = Deps.autorun ->
		drawDataOnChart chart, series, data
	Template.plot_x_t.destroyed = ->
		chartDrawCompution?.stop()
		chartOptionsCompution?.stop()

Template.plot_x_t.events
	"click .btn-clear": (event, template)->
		chart = template.$(".chartcontainer").highcharts()
		serie.setData [] for serie in chart.series
	"change .input-timeRange": (event, template) ->
		Plots.update {_id: template.data.plot._id}, $set: timeRange: $(event.target).val()




drawDataOnChart = (chart, series, data)->
	
	{engine, plot} = data
	
	currentScope = engine.getScope()
	for variable in plot.variablesToPlot
		if currentScope?[variable]?
			if _.isArray currentScope[variable]
				for value, index in currentScope[variable]
					serie = addSerieIfNeeded chart, series, variable, index
				
					if _.isArray value
						# it is a vector, take its first dimension
						value = value[0]
					tMin = Math.max(0,currentScope.t - plot.timeRange)
					tMax = Math.max(plot.timeRange,currentScope.t)
				
					chart.xAxis[0].setExtremes tMin, tMax, false
					shift = currentScope.t - serie.data[0]?.x > plot.timeRange
					serie.addPoint [currentScope.t, value], false, shift, false
		chart.redraw()



addSerieIfNeeded = (chart, series, variable, index) ->
	unless series[variable]?[index]?
		series[variable] = [] unless series[variable]?
		series[variable][index] = chart.addSeries 
			data: []
			name: "#{variable} #{index}"
	series[variable][index]
