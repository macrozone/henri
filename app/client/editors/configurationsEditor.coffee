

Template.configurationsEditor.rendered = ->
	$table = $(@find ".table")

	calculation = Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
		
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.configurations
			data = {} unless data? 
			handsontable = $table.handsontable "getInstance"
			if handsontable?
				handsontable.loadData data
			else
				$table.handsontable
					data: data
					minSpareRows: 1
					colHeaders: ["Constant", "Description", "Value"],
					readOnly: true
					columns: [
						{
							data: "variable"
						},
						{
							data: "description"
						},
						{
							data: "value"
							readOnly: false
						}

					]
					afterChange: (change, source) ->
						unless source == "loadData"
							Experiments.update {_id: Session.get("experimentID")}, {$set: "configurations": @getData()}

					

	Template.configurationsEditor.destroyed = ->
		calculation?.stop()			