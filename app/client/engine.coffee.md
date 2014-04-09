

	@Engine = class
		
		constructor: () ->
			@math = mathjs().parser()

			
				
		
		init: (@experimentID)->
		
			@initExperiment()
			@initScope()
			@initFunctions()

propagate initial scope

			Session.set "currentScope", @math.scope
			
			
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
			@math.scope = {}
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
			@_compiledExpression = []
			cursor.forEach (aFunction) => 
				type = @types[aFunction.variable]
				
				
				if type?
					expr = aFunction.expression

we have every object in an array. The current object is always index i. 
We therefore change the expressions slightly and add an index [i] to them
So if an object is a vector, we have a 2-dimensional matrix, the syntax is then with [i,:]
			

first we change the expressions (right of = )

					for variable, objectType of @types
						regex = new RegExp "\\b#{variable}\\b", "g"
						switch objectType
							when "Scalar" then expr = expr.replace regex, "#{variable}[i]"
							when "Vector" then expr = expr.replace regex, "#{variable}[i,:]"

now we change the assign var (left of = )						

					switch type
						when "Scalar" then variableForAssign = "#{aFunction.variable}[i]"
						when "Vector" then variableForAssign = "#{aFunction.variable}[i,:]"
					fullExpression = "#{variableForAssign} = #{expr}"
					
					console.log fullExpression

					try
						@_compiledExpression.push @math.compile fullExpression
					catch error
						console.error error
				


		step: ->
			for j in [1..4]
				for object, i in @objects
					
					@math.scope.i = i+1
					
					for expression in @_compiledExpression
						expression.eval @math.scope
			
			Session.set "currentScope", @math.scope
			
				
		play: ->
			@running = !@running
			
			turn = =>
				if @running
					@step() 
					_.defer turn
			turn()

		stop: ->
			@running = false
		

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
