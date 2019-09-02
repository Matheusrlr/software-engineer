var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CadastroSchema = new Schema({
 projeto: String

});

module.exports = mongoose.model('Projeto', CadastroSchema);