Template.plots.plots = ->
	Plots.find {experimentID: @experimentID}

Template.plots.isOwner = ->
	Meteor.userId()? and @experiment.user_id == Meteor.userId()

Template.addPlots.rendered = ->
	@$("[data-toggle='tooltip']").tooltip()
Template.addPlots.events
	"click .btn-add-x_t": (event, template)->
		addNewPlot_x_t template.data.experimentID
	"click .btn-add-2d": (event, template)->
		addNewPlot_2d template.data.experimentID
	"click .btn-add-3d": (event, template)->
		addNewPlot_3d template.data.experimentID