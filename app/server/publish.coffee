

Meteor.publish "experiments", ->
	Experiments.find {}


Meteor.methods 
	"deleteExperiment": (experimentID) ->
		Experiments.remove _id: experimentID
		Functions.remove experimentID: experimentID