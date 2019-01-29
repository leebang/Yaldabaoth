import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { MenuBar } from '../_components/MenuBar'


class LoginPage extends React.Component {  
    render() {
        return (
            <div> 
                <MenuBar value={false} />
            </div>
        );
    }
}




export { LoginPage as LoginPage }; 