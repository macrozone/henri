Template.onePlot.chooseTemplate = (plotType) ->
	templateName = "plot_"+plotType
	template = Template[templateName]
	
	template

Template.onePlot.events
	"click .btn-delete": (event, template) ->
		shouldDelete = confirm("Delete this plot?")
		if shouldDelete
			Plots.remove _id: template.data.plot._id


Template.onePlot.isOwner = ->
	Meteor.userId()? and @experiment.user_id == Meteor.userId()