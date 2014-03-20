math = {}
Router.map ->
  @route 'home',
    path: "/"
    before: ->
    	math = mathjs()


Template.mathCompile.events
	"change textarea": ->
		expr = $(event.target).val()
		lines = expr.split "\n"

		elem = MathJax.Hub.getAllJax('pretty')[0];
		MathJax.Hub.Queue(['Text', elem, expr]);
		
		
		#result = math.eval expr
		
		#Session.set "latestResult", result

Template.mathCompile.expression = ->
	"vec F_1 = G * m_1 * m_2 * (vec r_2 - vec r_1)/ |vec r_2 - vec r_1|^3"
Template.mathCompile.result = ->
	Session.get "latestResult"

Template.functions.variables = ->
	Session.get "objectClass"

Template.oneFunction.events
	"change input": (event, template)->
		expr = $(event.target).val()
		domEl = template.find(".pretty")
		elem = MathJax.Hub.getAllJax(domEl)[0]
		console.log elem
		MathJax.Hub.Queue(['Text', elem, expr]);
