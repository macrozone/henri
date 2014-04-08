

Template.constantsEditor.rendered = ->
	$table = $(@find ".table")

	Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
		
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.constants
			data = {} unless data? 
			handsontable = $table.handsontable "getInstance"
			if handsontable?
				handsontable.loadData data
			else
				$table.handsontable
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
						if Session.get("experimentID") == experimentID
							Experiments.update {_id: experimentID}, {$set: "constants": @getData()}

					

