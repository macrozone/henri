 

DEFAULT_PLOT_SIZE = 100

@addNewPlot_2 = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "2d"
		variablesToPlot:['x']


Template.plot_2d_controls.schema = ->
	new SimpleSchema 
		size: 
			type: String,
			label: "size"
		vectors:
			type: [String]
			label: "Vectors to plot (x,y,color)"
		

		

		
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

drawGrid = (canvas, context, plot) ->
	
	width = canvas.width
	height = canvas.height
	centerX = width/2
	centerY = height/2
	context.strokeStyle = "#666"
	context.fillStyle = "#666"
	context.beginPath()
	context.moveTo(0, centerY)
	context.lineTo(width, centerY)
	context.moveTo(centerX, 0)
	context.lineTo(centerX, height)

	context.font = "20px Verdana"
	context.fillText "x", width-15, centerY-10
	context.fillText "y", centerX+10, 15
	
	

	minMarkers = 5
	maxMarkers = 50
	numberOfMarkers = plot.size
	
	while numberOfMarkers < minMarkers
		numberOfMarkers *=10
	while numberOfMarkers > maxMarkers
		numberOfMarkers /=10
	
	
	
	for i in [1..numberOfMarkers/2]
		if i%5 == 0
			markerHeight = if i%10 == 0 then 24 else 16
		else
			markerHeight = 8

		context.moveTo(centerX+width/numberOfMarkers*i, centerY-markerHeight/2)
		context.lineTo(centerX+width/numberOfMarkers*i, centerY+markerHeight/2)
		context.moveTo(centerX-markerHeight, centerY+height/numberOfMarkers*i)
		context.lineTo(centerX+markerHeight, centerY+height/numberOfMarkers*i)

		context.moveTo(centerX-width/numberOfMarkers*i, centerY-markerHeight/2)
		context.lineTo(centerX-width/numberOfMarkers*i, centerY+markerHeight/2)
		context.moveTo(centerX-markerHeight, centerY-height/numberOfMarkers*i)
		context.lineTo(centerX+markerHeight, centerY-height/numberOfMarkers*i)

	
	context.stroke()

drawPixel = (config, context, x, y, color = "#000") ->

	context.beginPath();
	context.fillStyle = color
	context.arc config.centerX+x*config.scale,config.centerY-y*config.scale, 5, 0, 2*Math.PI
	context.fill()

drawArrow = (config, context, fromx = 0, fromy = 0, tox = 0, toy = 0, color = "#f00") ->
	
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
	context.strokeStyle = color
	context.stroke()

Template.plot_2d.rendered = ->
	canvas = @find ".plot_2d_canvas canvas"
	
	context = canvas.getContext "2d"
	
	data = @data
	chartOptionsCompution = Deps.autorun ->
		#update the data reactivly, this is only needed in the drawDataOnChart-Function
		data.plot = Plots.findOne {_id:data.plot._id}

	engine = @data.engine
	experimentID = @data.experimentID
	
	chartDrawCompution = Deps.autorun ->
		drawDataOnChart canvas, context, data.engine, data.plot
	
	Template.plot_x_t.destroyed = ->
		chartDrawCompution?.stop()
		chartOptionsCompution?.stop()

Template.plot_2d_controls.events
	"keyup input": _.debounce (event, template) =>
		
		template.$("form").submit()
	,300

Template.plot_2d_canvas.rendered = ->

	fixCanvasSize = _.debounce =>

		width = @$ ".plot_2d_canvas"
		.width()
		
		maxWidthHeight = $(window).height() - 120
		
		width = Math.min width, maxWidthHeight
		canvas = @$("canvas").get 0

		canvas.width = width
		canvas.height = width
		
		context = canvas.getContext "2d"
		#update canvas
		drawDataOnChart canvas, context, @data.engine, @data.plot
	,600

	$(window).on "resize", fixCanvasSize
	fixCanvasSize()
	Template.plot_2d_canvas.destroyed = ->
		$(window).off "resize", fixCanvasSize


drawVector = (config, context, anchorX, anchorY, valueX, valueY, color = "#f00") ->
	
	anchorX = 0 unless anchorX?
	anchorY = 0 unless anchorY?
	valueX = 0 unless valueX?
	valueY = 0 unless valueY?
	drawArrow config, context, anchorX, anchorY, anchorX + valueX, anchorY + valueY, color


drawDataOnChart = (canvas, context, engine, plot)->
	clearCanvas canvas, context
	

	# makes it reactive for plot changes
	plot = Plots.findOne plot._id
	plot.size = DEFAULT_PLOT_SIZE unless plot.size? and plot.size > 0
	
	drawGrid canvas, context, plot
	currentScope = engine.getScope()
	x_expression = engine.compileExpression plot?.x_var
	y_expression = engine.compileExpression plot?.y_var
	x_expression_vector = engine.compileExpression plot?.x_vector
	y_expression_vector = engine.compileExpression plot?.y_vector
	
	

	config = 
		centerX: canvas.width / 2
		centerY: canvas.height / 2
		scale: canvas.width / plot.size

	if plot?.vectors?
		for object, index in engine.objects
			currentScope._i = index+1 # mathjs indices begin with 1
			value_x_anchor = 0
			value_y_anchor = 0
			for vector_expression, index in plot.vectors
				vector_expression_compiled = engine.compileExpression "[#{vector_expression}]"
				
				try
					result = _.flatten vector_expression_compiled?.eval currentScope
					if _(result).size() > 2
						[values..., color] = result
					else
						values = result
						color = "black"
					# only take first two components
					[value_x, value_y] = values
				catch e
					console.error e
					value_x = 0
					value_y = 0
				
				if index == 0
					drawPixel config, context, value_x, value_y, color
					value_x_anchor = value_x
					value_y_anchor = value_y
				else
					drawVector config, context, value_x_anchor, value_y_anchor, value_x, value_y, color
				
			
					
				
						

					

