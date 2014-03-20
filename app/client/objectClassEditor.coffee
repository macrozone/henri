

Template.objectClassEditor.rendered = ->
		experiment = @data.experiment
		if experiment?
			experimentID = experiment._id
			data = experiment.objectClass
			data = {} unless data? 
			
			handsontable = $(@find ".table").handsontable
				data: data
				minSpareRows: 1
				colHeaders: ["Variable", "Typ"]
				columns: [
					{
						data: "variable"
					},
					{
						data: "type"
						type: 'dropdown'
						source: ["Vektor", "Skalar"]
					}

				]
				afterChange: () ->
					Experiments.update {_id: experimentID}, {$set: "objectClass": @getData()}

				

