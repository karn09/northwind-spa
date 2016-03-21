var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: { type: String, required: true, trim: true },
  priority: { type: Number, required: true }
});

module.exports = mongoose.model('List', schema);
