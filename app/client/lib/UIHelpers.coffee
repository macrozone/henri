UI.registerHelper "setTitle", ->
  title = ""
  for i in [0..arguments.length-2]
    title += arguments[i]
  document.title = title
  undefined