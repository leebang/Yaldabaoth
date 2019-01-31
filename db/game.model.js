const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    url: { type: String },
    gameName: { type: String },
    playTime: { type: String },
    imgIconUrl: { type: String },
    imgLogiUrl: { type: String },
    userList: { type: [String] },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('games', schema);