

Template.constantsEditor.rendered = ->
	Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
		
		
		if experiment?
			experimentID = experiment._id
			data = experiment.constants
			data = {} unless data? 
			
			handsontable = $(@find ".table").handsontable
				data: data
				minSpareRows: 1
				colHeaders: ["Constant", "Type", "Value"]
				columns: [
					{
						data: "variable"
					},
					{
						data: "type"
						type: 'dropdown'
						source: ["Vector", "Scalar"]
					},
					{
						data: "value"
					}

				]
				afterChange: () ->
					Experiments.update {_id: experimentID}, {$set: "constants": @getData()}

					

