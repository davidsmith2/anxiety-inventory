var mongoose = require('mongoose'),
    QuestionSchema = require('./Question').Schema,
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    date: Date,
    questions: [QuestionSchema],
    title: String
});

module.exports = mongoose.model('Inventory', InventorySchema);
