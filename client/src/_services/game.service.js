import config from 'config';

export const gameService = {
    getAllGames,
    getByName,
    update
};

function getAllGames() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/games`, requestOptions).then(handleResponse);
}

function getByName(name) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/games/${name}`, requestOptions).then(handleResponse);
}

function update(game) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    };
    return fetch(`${config.apiUrl}/games/${game._id}`, requestOptions).then(handleResponse);
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