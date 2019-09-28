const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const TaskSchema = mongoose.Schema(
    {
        content: String,
        date: String,
        user:
            [
                { type: Schema.Types.ObjectId, ref: 'User' }
                ]
    }
);

module.exports = mongoose.model('Task', TaskSchema);

