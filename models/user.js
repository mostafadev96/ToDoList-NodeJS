const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    tasks:
        [
            { type: Schema.Types.ObjectId, ref: 'Task' }
        ],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

