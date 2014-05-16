
shouldDrawGrid = true

@addNewPlot_2 = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "2d"
		variablesToPlot:['x']


Template.plot_2d_controls.schema = ->
	new SimpleSchema 
		scale: 
			type: String,
			label: "scale"

		
		#y_vars: 
		#	type: [String],
		#	label: "Expressions to plot on y-Axis (per Object). Supports mathjs expressions. x[1]: plot first dimension. _d_x[1]: plot differential of x"


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

drawPixel = (config, context, point) ->
	[x,y] = point
	context.beginPath();
	context.arc config.centerX+x*config.scale,config.centerY-y*config.scale, 5, 0, 2*Math.PI
	context.fill()

drawArrow = (config, context, fromx, fromy, tox, toy) ->
	fromx *= config.scale
	fromy *= config.scale
	tox *= config.scale
	toy *= config.scale
	fromx += config.centerX
	fromy = config.centerY - fromy
	tox += config.centerX
	toy = config.centerY - toy
	headlen = 8 # length of head in pixels
	angle = Math.atan2(toy - fromy, tox - fromx)
	context.beginPath()
	context.moveTo fromx, fromy
	context.lineTo tox, toy
	context.lineTo tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6)
	context.moveTo tox, toy
	context.lineTo tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6)
	context.strokeStyle = "red"
	context.stroke()

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



getPointFromValue = (value) ->
	if _.isArray value
		# it is a vector, take its first two dimension
		[value[0], value[1]]
	else
		[value, 0]
drawValueAsPixel = (config, context, value) ->
	point = getPointFromValue value
	drawPixel config, context, point

drawValueAsVector = (config, context, anchorPoint, value) ->
	point = getPointFromValue value
	endPoint = [anchorPoint[0] + point[0], anchorPoint[1] + point[1]]
	drawArrow config, context, anchorPoint[0], anchorPoint[1], endPoint[0], endPoint[1]

drawDataOnChart = (canvas, context, data)->
	clearCanvas canvas, context
	drawGrid(canvas, context)
	{engine, plot} = data
	
	# will be changed:
	vectorsToPlot =
		x: ["_d_v"]

	config = 
		centerX: canvas.width / 2
		centerY: canvas.height / 2
		scale: plot.scale || 1
	currentScope = engine.getScope()
	for variable in plot.variablesToPlot
		if currentScope?[variable]?
			if _.isArray currentScope[variable]
				for value, index in currentScope[variable]
					drawValueAsPixel config, context, value

					# draw vectors too

					if vectorsToPlot[variable]?
						for vectorVariable in vectorsToPlot[variable]
							if currentScope[vectorVariable]?[index]?
								drawValueAsVector config, context, getPointFromValue(value), currentScope[vectorVariable]?[index]
					
					
				
						

					

