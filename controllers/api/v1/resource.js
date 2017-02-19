exports.index = function(req, res){
  res.send('dummy index')
}

exports.new = function(req, res){
  res.send('new dummy')
}

exports.create = function(req, res){
  res.send('create dummy')
}

exports.show = function(req, res){
  res.send('show dummy ' + req.params.dummy)
}

exports.edit = function(req, res){
  res.send('edit dummy ' + req.params.dummy)
}

exports.update = function(req, res){
  res.send('update dummy ' + req.params.dummy)
}

exports.destroy = function(req, res){
  res.send('destroy dummy ' + req.params.dummy)
}
