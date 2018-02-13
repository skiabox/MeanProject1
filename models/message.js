const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./user');

const schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//action after remove method execution upon message
schema.post('remove', function(message) {
    User.findById(message.user, function(err, user) {
        user.messages.pull(message._id);
        user.save();
    });
});

module.exports = mongoose.model('Message', schema);