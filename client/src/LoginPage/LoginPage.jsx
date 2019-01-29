import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { MenuBar } from '../_components/MenuBar'


class LoginPage extends React.Component {  
    render() {
        const { msg } = this.props;
        return (
            <div> 
                <MenuBar value={false} msg={msg}/>
            </div>
        );
    }
}




export { LoginPage as LoginPage }; 