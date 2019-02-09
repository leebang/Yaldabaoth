import React, { Component } from 'react';

class GameProfilePage extends Component {
    render () {
        const { gameName } = this.props.match.params;
        return (
            <div>
                <p>{gameName}</p>
            </div>
        );
    }
}

export { GameProfilePage as GameProfilePage }; 