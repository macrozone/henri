
DIMENSION = 3
vectorValidator = (value, callback) ->
	parts = value.split ","
	parts = _.map parts, parseFloat

	callback false unless parts.length == DIMENSION
	callback _.every parts, _.isNumber

sanitize = (data) ->
	_.filter data, (anObject) ->
		for key, value of anObject
			return false unless value?
			return false if _.isString(value) and value.length == 0
		return true
Template.objectEditor.rendered = ->

	$table = $(@find ".table")
	calculation = Deps.autorun =>
		experiment = Experiments.findOne _id: Session.get("experimentID")
	
		if experiment? and $table.length > 0
			experimentID = experiment._id
			data = experiment.objects
			objectClass = experiment.objectClass
			data = [] unless data? 
			
			columns = []
			colHeaders = []
			if objectClass?
				for obj in objectClass
					if obj.variable? and obj.type? and obj.variable.length > 0
						colHeaders.push obj.variable
						switch obj.type
							when 'Scalar' 
								columnOption = 
									data: obj.variable
									type: "numeric"
							when 'Vector'
								columnOption = 
									data: obj.variable
									validator: vectorValidator
						columns.push columnOption

			

			handsontable = $table.handsontable "getInstance"
			if handsontable?
				console.log "handsontabel update"
				handsontable.updateSettings 
					columns: columns
					colHeaders: colHeaders
				handsontable.loadData data
			else
				$table.handsontable 
					data: data
					minSpareRows: 1
					colHeaders: ["Variable", "Type"]
					minRows: data.length
					columns: columns
					colHeaders: colHeaders
					afterChange: (change, source) ->
						console.log change, source
						unless source == "loadData"
							data = sanitize @getData()
							Experiments.update {_id: Session.get("experimentID")}, {$set: objects: data}
							console.log Experiments.findOne _id: Session.get("experimentID")
	Template.objectEditor.destroyed = ->
		calculation?.stop()
