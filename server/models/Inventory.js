var mongoose = require('mongoose'),
    QuestionSchema = require('./Question').Schema,
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    date: {type: Date, default: Date.now},
    score: Number
});

module.exports = mongoose.model('Inventory', InventorySchema);
