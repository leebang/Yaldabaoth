const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    url: { type: String },
    platform: { type: [String] },
    gameName: { type: String , unique: true},
    playTime: { type: String },
    imgIconUrl: { type: String },
    imgLogoUrl: { type: String },
    usersList: { type: [String] },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('games', schema);