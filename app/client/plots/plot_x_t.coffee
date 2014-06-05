

@addNewPlot_x_t = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "x_t"
		y_vars:['x'],
		t_range: 50
		title: ""
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
	@data.plot.highchartsOptions.title = "" 
	@data.plot.highchartsOptions.legend = 
		layout: "vertical", 
		itemStyle: 
			fontSize: 16 
		itemMarginBottom: 8
	chart = new Highcharts.Chart @data.plot.highchartsOptions
	window._testchart = chart
	engine = @data.engine
	experimentID = @data.experimentID
	
	chartDrawCompution = Deps.autorun ->
		if data?.plot?
			drawDataOnChart chart, series, data
	Template.plot_x_t.destroyed = ->
		chartDrawCompution?.stop()
		chartOptionsCompution?.stop()

Template.plot_x_t.events
	"click .btn-clear": (event, template)->
		chart = template.$(".chartcontainer").highcharts()
		serie.setData [] for serie in chart.series
	
Template.plot_x_t_controls.schema = ->
	new SimpleSchema 
		t_range: 
			type: Number,
			label: "time range"
			min: 1
		

		y_vars: 
			type: [String],
			label: "Expressions to plot on y-Axis (per Object). Supports mathjs expressions. x[1]: plot first dimension. _d_x[1]: plot differential of x"


Template.plot_x_t_controls.events
	"keyup input, click button": _.debounce (event, template) =>
		template.$("form").submit()
	,300

drawDataOnChart = (chart, series, data)->
	
	{engine, plot} = data
	currentScope = engine.getScope()
	checkSeries engine, plot, chart, series
	
	for key, serieGroup of series
		
		
		for serie, index in serieGroup

			if engine.isResetted()
				serie.highchartSerie.setData [] 
			currentScope._i = index+1 # mathjs indices begin with 1

			try
				value = serie.compiledExpression.eval currentScope

				if _.isArray value
					value = value[0] # sanitize
				
				xValue = currentScope.t
				xMin = Math.max(0,xValue - plot.t_range)
				xMax = Math.max(plot.t_range,xValue)
			
				chart.xAxis[0].setExtremes xMin, xMax, false
				shift = xValue - serie.highchartSerie.data[0]?.x > plot.t_range
				serie.highchartSerie.addPoint [xValue, value], false, shift, false
			catch e
				console.error e
	chart.redraw()


checkSeries = (engine, plot, chart, series) ->
	flags = {}
	if plot?.y_vars?
		for var_expression in plot.y_vars
			if var_expression?
				flags[var_expression] = true
				for object, index in engine.objects
					addSerieIfNeeded engine, chart, series, var_expression, index
		seriesToRemove = []
		for var_expression, serie  of series
			unless flags[var_expression]?
				seriesToRemove.push var_expression
		
		for var_expression in seriesToRemove
			for serie, index in series[var_expression]
				serie.highchartSerie?.remove()
			delete series[var_expression]




addSerieIfNeeded = (engine, chart, series, var_expression, index) ->
	
	unless series[var_expression]?[index]?
		try
			compiledExpression = engine.compileExpression var_expression
			series[var_expression] = [] unless series[var_expression]?
			highchartSerie = chart.addSeries 
				id: "#{var_expression}_#{index}"
				data: []
				name: "Object #{index+1}: #{var_expression} "
			
			series[var_expression][index] = 
				highchartSerie: highchartSerie
				compiledExpression: compiledExpression
		catch e
			console.error e

	series[var_expression]?[index]
