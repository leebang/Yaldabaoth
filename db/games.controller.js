const express = require('express');
const router = express.Router();
const gameService = require('./game.service');
const middleware = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type')
    next();
}
// routes
router.post('/registergame', register,middleware);
router.get('/', getAll,middleware);
router.get('/users', getAllUserByGame,middleware);
router.get('/:id', getById,middleware);
router.put('/:id', update,middleware);
router.delete('/:id', _delete,middleware);

module.exports = router;


function register(req, res, next) {
    gameService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    gameService.getAll()
        .then(games => res.json(games))
        .catch(err => next(err));
}

function getAllUserByGame(req, res, next) {
    gameService.getAllUserByGame(req.params.id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getById(req, res, next) {
    gameService.getById(req.params.id)
        .then(game => game ? res.json(game) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    gameService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    gameService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}