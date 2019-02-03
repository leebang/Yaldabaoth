const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    url: { type: String },
    gameName: { type: String , unique: true},
    playTime: { type: String },
    imgIconUrl: { type: String },
    imgLogiUrl: { type: String },
    userList: { type: [String] },
},{ sparse: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('games', schema);