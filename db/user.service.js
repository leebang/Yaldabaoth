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
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username called "' + userParam.username + '" is already exist';
    }
    const user = new User(userParam);
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    if(userParam.steamAccount){
        var options = {
            method: 'GET',
            uri: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=479387AA962E63341F51611AD7D193E3&include_appinfo=1&steamid="+userParam.steamAccount+"&format=json",
            json: true // Automatically parses the JSON string in the response
        };
        var resp = await request(options);
        if(resp==null){
            throw 'Steam ID is not valid';
        }
        var sending_array = resp.response.games.map(function(g){
            return JSON.stringify({url:"https://store.steampowered.com/agecheck/app/"+g.appid,
            platform:['Steam'],
            gameName:g.name,
            playTime:g.playtime_forever,
            imgIconUrl:g.img_icon_url!="" ? "http://media.steampowered.com/steamcommunity/public/images/apps/"+g.appid+"/"+g.img_icon_url+".jpg" : "",
            imgLogoUrl:g.img_logo_url!="" ? "http://media.steampowered.com/steamcommunity/public/images/apps/"+g.appid+"/"+g.img_logo_url+".jpg" : ""
        });
        });
    }
    user.gamesList=sending_array.slice();
    await user.save();

    var games_array = sending_array.map(function(g){
        return JSON.parse(g);
    });
    games_array.forEach(element => {
        if(await gameService.getByName(element.gameName)){
            element.userList.push(userParam.username);
            await gameService.update(element._id,element);
        }else{
            await gameService.create(element);
        }
    });
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered

    // if (userParam.password) {
    //     userParam.hash = bcrypt.hashSync(userParam.password, 10);
    // }

    if (userParam.password) {
        if (!(userParam.newPassword && userParam.newPasswordCompare)){
            throw ("Please enter both new password.")
        } else {
            // check if new password are the same
            if (userParam.newPassword !== userParam.newPasswordCompare){
                throw ("Please enter the same new password.")
            } else {
                // check old password
                const originPassword = await User.findById(id).select('hash');
                if (bcrypt.compareSync(userParam.password, originPassword.hash)){
                    userParam.hash = bcrypt.hashSync(userParam.newPassword, 10);
                } else {
                    throw ("Old password incorrect.")
                }
            }
        }

    } else if (!userParam.password && (userParam.newPassword || userParam.newPasswordCompare)) {
        throw ("Please enter your current password.");
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    return await User.findById(id).select('-hash -id');
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}