Router.map ->
	@route 'home',
		path: "/"
		data: ->
			experiments: Experiments.find()

createExperiment = ->
	experimentID = Experiments.insert {}
	Router.go "experiment", _id: experimentID

Template.home.events
	"click .btn-create-experiment": createExperiment