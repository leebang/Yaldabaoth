const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/users', getAllUser);
// router.get('/current', getCurrent);
router.get('/:name/games', getUserGamesByUsername);
router.get('/:name/friends', getUserFriendsByUsername);
router.get('/:name/info', getUserInfoByUsername);
router.get('/:name/invitations', getUserInvitationsByUsername);
router.get('/:id/hash', getUserHashById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function getUserHashById(req, res, next) {
    userService.getUserHashById(req.params.id)
    .then(user => user ? res.json(user) : res.status(400).json( {message: "Get hash failed."}))
    .catch(err => next(err));
}

function getUserInvitationsByUsername(req, res, next) {
    userService.getUserInvitationsByUsername(req.params.username)
    .then(user => user ? res.json(user) : res.status(400).json( {message: "Get invitation failed."}))
    .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllUser(req, res, next) {
    userService.getAllUser()
        .then(users => res.json(users))
        .catch(err => next(err));
}

// function getCurrent(req, res, next) {
//     userService.getById(req.user.sub)
//         .then(user => user ? res.json(user) : res.sendStatus(404))
//         .catch(err => next(err));
// }

function getUserInfoByUsername(req, res, next) {
    userService.getUserInfoByUsername(req.params.username)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserGamesByUsername(req, res, next) {
    userService.getUserGamesByUsername(req.params.username)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getUserFriendsByUsername(req, res, next) {
    userService.getUserFriendsByUsername(req.params.username)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}