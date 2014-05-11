# Engine

The engine is the hearth of Henri, it uses [mathjs](mathjs.org) _ally.
The current data of the calculation can be accessed with engine.getScope() (scope is a terminus from mathjs)
The engine is a [reactive Meteor-Datasource](http://docs.meteor.com/#reactivity),
so if you access getScope in a reactive context, it will be re-run, if the data changes here

	@Engine = class
		
		constructor: () ->
			@drawInterval = 0.1

			@calcMode = "rungekutta"
			@mathjs = mathjs()
			@mathjs.config matrix: 'array'
			@math = @mathjs.parser()
			# we use this dep to inform observers on changes
			if Deps?.Dependency?
				@dataDep = new Deps.Dependency
				@stateDep = new Deps.Dependency

		init: (@experimentID)->
			@reset()	
			
		
## [reactive](http://docs.meteor.com/#reactivity)-getters

		getScope: ->
			@dataDep?.depend()
			@math.scope
	
		isRunning: ->
			@stateDep?.depend()
			@running

## controls

		play: ->
			@running = !@running
			@stateDep.changed()
			turn = =>
				if @running
					@step() 
					Meteor.defer turn
			turn()

		stop: ->
			@running = false
			@stateDep.changed()

		reset: ->
			@initExperiment()
			@initScope()
			@initFunctions()
			#propagate initial scope
			@dataDep?.changed()


		step: ->
			stepCounterBefore = Math.floor @math.scope.t / @drawInterval
			while true

				results = @calcAbsoluteFunctions @math.scope
				@addResultsToScope results
		
				results = @calcDiffFunctions @math.scope
				@addResultsToScope results
				
				@math.scope.t += @math.scope.dt
				console.log(@math.scope.dt)
				# break if enough steps are made
				stepCounterAfter = Math.floor @math.scope.t / @drawInterval
			
				break if stepCounterAfter > stepCounterBefore
					
			# propagate change, this will redraw all plots
			

			@dataDep?.changed()

		addResultsToScope: (results) ->
			for variable, result of results
				@math.scope[variable] = result

		calcAbsoluteFunctions: (scope)->
			@calcObjectFunctions 'absolute', scope

		calcDiffFunctions: (scope)->

			switch @calcMode
				when "rungekutta" then changes = @calcRungeKuttaChanges scope
				else changes = @calcEulerChanges @math.scope
			
			results = @eulerStep scope, changes
			
			# we will also add the changes to the scope, so we can plot them
			@addChangeVectorToScope changes
			return results

## Euler

		calcEulerChanges: (scope)->
			@calcObjectFunctions "diff", scope
		calcObjectFunctions: (type, scope) ->
			results = {}
			expressions = @_compiledExpression[type]
			for object, _i in @objects
				scope._i = _i+1 # mathjs indices begin with 1
				for variable, expression of expressions
					result = expression.eval scope
					results[variable] = [] unless results[variable]?
					results[variable][_i] = result
			results
		eulerStep: (scope, changes) ->
			results = {}
			for variable, value of changes
				results[variable] = @mathjs.add(scope[variable], @mathjs.multiply(value, scope.dt))
			results

		addChangeVectorToScope: (changes) ->
			for variable, value of changes
				@math.scope[Tools.getDiffVariableName variable] = value

## [Runge-Kutta](http://de.wikipedia.org/wiki/Runge-Kutta-Verfahren)

		calcRungeKuttaChanges: (scope) ->
			# we need a copy here
			currentScope = Tools.cloneObject scope
			@assignCustomFunctionsToScope currentScope

this is the change-vector for all objects at time t

			changes_a = @calcEulerChanges currentScope
			
now we do an euler step a

			results_a = @eulerStep currentScope, changes_a

for [runge kutta](http://de.wikipedia.org/wiki/Runge-Kutta-Verfahren), we calculate a second change-vector, 
this time after one step dt
write first results_a to currentScope, so currentScope is now the state after changes_a
then, calculate a new change-vector changes_b from this point 
			
			currentScope.t += currentScope.dt
			for variable, result of results_a
				currentScope[variable] = result
			changes_b = @calcEulerChanges currentScope
			
now we calculate (changes_a + changes_b) / 2, we will perform an euler step (x = x + changes * dt) later

			changes = {}
			for variable, change of changes_a
				changes[variable] = @mathjs.divide(@mathjs.add(changes_a[variable], changes_b[variable]),2)
			return changes


## initialisation

		initExperiment: ->
			experiment = Experiments.findOne _id: @experimentID
			experiment = Tools.sanitizeExperiment experiment
			if experiment? and experiment.objectClass?
				@fixedFields = experiment.fixedFields;
				@constants = experiment.constants
				@objects = _.filter experiment.objects, _isValidObject
				@types = {}
				for oneVar in experiment.objectClass
					{type:type, variable: variable} = oneVar
					if type? and variable? and type.length > 0 and variable.length > 0
						@types[variable] = type
		initScope: ->
			@math.scope = {
				t: 0,
				dt: 0.1
				n: @objects?.length
			}
			if @fixedFields?
				for item in @fixedFields
					{variable:variable,value:value} = item
					if variable? and value?
						@math.scope[variable] = _parseValue value, 'Scalar'
			if @constants?
				for constant in @constants
					{type:type, variable: variable, value:valueString} = constant
					if type? and valueString? and variable?
						value = _parseValue valueString, type
						@math.scope[variable] = value
			if @objects?
				for anObject in @objects

					for variable, valueString of anObject
						type = @types[variable]
						if variable? and variable.length > 0 and valueString? and type?
							@math.scope[variable] = [] unless @math.scope[variable]?
							@math.scope[variable].push _parseValue valueString, type
						
		
			

		initFunctions: ->
			cursor = Functions.find {experimentID: @experimentID}
			@_compiledExpression = "diff": {}, "absolute": {}
			@assignCustomFunctionsToScope @math.scope
			cursor.forEach (aFunction) => 
				type = @types[aFunction.variable]
				expr = aFunction?.expression

				if aFunction.calcDiff?
					functionType = if aFunction.calcDiff then "diff" else "absolute"
				else
					functionType = "diff"
				
				if type? and expr? and expr.length > 0
					
					regex = new RegExp "\\|([^\\|]+)\\|", "g"
					expr = expr.replace regex, "norm($1)"
					
					expr = CustomFunctions.escapeSum expr

we have every object in an array. The current object is always index i. 
We therefore change the expressions slightly and add an index [i] to them
So if an object is a vector, we have a 2-dimensional matrix, the syntax is then with [i,:]

					
					for variable, objectType of @types
						regex = new RegExp "\\b#{variable}\\b", "g"
						switch objectType
							when "Scalar" then expr = expr.replace regex, "#{variable}[_i]"
							when "Vector" then expr = expr.replace regex, "#{variable}[_i,:]"
						regex = new RegExp "\\b#{variable}_k\\b", "g"

						switch objectType
							when "Scalar" then expr = expr.replace regex, "#{variable}[_k]"
							when "Vector" then expr = expr.replace regex, "#{variable}[_k,:]"
					try
						console.log "compile: #{expr}"

						@_compiledExpression[functionType][aFunction.variable] = @math.compile expr
					catch error
						console.error error

		assignCustomFunctionsToScope: (scope) ->
			scope["sum"] = _.bind CustomFunctions.sum, {engine:@, scope:scope}

## Static helpers, may be removed

	_parseValue = (value, type) ->
		switch type
			when 'Scalar' then parseFloat value
			when 'Vector' then _(value?.split? ",").map parseFloat
			else parseFloat value

	_isValidObject = (object) ->
		return false if _(object).isEmpty()
		for variable, value of object
			return false unless value?
		return true
