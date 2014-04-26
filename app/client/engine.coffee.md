	
	@Engine = class
		
		constructor: () ->
			@mathjs = mathjs()
			@math = @mathjs.parser()
			# we use this dep to inform observers on changes
			if Deps?.Dependency?
				@dep = new Deps.Dependency

		init: (@experimentID)->
		
			@initExperiment()
			@initScope()
			@initFunctions()
			#propagate initial scope
			@dep?.changed()
		
		getScope: ->
			@dep?.depend()
			@math.scope
				

		step: ->
			for j in [1..1]

				# this is the change-vector for all objects
				changes = @calcChanges()
				# multiply the change vector with the time step and write back to the scope
				results = @eulerStep changes
				for variable, result of results
					@math.scope[variable] = result

				@math.scope.t += @math.scope.dt

					
			#propagate change
			@dep?.changed()
			
		calcChanges: ->
			results = {}
			for object, i in @objects
				
				@math.scope.i = i+1
				
				
				for variable, expression of @_compiledExpression
					result = expression.eval @math.scope
					results[variable] = [] unless results[variable]?
					results[variable][i] = result
			results
				
		eulerStep: (changes) ->
			results = {}
			for variable, result of changes
				results[variable] = @mathjs.add(@math.scope[variable], @mathjs.multiply(result, @math.scope.dt))
			results
		play: ->
			@running = !@running
			
			turn = =>
				if @running
					@step() 
					_.defer turn
			turn()

		stop: ->
			@running = false
			
		getClonedScope: ->
			JSON.parse(JSON.stringify(@math.scope))


		initExperiment: ->
			experiment = Experiments.findOne _id: @experimentID
			if experiment? and experiment.objectClass?
				@constants = experiment.constants
				@objects = _.filter experiment.objects, isValidObject
				@types = {}
				for oneVar in experiment.objectClass
					{type:type, variable: variable} = oneVar
					if type? and variable? and type.length > 0 and variable.length > 0
						@types[variable] = type
		initScope: ->
			@math.scope = {
				t: 0,
				dt: 0.1
			}
			if @constants?
				for constant in @constants
					{type:type, variable: variable, value:valueString} = constant
					if type? and valueString? and variable?
						value = parseValue valueString, type
						@math.scope[variable] = value
			if @objects?
				for anObject in @objects

					for variable, valueString of anObject
						type = @types[variable]
						if variable? and variable.length > 0 and valueString? and type?

							@math.scope[variable] = [] unless @math.scope[variable]?
							
							@math.scope[variable].push parseValue valueString, type
						
		
			

		initFunctions: ->
			cursor = Functions.find {experimentID: @experimentID}, sort: execOrder: 1
			@_compiledExpression = {}
			cursor.forEach (aFunction) => 
				type = @types[aFunction.variable]
				expr = aFunction?.expression
				
				if type? and expr? and expr.length > 0
					

we have every object in an array. The current object is always index i. 
We therefore change the expressions slightly and add an index [i] to them
So if an object is a vector, we have a 2-dimensional matrix, the syntax is then with [i,:]
			

first we change the expressions (right of = )
					
					for variable, objectType of @types
						regex = new RegExp "\\b#{variable}\\b", "g"
						switch objectType
							when "Scalar" then expr = expr.replace regex, "#{variable}[i]"
							when "Vector" then expr = expr.replace regex, "#{variable}[i,:]"
				

					
			

					try
						@_compiledExpression[aFunction.variable] = @math.compile expr
					catch error
						console.error error
				


		
		

	parseValue = (value, type) ->
		switch type
			when 'Scalar' then parseFloat value
			when 'Vector' then _(value.split ",").map parseFloat
			else parseFloat value

	isValidObject = (object) ->
		return false if _(object).isEmpty()
		for variable, value of object
			return false unless value?
		return true
