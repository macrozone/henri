

	

compileCache = {}

getCompiledExpression = (mathjs, expr) ->
	unless compileCache[expr]?
		compileCache[expr] = mathjs.compile expr
	compileCache[expr]

@CustomFunctions = 
	sum: (expr) ->
		
	
		result = 0
		

		c_expression = getCompiledExpression @engine.mathjs, expr
	
		for _k in [1...@scope.n+1]
			
			if _k != @scope._i
				@scope._k = _k

				result = @engine.mathjs.add(result, c_expression.eval @scope)
				
		
		result
	escapeSum: (expr) ->

		needle = 'sum('
		start = expr.indexOf needle
		
		if start >= 0
			nBrackets = 1
			i = start+needle.length

			while nBrackets > 0 and i <= expr.length
				char = expr[i]
				
				nBrackets-- if char == ")"
				nBrackets++ if char == "("
			
				i++
			
			expr = Tools.insertStringAtPosition expr, '"', start+needle.length

			expr = Tools.insertStringAtPosition expr, '"', i
			
		expr






