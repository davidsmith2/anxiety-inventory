var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChoiceSchema = new Schema({
    score: Number,
    description: String
});

module.exports = mongoose.model('Choice', ChoiceSchema);
