import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item } from 'semantic-ui-react';
import { userActions } from '../../_actions';
import { connect } from 'react-redux';

class UserDropdown extends Component {  
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const { authentication } = this.props;
        return (
            <div>
                <Item.Group>
                    {this.props.games.map((g) =>
                        <Item key={g.gameName}>
                        <Item.Image size='tiny' src={games.item.imgLogoUrl=="" ? no_image : games.item.imgLogoUrl} />
                        <Item.Content>
                            <Item.Header as='a'>{games.item.userList[0]}</Item.Header>
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description>
                            some Description
                            </Item.Description>
                            <Item.Extra>Additional Details</Item.Extra>
                        </Item.Content>
                        </Item>
                    )}
                </Item.Group>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    return {
        authentication
    };
}

const connectedUserDropdown = connect(mapStateToProps)(UserDropdown);
export { connectedUserDropdown as UserDropdown }; 