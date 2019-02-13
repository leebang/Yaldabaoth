const express = require('express');
const router = express.Router();
const gameService = require('./game.service');

// routes
router.post('/register', register);
router.get('/games', getAllGame);
router.get('/:name', getGameInfoByGameName);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;


function register(req, res, next) {
    gameService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllGame(req, res, next) {
    gameService.getAllGame()
        .then(games => res.json(games))
        .catch(err => next(err));
}

function getGameInfoByGameName(req, res, next) {
    gameService.getGameInfoByGameName(req.params.name)
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