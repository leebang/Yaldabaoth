const db = require('_helpers/db');
const Game = db.Game;

module.exports = {
    getAll,
    getById,
    create,
    update,
    getAllUserByGame,
    delete: _delete
};

async function getAll() {
    return await Game.find().select('-id');
}

async function getAllUserByGame() {
    return await Game.findById(id).select('userList');
}

async function getById(id) {
    return await Game.findById(id).select('-id');
}

async function create(Param) {
    // validate
    if (await Game.findOne({ gameName: Param.gameName })) {
        throw 'Game called "' + Param.gameName + '" is already exist';
    }
    const game = new Game(Param);
    // save user
    await game.save();
}

async function update(id, Param) {
    const game = await Game.findById(id);

    // validate
    if (!game) throw 'No such game';
    if (game.gameName !== Param.gameName && await Game.findOne({ gameName: Param.gameName })) {
        throw 'Game called "' + Param.gameName + '" is already exist';
    }


    // copy userParam properties to user
    Object.assign(game, Param);

    await game.save();
}

async function _delete(id) {
    await Game.findByIdAndRemove(id);
}