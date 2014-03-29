
DIMENSION = 3
vectorValidator = (value, callback) ->
	parts = value.split ","
	parts = _.map parts, parseFloat

	callback false unless parts.length == DIMENSION
	callback _.every parts, _.isNumber
Template.objectEditor.rendered = ->
	experiment = @data.experiment
	if experiment?
		experimentID = experiment._id
		data = experiment.objects
		objectClass = experiment.objectClass
		data = [] unless data? 
		
		$handsontable = $(@find ".table").handsontable
			data: data
			minSpareRows: 1
			colHeaders: ["Variable", "Type"]
			minRows: data.length
			columns: [
				
			]
			afterChange: () ->
				Experiments.update {_id: experimentID}, {$set: objects: @getData()}

		Deps.autorun ->
			experiment = Experiments.findOne _id: experimentID
			objectClass = experiment?.objectClass
			handsontable = $handsontable.handsontable "getInstance"
			settings = 
				columns:[]
				colHeaders:[]
			if objectClass?
				for obj in objectClass
					if obj.variable? and obj.type?
						settings.colHeaders.push obj.variable
						switch obj.type
							when 'Scalar' 
								columnOption = 
									data: obj.variable
									type: "numeric"
							when 'Vector'
								columnOption = 
									data: obj.variable
									validator: vectorValidator
						settings.columns.push columnOption
			handsontable.updateSettings settings


