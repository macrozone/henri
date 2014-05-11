

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
		hasDt = false;
		for field in experiment.fixedFields
			if (field.variable == 'dtt')
				hasDt = true;

		console.log experiment
		data = experiment.fixedFields

		if (!hasDt)
			data.push {
				description: 'Berechnungszeitschritt'
				value: '0.01'
				variable: 'dt'
			}
			Experiments.update {_id: experiment._id}, {$set: "fixedFields": data}
			experiment.fixedFields = data;

		experiment

