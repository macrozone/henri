# Engine

The engine is the hearth of Henri, it uses [mathjs](mathjs.org) _ally.
The current data of the calculation can be accessed with engine.getScope() (scope is a terminus from mathjs)
The engine is a [reactive Meteor-Datasource](http://docs.meteor.com/#reactivity),
so if you access getScope in a reactive context, it will be re-run, if the data changes here

	@Engine = class
		
		constructor: () ->
			@drawInterval = 0.1

			@calcMode = "rungekutta-heun"
			@mathjs = mathjs()
			@mathjs.config matrix: 'array'
			
			# we use this dep to inform observers on changes
			if Deps?.Dependency?
				@dataDep = new Deps.Dependency
				@stateDep = new Deps.Dependency

		init: (@experimentID)->
			@reset()	
			
		
## [reactive](http://docs.meteor.com/#reactivity)-getters

		getScope: ->
			@dataDep?.depend()
			@scope
		

		isRunning: ->
			@stateDep?.depend()
			@running

		isResetted: ->
			@stateDep?.depend()
			@resetted

## controls

		play: ->
			@running = !@running
			
			@stateDep.changed()
			turn = =>
				if @running
					@step() 

					if @drawDelay? and @drawDelay > 0
						Meteor.setTimeout turn, @drawDelay
					else
						Meteor.defer turn
			Meteor.defer turn

		stop: ->
			@running = false
			@stateDep.changed()

		reset: ->

			@compileCache = {}
			@initExperiment()
			@initScope()
			@initFunctions()
			# calc the first changes, so that we can plot it
			@calcAbsolutFunctionsAndCurrentChanges()
		
			@resetted = true
			@stateDep.changed()
			#propagate initial scope
			@dataDep?.changed()


		step: ->
			
			if @resetted
				Meteor.defer =>
					@resetted = false
			stepCounterBefore = Math.floor @scope.t / @drawInterval
			while true

				@doOneCalcStep()
				
				# break if enough steps are made
				stepCounterAfter = Math.floor @scope.t / @drawInterval
			
				break if stepCounterAfter > stepCounterBefore
					
			# propagate change, this will redraw all plots
			

			@dataDep?.changed()

		doOneCalcStep: ->

			results = @eulerStep @scope, @currentChanges, @scope.dt
			@addResultsToScope results
			@scope.t += @scope.dt

we calculate the changes AFTER the step
this is because we want to have a prediction about the next step
so that we can plot that prediction, if we want.

we have to make sure, that @calcAbsolutFunctionsAndCurrentChanges() has been called once after initialisation

			@calcAbsolutFunctionsAndCurrentChanges()

		calcAbsolutFunctionsAndCurrentChanges: ->
			results = @calcAbsoluteFunctions @scope
			@addResultsToScope results
			@currentChanges = @calcDiffChanges @scope
			# we will also add the currentChanges to the scope, so we can plot them
			@addChangeVectorToScope @currentChanges

		addResultsToScope: (results) ->
			for variable, result of results
				@scope[variable] = result

		calcAbsoluteFunctions: (scope)->
			@calcObjectFunctions 'absolute', scope

		calcDiffChanges: (scope)->
			switch @calcMode
				when "rungekutta-heun" then @calcRungeKuttaHeunChanges scope
				else @calcObjectDiffs @scope
			
			

		

## Euler

		calcObjectDiffs: (scope)->
			@calcObjectFunctions "diff", scope

		calcObjectFunctions: (type, scope) ->
			results = {}
			expressions = @_compiledExpression[type]
			if @objects?
				for object, _i in @objects
					scope._i = _i+1 # mathjs indices begin with 1
					for variable, expression of expressions
						result = expression.eval scope
						results[variable] = [] unless results[variable]?
						results[variable][_i] = result
			results
		eulerStep: (scope, changes, dt) ->
			results = {}
			for variable, value of changes
				results[variable] = @mathjs.add(scope[variable], @mathjs.multiply(value, dt))
			results

		addChangeVectorToScope: (changes) ->
			for variable, value of changes
				@scope[Tools.getDiffVariableName variable] = value

## [Runge-Kutta](http://de.wikipedia.org/wiki/Runge-Kutta-Verfahren)

We use a 2-stage Runge-Kutta-Variant, the [Heun-Method(http://de.wikipedia.org/wiki/Heun-Verfahren)

		calcRungeKuttaHeunChanges: (scope) ->
			# we need a copy here
			currentScope = Tools.cloneObject scope
			@assignCustomFunctionsToScope currentScope

this is the change-vector for all objects at time t

			changes_a = @calcObjectDiffs currentScope
			
now we do an euler step a

			results_a = @eulerStep currentScope, changes_a, currentScope.dt

for [runge kutta](http://de.wikipedia.org/wiki/Runge-Kutta-Verfahren), we calculate a second change-vector, 
this time after one step dt
write first results_a to currentScope, so currentScope is now the state after changes_a
then, calculate a new change-vector changes_b from this point 
			
			currentScope.t += currentScope.dt
			for variable, result of results_a
				currentScope[variable] = result
			changes_b = @calcObjectDiffs currentScope
			
now we calculate (changes_a + changes_b) / 2, we will perform an euler step (x = x + changes * dt) later

			changes = {}
			for variable, change of changes_a
				changes[variable] = @mathjs.divide(@mathjs.add(changes_a[variable], changes_b[variable]),2)
			return changes


## initialisation

		initExperiment: ->
			experiment = Experiments.findOne _id: @experimentID
			if experiment? and experiment.objectClass?
				experiment = Tools.sanitizeExperiment experiment
				
				@configurations = experiment.configurations
				@drawInterval = @_getDrawInterval()
				@drawDelay = @_getDrawDelay()
				@constants = experiment.constants
				@objects = _.filter experiment.objects, _isValidObject
				@types = {}
				for oneVar in experiment.objectClass
					{type:type, variable: variable} = oneVar
					if type? and variable? and type.length > 0 and variable.length > 0
						@types[variable] = type

		_getDrawInterval: ->
			for field in @configurations
				if field.variable == 'pt'
					return field.value
		_getDrawDelay: ->
			for field in @configurations
				if field.variable == 'delay'
					return field.value

		initScope: ->
			@scope = {
				t: 0,
				dt: 0.1
				n: @objects?.length
			}
			if @configurations?
				for item in @configurations
					{variable:variable,value:value} = item
					if variable? and value?
						@scope[variable] = _parseValue value, 'Scalar'
			if @constants?
				for constant in @constants
					{type:type, variable: variable, value:valueString} = constant
					if type? and valueString? and variable?
						value = _parseValue valueString, type
						@scope[variable] = value
			if @objects?
				for anObject in @objects

					for variable, valueString of anObject
						type = @types[variable]
						if variable? and variable.length > 0 and valueString? and type?
							@scope[variable] = [] unless @scope[variable]? and _.isArray @scope[variable]
							
							@scope[variable].push _parseValue valueString, type
							# also add change-vectors (otherwise it will throw false alarms on some plots)
							@scope["_d_#{variable}"] = [] unless @scope["_d_#{variable}"]?

							@scope["_d_#{variable}"].push [0,0,0]
		
			

		initFunctions: ->
			cursor = Functions.find {experimentID: @experimentID}
			@_compiledExpression = "diff": {}, "absolute": {}
			@assignCustomFunctionsToScope @scope
			cursor.forEach (aFunction) => 
				type = @types[aFunction.variable]
				expr = aFunction?.expression

				if aFunction.calcDiff?
					functionType = if aFunction.calcDiff then "diff" else "absolute"
				else
					functionType = "diff"
				
				if type? and expr? and expr.length > 0
					try
						@_compiledExpression[functionType][aFunction.variable] = @compileExpression expr
					catch error
						console.error error
					

		compileExpression: (exprRaw) ->
			return unless exprRaw?
			unless @compileCache[exprRaw]?

				# prepare norm |..|
				regex = new RegExp "\\|([^\\|]+)\\|", "g"
				expr = exprRaw.replace regex, "norm($1)"
				
				expr = CustomFunctions.escapeSum expr

we have every object in an array. The current object is always index i. 
We therefore change the expressions slightly and add an index [i] to them
So if an object is a vector, we have a 2-dimensional matrix, the syntax is then with [i,:]

_d_ is a special placeholder indicating a diff-vector of this variable. This is seldom used, 
however, it can be used to plot diff vectors

				for variable, objectType of @types
					regex = new RegExp "\\b(_d_)?#{variable}\\b", "g"
					switch objectType
						when "Scalar" then expr = expr.replace regex, "$1#{variable}[_i]"
						when "Vector" then expr = expr.replace regex, "$1#{variable}[_i,:]"
					regex = new RegExp "\\b(_d_)?#{variable}_k\\b", "g"

					switch objectType
						when "Scalar" then expr = expr.replace regex, "$1#{variable}[_k]"
						when "Vector" then expr = expr.replace regex, "$1#{variable}[_k,:]"
						
special case: explicit index, remove '_' after known variables
this enables you to "escape" variables, then you can write:
x_[j,:] to access another object with index j
the colon is currently needed here

					regex = new RegExp "\\b(_d_)?#{variable}_\\b", "g"
					expr = expr.replace regex, "$1#{variable}"
				console.log "compile: #{expr}"
				@compileCache[exprRaw] = @mathjs.compile expr

			return @compileCache[exprRaw]

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
