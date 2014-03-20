Handlebars.registerHelper "eachWithParentExperimentID", (context, options) ->
  self = this
  contextWithParent = _.map context, (p) ->
    p.experimentID = self.experiment._id
    p

  Handlebars._default_helpers.each contextWithParent, options
