

Template.objectClassEditor.rendered = ->
	$table = $(@find ".table")
	Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
		
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.objectClass
			data = {} unless data? 
			handsontable = $table.handsontable "getInstance"
			if handsontable?
				handsontable.loadData data
			else
				handsontable = $table.handsontable
					data: data
					minSpareRows: 1
					colHeaders: ["Variable", "Type"]
					columns: [
						{
							data: "variable"
						},
						{
							data: "type"
							type: 'dropdown'
							source: ["Vector", "Scalar"]
						}
					]
					afterChange: () ->
						if Session.get("experimentID") == experimentID
							Experiments.update {_id: experimentID}, {$set: "objectClass": @getData()}

					

