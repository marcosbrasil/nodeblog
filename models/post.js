var mongoose = require('mongoose');

var Post =  new mongoose.Schema({
  titulo: { type: String, index: true, unique: true},
  corpo: { type: String},
  dataCriacao: { type: Date, default: Date.now },
  dataAlteracao: { type: Date, default: Date.now }
});

mongoose.model('Post', Post);

exports.Post = function(db) {
  return db.model('Post');
};
