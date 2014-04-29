Router.map ->
	@route 'home',
		path: "/"
		data: ->
			experiments: Experiments.find {}, sort: name: 1

createExperiment = ->
	experimentID = Experiments.insert {name: "Sample Experiment (click to edit name)"}
	Router.go "experiment", _id: experimentID

Template.home.events
	"click .btn-create-experiment": createExperiment