
engine = null

Router.map ->
	@route 'experiment',
		path: "/experiment/:_id",
		yieldTemplates: 
			experimentHeaderNavigation: to: "headerNavigation"
			experimentHeaderNavigationRight: to: "headerNavigationRight"
		waitOn: ->
			Meteor.subscribe 'experiments'
		data: ->
			
			engine = new Engine unless engine?
			engine.init @params._id 
			Session.set "experimentID", @params._id
			{
				experimentID: @params._id
				experiment: Experiments.findOne({_id: @params._id})
				engine: engine
			}

		action: ->
			if @ready()
				@render()
			else
				@render "loading"

		onStop: ->
			engine?.stop()
			engine = null

Template.experimentName.rendered = ->
	@$("[data-toggle='tooltip']").tooltip()

Template.experimentName.events
	"click h2": (event, template) ->
		if Meteor.userId()? and template.data.experiment?.user_id == Meteor.userId()
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


Template.experimentEditor.isOwner = ->
	Meteor.userId()? and @experiment?.user_id == Meteor.userId()

Template.experimentControls.rendered = ->
	@$(".btn").tooltip()

Template.experimentControls.isOwner = ->
	Meteor.userId()? and @experiment?.user_id == Meteor.userId()

Template.experimentControls.events
	"click .btn-delete": (event, template)->
		shouldDelete = confirm("Delete Experiment?")
		if shouldDelete
			Meteor.call "deleteExperiment", template.data.experimentID
			Router.go "home"
		return false
	"click .btn-duplicate": (event, template) ->
		Meteor.call "duplicateExperiment", template.data.experimentID, (error, newID) ->
			if newID?
				Router.go "experiment", _id: newID
				window.scrollTo 0, 0
		return false
Template.functions.variables = ->
	Experiments.findOne({_id: @experiment?._id})?.objectClass


prepareExprForPretty = (expr, experiment) ->
	{objectClass, constants} = experiment

	prepareOneVar = (variable) ->
		if variable?.variable?.length > 0 and variable.type == "Vector"
			regex = new RegExp "\\b#{variable.variable}(_i)?\\b", "g"
			expr = expr.replace regex, "vec(#{variable.variable}$1)"

	if objectClass? then prepareOneVar variable for variable in objectClass
	if constants? then prepareOneVar variable for variable in constants
		
	return '`'+expr+'`'



onCommentChange = (event, template)->

	comment = $(event.target).val()
	query = {experimentID: Session.get("experimentID"), variable: @variable}
	functionID = Functions.findOne(query)?._id

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

	
onDdtCheckboxChange = (event, template) ->
	query = {experimentID: Session.get("experimentID"), variable: template.data.variable}
	aFunction = Functions.findOne query
	
	calcDiff = $(event.target).is ":checked"
	if aFunction?
		Functions.update {_id: aFunction._id}, $set: calcDiff: calcDiff
	else
		doc = query
		doc.calcDiff = calcDiff
		Functions.insert doc
		
Template.functions.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])


Template.oneFunction.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])
	@$("[data-toggle='tooltip']").tooltip()

shouldCalcDiff = (data)->
	experiment = Experiments.findOne {_id: Session.get("experimentID")}
	aFunction = Functions.findOne {experimentID: experiment._id, variable: data.variable}

	if aFunction?.calcDiff?
		aFunction.calcDiff
	else
		true

Template.oneFunction.calcDiff = ->
	shouldCalcDiff @

Template.oneFunction.variableWithDiff = ->
	experiment = Experiments.findOne {_id: Session.get("experimentID")}
	calcDiff = shouldCalcDiff @

	if calcDiff
		diffOperator = "d/dt "
	else
		diffOperator = ""

	prepareExprForPretty diffOperator+@variable, experiment


Template.oneFunction.function = ->

	Functions.findOne({experimentID: Session.get("experimentID"), variable: @variable})

Template.oneFunction.isNotOwner = ->
	experiment = Experiments.findOne {_id: Session.get("experimentID")}
	experiment?.user_id != Meteor.userId()

Template.oneFunction.expressionForPretty = ->
	Meteor.defer ->
		MathJax.Hub.Queue(["Typeset",MathJax.Hub])
	expression = Functions.findOne({experimentID: Session.get("experimentID"), variable: @variable})?.expression
	if expression?
		experiment = Experiments.findOne {_id: Session.get("experimentID")}
		

		variableExpr = prepareExprForPretty "#{@variable} = ", experiment
		exprForPretty = prepareExprForPretty expression, experiment

	
Template.oneFunction.events
	"change input.ddt": onDdtCheckboxChange
	"change input.function": onFunctionChange
	"keyup input.function" : onFunctionChange
	"change input.comment": onCommentChange
	"keyup input.comment" : onCommentChange



		
