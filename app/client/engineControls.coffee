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
Template.engineControls.time = ->
	@engine?.getScope().t.toPrecision 5

Template.engineControls.rendered = ->
	@$("[data-toggle='tooltip']").tooltip()
Template.engineControls.events
	"click .btn-step": (event, template) ->
		template.data?.engine?.stop()
		template.data?.engine?.step()
	"click .btn-play": (event, template) ->
		template.data?.engine?.play()
	"click .btn-reset": (event, template) ->
		template.data?.engine?.reset()