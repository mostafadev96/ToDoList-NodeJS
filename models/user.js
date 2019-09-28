const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    tasks: [{ body: String, date: Date }],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

