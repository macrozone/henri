

@addNewPlot_2 = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "2d"
		variablesToPlot:['x']
	

clearCanvas = (canvas, context) ->
	context.save();

	# Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0)
	context.clearRect(0, 0, canvas.width, canvas.height)

	# Restore the transform
	context.restore();

drawPixel = (context, point) ->
	[x,y] = point
	context.beginPath();
	context.arc 250+x,250+y*-1, 5, 0, 2*Math.PI
	context.fill()

Template.plot_2d.rendered = ->
	canvas = @find ".canvas"
	context = canvas.getContext "2d"
	
	data = @data
	chartOptionsCompution = Deps.autorun ->
		#update the data reactivly, this is only needed in the drawDataOnChart-Function
		data.plot = Plots.findOne {_id:data.plot._id}

	engine = @data.engine
	experimentID = @data.experimentID
	
	chartDrawCompution = Deps.autorun ->
		drawDataOnChart canvas, context, data
	
	Template.plot_x_t.destroyed = ->
		chartDrawCompution?.stop()
		chartOptionsCompution?.stop()

Template.plot_x_t.events
	"click .btn-clear": (event, template)->
		#chart = template.$(".chartcontainer").highcharts()
		#serie.setData [] for serie in chart.series
		alert "not implemented"



drawDataOnChart = (canvas, context, data)->
	clearCanvas canvas, context
	{engine, plot} = data
	
	currentScope = engine.getScope()
	for variable in plot.variablesToPlot
		if currentScope?[variable]?
			if _.isArray currentScope[variable]
				for value, index in currentScope[variable]
					if _.isArray value
						# it is a vector, take its first two dimension
						point  = [value[0], value[1]]
					else
						point = [value, 0]
					drawPixel context, point
					

