

Template.configurationsEditor.rendered = ->
	$table = $(@find ".table")

	calculation = Deps.autorun =>

		experiment = Experiments.findOne _id: Session.get("experimentID")
		experiment = Tools.sanitizeExperiment experiment
		isOwner = Meteor.userId()? and experiment?.user_id == Meteor.userId()
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.configurations
			data = {} unless data? 
			handsontable = $table.handsontable "getInstance"
			columns = [
						{
							data: "variable"
						},
						{
							data: "description"
						},
						{
							data: "value"
							readOnly: if isOwner then false else true
						}

					]
			if handsontable?
				handsontable.updateSettings 
					readOnly: not isOwner
					columns: columns
				handsontable.loadData data
			else
				$table.handsontable
					data: data
					minSpareRows: 0

					colHeaders: ["Constant", "Description", "Value"],
					readOnly: true
					columns: columns
					afterChange: (change, source) ->
						unless source == "loadData" or not isOwner
							Experiments.update {_id: Session.get("experimentID")}, {$set: "configurations": @getData()}

					

	Template.configurationsEditor.destroyed = ->
		calculation?.stop()			