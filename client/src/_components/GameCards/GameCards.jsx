import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import no_image from '../../../samples/no_image.png';

class GameCards extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div>
                <Card.Group itemsPerRow={4}>
                        {this.props.games.map((g) =>
                            <Card key={g.gameName}>
                                <Image src={g.imgLogoUrl=="" ? no_image : g.imgLogoUrl} />
                                <Card.Content>
                                <Card.Description>{g.gameName}</Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                </Card.Group>
            </div>
        );
    }
}

export { GameCards as GameCards };