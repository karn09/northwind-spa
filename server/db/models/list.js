//this doesn't sound like a good model name
//unless you are saving a collection of lists
//thing about naming more-- what's your entity
//item might work.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true, trim: true },
  priority: { type: Number, required: true }
});

module.exports = mongoose.model('List', schema);
