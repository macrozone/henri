

Template.objectClassEditor.rendered = ->
	$table = $(@find ".table")
	calculation = Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
		isOwner = Meteor.userId()? and experiment.user_id == Meteor.userId()
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.objectClass
			data = {} unless data? 
			handsontable = $table.handsontable "getInstance"
			if handsontable?
				handsontable.loadData data
			else
				handsontable = $table.handsontable
					readOnly: not isOwner
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
					afterChange: (change, source) ->
						unless source == "loadData" or not isOwner
							Experiments.update {_id: Session.get("experimentID")}, {$set: "objectClass": @getData()}

					

	Template.objectClassEditor.destroyed = ->
		calculation?.stop()	