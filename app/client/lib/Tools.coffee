

escapeSum = (s) ->
	needle = 'sum('
	start = s.indexOf needle
	nBrackets = 1
	i = start

	while nBrackets > 0 and i < s.length
	
		nBrackets-- if char = ")"
		nBrackets++ if char = "("
		i++
	s = insertStringAtPosition s, '"', start+needle.length

	s = insertStringAtPosition s, '"', i
	console.log s

@Tools = 
	cloneObject: (scope) -> JSON.parse(JSON.stringify(scope))

	getDiffVariableName: (variable) ->
		"_d_#{variable}"
	insertStringAtPosition: (s, insertString, position) ->
		[s.slice(0, position), insertString, s.slice(position)].join('')

	sanitizeExperiment: (experiment) ->
		if experiment?
			hasDt = false;
			hasPt = false;
			hasDelay = false;

			if experiment?.configurations?
				for field in experiment.configurations
					if field.variable == 'dt'
						hasDt = true;
					if field.variable == 'pt'
						hasPt = true;
					if field.variable == 'delay'
						hasDelay = true;

			data = experiment?.configurations
			data = [] if !data?

			if (!hasDt || !hasPt || !hasDelay)
				if (!hasDt)
					data.push {
						description: 'Timestep for Calculation'
						value: '0.01'
						variable: 'dt'
					}
				if (!hasPt)
					data.push {
						description: 'Timestep for Redraw'
						value: '0.1'
						variable: 'pt'
					}
				if (!hasDelay)
					data.push {
						description: 'Delay after Redraw'
						value: '0'
						variable: 'delay'
					}
				Experiments.update {_id: experiment._id}, {$set: "configurations": data}
				experiment.configurations = data;

			experiment

