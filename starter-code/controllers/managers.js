var db = require('../models');
var Manager = db.models.Manager;
var Artist = db.models.Artist;
var Ad = db.models.Ad;

function index(req, res) {
	Manager.findAll({include:[Ad]}).then(function(managers) {
		console.log(managers);
    res.json(managers);
	});
}

function show(req, res) {
  Manager.findById(req.params.id, {include:[Artist]})
  .then(function(manager){
    if(!manager) return error(res, "not found");
    res.json(manager);
  });	
}

function create(req, res) {
	Manager.create(req.body).then(function(manager){
    if(!manager) return error(res, "not saved");
    res.json(manager);
  });
}

function update(req, res) {
  Manager.findById(req.params.id)
  .then(function(manager){
    if(!manager) return error(res, "not found");
    return manager.updateAttributes(req.body);
  })
  .then(function(manager){
    res.json(manager);
  });
}

function destroy(req, res) {
  Manager.findById(req.params.id)
  .then(function(manager){
    if(!manager) return error(res, "not found");
    return manager.destroy();
  })
  .then(function(){
    res.redirect("/managers");
  });  
}

module.exports.index = index;
module.exports.show = show;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;