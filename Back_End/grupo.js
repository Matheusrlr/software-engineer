var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CadastroSchema = new Schema({
 id: String,
 professores: String,
 nome: String,
 projetos : String

});

module.exports = mongoose.model('Grupo', CadastroSchema);