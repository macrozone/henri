
engine = null

Router.map ->
	@route 'experiment',
		path: "/experiment/:_id",
		waitOn: ->
			Meteor.subscribe 'experiments'
		data: ->
			if @ready()
				Session.set "experimentID", @params._id
				{
					experimentID: @params._id
					experiment: Experiments.findOne({_id: @params._id}), 
				}
		onData: ->
			engine = new Engine unless engine?
			engine.init @params._id 
		onBeforeAction: ->
			@render "loading"


Template.experimentName.events
	"click h2": (event, template) ->
		$(template.find("input")).show()
		$(template.find("h2")).hide()
	"blur input": (event, template) ->
		$(template.find("input")).hide()
		$(template.find("h2")).show()
	"change input": (event,template)->
		$(template.find("input")).hide()
		$(template.find("h2")).show()
		name = $(event.target).val()
		unless name? or name.length > 0
			name = "Sample Experiment (click to edit name)"
		Experiments.update {_id:template.data.experiment._id}, $set: name: name

Template.functions.variables = ->
	Experiments.findOne({_id: @experiment?._id})?.objectClass


prepareExprForPretty = (expr, objectClass) ->
	for variable in objectClass
		if variable.variable? and variable.variable.length > 0 and variable.type == "Vector"
			regex = new RegExp "\\b#{variable.variable}(_i)?\\b", "g"
			expr = expr.replace regex, "vec #{variable.variable}$1"
	return '`'+expr+'`'


onCommentChange = (event, template)->
	console.log @, template
	comment = $(event.target).val()
	query = {experimentID: Session.get("experimentID"), variable: @variable}
	functionID = Functions.findOne(query)?._id
	console.log query
	if functionID?
		Functions.update {_id:functionID}, $set: comment: comment
	else
		doc = query
		doc.comment = comment
		Functions.insert doc

onFunctionChange = (event, template)->

	functionExpr = $(event.target).val()
	query = {experimentID: Session.get("experimentID"), variable: @variable}
	functionID = Functions.findOne(query)?._id
	if functionID?
		Functions.update {_id:functionID}, $set: expression: functionExpr
	else
		doc = query
		doc.expression = functionExpr
		Functions.insert doc
	
onFunctionSortChange = (event, template)->

	execOrder = parseInt $(event.target).val(),10
	
	query = {experimentID: Session.get("experimentID"), variable: @variable}
	functionID = Functions.findOne(query)?._id

	if functionID?
		Functions.update {_id:functionID}, $set: execOrder: execOrder
	else
		doc = query
		doc.execOrder = functionExpr
		Functions.insert doc
	

		
Template.functions.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])

Template.oneFunction.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])

Template.oneFunction.variable = ->
	experiment = Experiments.findOne {_id: Session.get("experimentID")}
	objectClass = experiment.objectClass

	prepareExprForPretty @variable, objectClass

Template.oneFunction.function = ->

	Functions.findOne({experimentID: Session.get("experimentID"), variable: @variable})

Template.oneFunction.expressionForPretty = ->
	Meteor.defer ->
		MathJax.Hub.Queue(["Typeset",MathJax.Hub])
	expression = Functions.findOne({experimentID: Session.get("experimentID"), variable: @variable})?.expression
	if expression?
		experiment = Experiments.findOne {_id: Session.get("experimentID")}
		objectClass = experiment.objectClass
		variableExpr = prepareExprForPretty "#{@variable} = ", objectClass
		exprForPretty = prepareExprForPretty expression, objectClass

	
Template.oneFunction.events
	"keyup input.sort": onFunctionSortChange
	"change input.sort": onFunctionSortChange
	"change input.function": onFunctionChange
	"keyup input.function" : onFunctionChange
	"change input.comment": onCommentChange
	"keyup input.comment" : onCommentChange

Template.controls.events
	"click .btn-step": (event, template) ->
		engine.step()
	"click .btn-play": (event, template) ->
		engine.play()
		
