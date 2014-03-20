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