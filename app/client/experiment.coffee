math = {}
Router.map ->
  @route 'experiment',
    path: "/experiment/:_id"
    data: ->
      experiment: Experiments.findOne {_id: @params._id}
    before: ->
    	math = mathjs()


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
		unless name? or name.length == 0
			name = "Sample Experiment (click to edit name)"
		Experiments.update {_id:template.data.experiment._id}, $set: name: name

Template.functions.variables = ->
	Experiments.findOne({_id: @experiment?._id})?.objectClass


prepareExprForPretty = (expr, objectClass) ->
	for variable in objectClass
		if variable.variable? and variable.variable.length > 0 and variable.type == "Vector"
			regex = new RegExp "\\b#{variable.variable}(_i)?\\b", "g"
			expr = expr.replace regex, "vec #{variable.variable}$1"
	return expr



onFunctionChange = (event, template)->

	functionExpr = $(event.target).val()
	query = {experimentID: @experimentID, variable: @variable}
	functionID = Functions.findOne(query)?._id
	if functionID?
		Functions.update {_id:functionID}, $set: expression: functionExpr
	else
		doc = query
		doc.expression = functionExpr
		Functions.insert doc
	_.defer =>
		
Template.functions.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])

Template.oneFunction.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub])

Template.oneFunction.variable = ->
	experiment = Experiments.findOne {_id: @experimentID}
	objectClass = experiment.objectClass
	prepareExprForPretty @variable, objectClass
Template.oneFunction.expression = ->
	Functions.findOne({experimentID: @experimentID, variable: @variable})?.expression

Template.oneFunction.expressionForPretty = ->
	expression = Functions.findOne({experimentID: @experimentID, variable: @variable})?.expression
	if expression?
		experiment = Experiments.findOne {_id: @experimentID}
		objectClass = experiment.objectClass
		variableExpr = prepareExprForPretty "#{@variable} = ", objectClass
		exprForPretty = prepareExprForPretty expression, objectClass
	
Template.oneFunction.events
	"change input": onFunctionChange
	"keyup input" : onFunctionChange
		
