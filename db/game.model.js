const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    gamename: { type: String, unique: true },
    playtime: { type: String },
    img_icon_url: { type: String },
    img_logo_url: { type: String },
    
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('games', schema);