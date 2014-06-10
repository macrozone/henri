Router.map ->
	@route 'home',
		path: "/"
		data: ->
			userExperiments: Experiments.find {user_id: Meteor.userId()}, sort: name: 1
			allExperiments: Experiments.find {}, sort: name: 1

createExperiment = ->
	experimentID = Experiments.insert {name: "Sample Experiment (click to edit name)", user_id: Meteor.userId()}
	Router.go "experiment", _id: experimentID

Template.home.events
	"click .btn-create-experiment": createExperiment
	"click .toggleLogin": ->
		$("#login-dropdown-list .dropdown-toggle").dropdown("toggle")
		return false