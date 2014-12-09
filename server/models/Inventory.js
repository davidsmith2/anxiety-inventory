var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
    date: Date,
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
    title: String
});

module.exports = mongoose.model('Inventory', InventorySchema);
