

DEFAULT_PLOT_SIZE = 100

@addNewPlot_3d = (experimentID)->
	Plots.insert 
		experimentID: experimentID
		type: "3d"


Template.plot_3d_controls.schema = ->
	new SimpleSchema 
		vectors:
			type: [String]
			label: "Vectors to plot (x,y,z) (currently only one vector is supported)"

Template.plot_3d_controls.formType = ->
	experiment = Experiments.findOne _id: @experimentID
	if Meteor.userId()? and experiment?.user_id == Meteor.userId()
		"update"
	else
		"disabled"


Template.plot_3d.rendered = ->
	# init threejs
	camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 1, 4000);
	camera.position.z = 500;

	scene = new THREE.Scene();

	scene.add(camera);
	
	ambientLight = new THREE.AmbientLight(0xff);
	scene.add(ambientLight);
      
    
	directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);
	drawAxis scene

	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setSize 500, 500
	renderer.setClearColor 0xffffff, 1
	controls = new THREE.OrbitControls camera, renderer.domElement
	controls.addEventListener 'change', ->
		renderer.render scene, camera
	$(".plot_3d_canvas").append renderer.domElement
	
	objects = []
	
	data = @data
	chartOptionsCompution = Deps.autorun ->
		#update the data reactivly, this is only needed in the drawDataOnChart-Function
		data.plot = Plots.findOne {_id:data.plot._id}

	engine = @data.engine
	experimentID = @data.experimentID
	
	chartDrawCompution = Deps.autorun ->
		if data?.plot?
			drawDataOnChart renderer, scene, camera, data.engine, data.plot, objects
	
	fixCanvasSize = _.debounce =>

		width = @$ ".plot_3d_canvas"
		.width()
		
		maxWidthHeight = $(window).height() - 120
		
		width = Math.min width, maxWidthHeight
		canvas = @$("canvas").get 0

		camera.aspect = 1
		camera.updateProjectionMatrix();
		canvas.width = width
		canvas.height = width
		renderer.setSize width, width
	
		
	,600
	$(window).on "resize", fixCanvasSize
	fixCanvasSize()

	Template.plot_x_t.destroyed = ->
		chartDrawCompution?.stop()
		chartOptionsCompution?.stop()
		$(window).off "resize", fixCanvasSize



Template.plot_3d_controls.events
	"keyup input": _.debounce (event, template) =>
		
		template.$("form").submit()
	,300


particleRender = (context) ->
	context.beginPath()
	context.arc( 0, 0, 1, 0,  Math.PI * 2, true )
	context.fill()


drawPixel = (scene, objects, index, position, color) ->
	unless objects[index]?
		material = new THREE.MeshLambertMaterial color: 0xff0000
		sphere = new THREE.Mesh( new THREE.SphereGeometry(5, 10, 10), material)
		sphere.overdraw = true;

		objects[index] = sphere
		scene.add sphere
	[objects[index].position.x, objects[index].position.y, objects[index].position.z] = position
	


drawDataOnChart = (renderer, scene, camera, engine, plot, objects)->
	
	

	# makes it reactive for plot changes

	plot = Plots.findOne plot._id
	plot.size = DEFAULT_PLOT_SIZE unless plot.size? and plot.size > 0
	
	
	currentScope = engine.getScope()

	

	if plot?.vectors?
		for object, objectIndex in engine.objects
			currentScope._i = objectIndex+1 # mathjs indices begin with 1
			position_anchor = [0,0,0]
			for vector_expression, plotIndex in plot.vectors
				vector_expression_compiled = engine.compileExpression "[#{vector_expression}]"
				
				try
					result = _.flatten vector_expression_compiled?.eval currentScope
					if _(result).size() > 3
						[position..., color] = result
					else
						position = result
						color = "black"
					
					
	
				catch e
					console.error e
					position = [0,0,0]
				
				if plotIndex == 0
					drawPixel scene, objects, objectIndex, position, color
					position_anchor = Tools.cloneObject position
				else
					drawVector config, context, position_anchor, position, color
				
			
		renderer.render( scene, camera );		
				
						
drawAxis = (scene) ->
	axisLength = 10000000
	#Shorten the vertex function
	v = (x, y, z) ->
		new THREE.Vertex(new THREE.Vector3(x, y, z)) 
	#Create axis (point1, point2, colour)
	createAxis = (p1, p2, color) ->
		line = undefined
		lineGeometry = new THREE.Geometry
		lineMat = new THREE.LineBasicMaterial
			color: color
			lineWidth: 1

		lineGeometry.vertices.push p1, p2
		line = new THREE.Line(lineGeometry, lineMat)
		scene.add line
	createAxis v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000
	createAxis v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00
	createAxis v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF
	

