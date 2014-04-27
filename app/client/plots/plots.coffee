Template.plots.plots = ->
	Plots.find {experimentID: @experimentID}

Template.addPlots.events
	"click .btn-add-x_t": (event, template)->
		addNewPlot_x_t template.data.experimentID