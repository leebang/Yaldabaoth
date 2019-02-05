const express = require('express');
const router = express.Router();
const gameService = require('./game.service');

// routes
router.post('/registergame', register);
router.get('/', getAll);
router.get('/users', getAllUserByGame);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

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