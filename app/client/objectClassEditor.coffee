

Template.objectClassEditor.rendered = ->
		data = Session.get "objectClass"
		data = {} unless data? 

		handsontable = $(@find ".table").handsontable
			data: data
			startRows: 4
			startCols: 2
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
				Session.set "objectClass", @getData()
				

