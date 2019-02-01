const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nickName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    steamAccount: { type: String, required: true },
    gamesList: { type: [String] },
    friendsList: { type: [String] },
    description: { type: [String] },
    contactInfo: { type: [String] },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);