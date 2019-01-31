const config = require('config.json');
const request = require('request-promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;
const gameService = require('./game.service');

module.exports = {
    authenticate,
    getAllUser,
    getAllGamesById,
    getAllFriendsById,
    getById,
    create,
    update,
    deleteUser: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUser() {
    return await User.find().select('-hash -gamesList -friendsList');
}

async function getAllGamesById(id) {
    return await User.findById(id).select('gamesList');
}

async function getAllFriendsById(id) {
    return await User.findById(id).select('friendsList');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    if (userParam.steamAccount) {
        var options = {
            method: 'GET',
            uri: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=479387AA962E63341F51611AD7D193E3&include_appinfo=1&steamid="+userParam.steamAccount+"&format=json",
            json: true // Automatically parses the JSON string in the response
        };
        request(options)
            .then(function (repos) {
                var sending_array = repos.response.games.map(function(g){
                    return {url:"https://store.steampowered.com/agecheck/app/"+g.appid,
                    gameName:g.name,
                    playTime:g.playtime_forever,
                    imgIconUrl:g.img_icon_url,
                    imgLogiUrl:g.img_logo_url,
                    userList:[]}
                });
                var i = 0;
                while (i<sending_array.length){
                    gameService.create(sending_array[i])
                    .then(() => {})
                    .catch(err => next(err));
                }
            })
            .catch(function (err) {
                throw 'Steam ID is not valid';
            });
    }
    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}