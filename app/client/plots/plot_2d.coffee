
shouldDrawGrid = true
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

drawGrid = (canvas, context) ->
	
	width = canvas.width
	height = canvas.height
	
	context.beginPath()
	context.moveTo(0, height/2)
	context.lineTo(width, height/2)
	context.moveTo(width/2, 0)
	context.lineTo(width/2, height)

	context.font = "20px Verdana"
	context.fillText "x", width-15, height/2-10
	context.fillText "y", width/2+10, 15

	for i in [1..9]
		context.moveTo(width/10*i, height/2-5)
		context.lineTo(width/10*i, height/2+5)
		context.moveTo(width/2-5, height/10*i)
		context.lineTo(width/2+5, height/10*i)

	context.strokeStyle = "black"
	context.stroke()

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
	drawGrid(canvas, context)
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
					
