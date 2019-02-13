import config from 'config';

export const gameService = {
    getAllGame,
    getGameInfoByGameName,
    update
};

function getAllGame() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/GameApi/games`, requestOptions).then(handleResponse);
}

function getGameInfoByGameName(name) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/GameApi/${name}`, requestOptions).then(handleResponse);
}

function update(game) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    };
    
    return fetch(`${config.apiUrl}/GameApi/${game._id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}