import React, { Component } from 'react'
import { Container, Card, Image } from 'semantic-ui-react'
import homebackground from '../../../samples/homeback.png'
import { GameCards } from '../GameCards';
import temp_game from '../../../samples/witcher3.jpg';
import temp_user from '../../../samples/sampleHead.png';

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {     
            
        }; 
    }

    render() {
        const temp_games= [{gameName:'Witcher 3',imgLogoUrl:temp_game},
                            {gameName:'Witcher 3',imgLogoUrl:temp_game},
                            {gameName:'Witcher 3',imgLogoUrl:temp_game},
                            {gameName:'Witcher 3',imgLogoUrl:temp_game},
                            {gameName:'Witcher 3',imgLogoUrl:temp_game},
                            {gameName:'Witcher 3',imgLogoUrl:temp_game}];
        const src1 = temp_user;
        return (
            <div>
            <div><Image src={homebackground} fluid/></div>
            <Container>
                <h1></h1>
                <h1>Today's Hot Pick</h1>
                <GameCards games={temp_games} />
            </Container>
            <Container>
                <h1></h1>
                <h1>People You Might Like</h1>
                <Card.Group itemsPerRow={4}>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src1} />
                        <Card.Content>
                        <Card.Header>Noob</Card.Header>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </Container>
            </div>
        );
    }
}

export { HomeContent as HomeContent }; 