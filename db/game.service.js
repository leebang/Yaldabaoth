const db = require('_helpers/db');
const Game = db.Game;

module.exports = {
    getAllGame,
    getGameInfoByGameName,
    create,
    update,
    delete: _delete
};

async function getAllGame() {
    return await Game.find().select('-userList');
}

async function getGameInfoByGameName(name) {
    return await Game.findOne({ gameName: name });
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

    return await Game.findById(id);
}

async function _delete(id) {
    await Game.findByIdAndRemove(id);
}