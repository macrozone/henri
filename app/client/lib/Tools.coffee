@Tools = 
	cloneObject: (scope) -> JSON.parse(JSON.stringify(scope))

	getDiffVariableName: (variable) ->
		"_d_#{variable}"