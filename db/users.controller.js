const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const middleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    next();
}
// routes
router.post('/authenticate', authenticate,middleware);
router.post('/register', register,middleware);
router.get('/allusers', getAllUser,middleware);
router.get('/current', getCurrent,middleware);
router.get('/:id/allgames', getAllGamesById,middleware);
router.get('/:id/allfriends', getAllFriendsById,middleware);
router.get('/:id', getById,middleware);
router.put('/:id', update,middleware);
router.delete('/:id', _delete,middleware);

module.exports = router;

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

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllGamesById(req, res, next) {
    userService.getAllGamesById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAllFriendsById(req, res, next) {
    userService.getAllFriendsById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}