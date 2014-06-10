Template.header.events
	"click .btn-nightmode": ->
		$("html").toggleClass "nightMode"
Template.header.rendered = ->
	@$("[data-toggle='tooltip']").tooltip()