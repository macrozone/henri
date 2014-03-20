math = {}
Router.map ->
  @route 'experiment',
    path: "/experiment/:_id"
    data: ->
      experiment: Experiments.findOne {_id: @params._id}
    before: ->
    	math = mathjs()


Template.experimentName.events
	"change input": (event,template)->
		Experiments.update {_id:template.data.experiment._id}, $set: name: $(event.target).val()

Template.functions.variables = ->
	Experiments.findOne({_id: @experiment?._id})?.objectClass


prepareExprForPretty = (expr, objectClass) ->
	for variable in objectClass

		if variable.variable? and variable.type == "Vektor"
			regex = new RegExp "\\b#{variable.variable}(_i)?\\b", "g"
			expr = expr.replace regex, "vec #{variable.variable}$1"
	return expr

setPrettyInDom = (domEl, expr) ->
	domEl.innerHTML = "`"+expr+"`"
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

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
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
Template.oneFunction.rendered = ->
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);


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
		
