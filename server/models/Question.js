var ChoiceSchema = require('./Choice').Schema,
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    category: String,
    choices: [ChoiceSchema],
    description: String
});

module.exports = mongoose.model('Question', QuestionSchema);
