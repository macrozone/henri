UI.registerHelper "eachWithParentExperimentID", (context, options) ->
  self = this
  contextWithParent = _.map context, (p) ->
    p.experimentID = self.experiment._id
    p
  console.log UI
  #UI._default_helpers.each contextWithParent, options
