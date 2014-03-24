Router.map ->
	@route 'functionRepo',
		path: "/functions"
		data: ->
			functions: Functions.find()

