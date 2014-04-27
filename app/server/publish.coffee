

Meteor.publish "experiments", ->
	Experiments.find {}

duplicateDocumentByID = (collection, _id, overwriteValues = {}) ->
	doc = collection.findOne _id:_id
	duplicateDocument collection, doc, overwriteValues

duplicateDocument = (collection, doc, overwriteValues = {}) ->
	delete doc._id
	_.extend doc, overwriteValues
	collection.insert doc

duplicateMultipleDocuments = (collection, query, overwriteValues = {}) ->
	collection.find(query).forEach (doc) ->

		duplicateDocument collection, doc, overwriteValues

Meteor.methods 
	"deleteExperiment": (experimentID) ->
		Experiments.remove _id: experimentID
		Functions.remove experimentID: experimentID
		Plots.remove experimentID: experimentID
	"duplicateExperiment": (experimentID) ->
		experiment = Experiments.findOne _id: experimentID
		experiment.name += " (copy)"
		newID = duplicateDocument Experiments, experiment
		duplicateMultipleDocuments Functions, {experimentID: experimentID}, {experimentID: newID}
		duplicateMultipleDocuments Plots, {experimentID: experimentID}, {experimentID: newID}
		return newID