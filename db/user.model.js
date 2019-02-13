const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nickName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    gender: { type: String, required: true },
    description: { type: String, default: '' },
    contactInfo: { type: String, default: '' },
    userImage: { type: Buffer, default: '' },
    hash: { type: String, required: true },
    steamAccount: { type: String, required: true },
    gamesList: { type: [String] },
    friendsList: { type: [String] },
    invitationsList: { type: [String] },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);