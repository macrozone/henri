Template.onePlot.chooseTemplate = (plotType) ->
	templateName = "plot_"+plotType
	template = Template[templateName]
	
	template

Template.onePlot.events
	"click .btn-delete": (event, template) ->
		shouldDelete = confirm("Delete this plot?")
		if shouldDelete
			Plots.remove _id: template.data.plot._id

Template.engineControls.playLabel = ->
	if @engine?.isRunning()
		"Pause"
	else
		"Play"
Template.engineControls.playIcon = ->
	if @engine?.isRunning()
		"glyphicon-pause"
	else
		"glyphicon-play"
Template.engineControls.events
	"click .btn-step": (event, template) ->
		template.data?.engine?.stop()
		template.data?.engine?.step()
	"click .btn-play": (event, template) ->
		template.data?.engine?.play()
	"click .btn-reset": (event, template) ->
		template.data?.engine?.reset()