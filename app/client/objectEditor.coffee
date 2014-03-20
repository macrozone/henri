
DIMENSION = 3
vectorValidator = (value, callback) ->
	parts = value.split ","
	parts = _.map parts, parseFloat

	callback false unless parts.length == DIMENSION
	callback _.every parts, _.isNumber
Template.objectEditor.rendered = ->
	data = Session.get "objects"
	data = [] unless data? 

	$handsontable = $(@find ".table").handsontable
		data: data
		startRows: 4
		startCols: 2
		minSpareRows: 1
		colHeaders: ["Variable", "Typ"]
		
		columns: [
			
		]
		afterChange: () ->
			Session.set "objects", data

	Deps.autorun ->
		
		objectClass = Session.get "objectClass"
		handsontable = $handsontable.handsontable "getInstance"
		settings = 
			columns:[]
			colHeaders:[]
		for obj in objectClass
			if obj.variable? and obj.type

				settings.colHeaders.push obj.variable
				switch obj.type
					when 'Skalar' 
						columnOption = 
							data: obj.variable
							type: "numeric"
					when 'Vektor'
						columnOption = 
							data: obj.variable
							validator: vectorValidator
						
				settings.columns.push columnOption
		console.log settings
		handsontable.updateSettings settings


Template.test.test = ->
	JSON.stringify Session.get "objects"