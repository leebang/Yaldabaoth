import React, { Component } from 'react'
import { Container, Card, Image } from 'semantic-ui-react'

class HomeContent extends Component {
    constructor(props) {
        super(props);
        this.state = {     
            
        }; 
    }

    render() {
        const src = '../../../samples/image.jpg';
        const src1 = '../../../samples/sampleHead.png';
        return (
            <div>
            <div><Image src= '../../../samples/homeback.png' fluid/></div>
            <Container>
                <h1></h1>
                <h1>Today's Hot Pick</h1>
                <Card.Group itemsPerRow={4}>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Image src={src} />
                        <Card.Content>
                        <Card.Header>Witcher 3</Card.Header>
                        </Card.Content>
                    </Card>
                </Card.Group>
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