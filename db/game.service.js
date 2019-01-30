const db = require('_helpers/db');
const Game = db.Game;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Game.find().select('-_id');
}

async function getById(id) {
    return await Game.findById(id).select('-_id');
}

async function create(Param) {
    // validate
    if (await Game.findOne({ gamename: Param.gamename })) {
        throw 'Game called "' + Param.gamename + '" is already here';
    }
    const game = new Game(Param);
    // save user
    await game.save();
}

async function update(id, Param) {
    const game = await Game.findById(id);

    // validate
    if (!game) throw 'No such game';
    if (game.gamename !== Param.gamename && await Game.findOne({ gamename: Param.gamename })) {
        throw 'Game called "' + Param.gamename + '" is already here';
    }


    // copy userParam properties to user
    Object.assign(game, Param);

    await game.save();
}

async function _delete(id) {
    await Game.findByIdAndRemove(id);
}