import React from 'react';
import { FriendsContent } from '../_components/FriendsContent';
import { GamesContent } from '../_components/GamesContent';
import { HomeContent } from '../_components/HomeContent';

class HomePage extends React.Component {
   
    render() {
        const { activeItem } = this.props;
        return (
            <div>
                {activeItem=='Home' && <HomeContent />}
                {activeItem=='Games' && <GamesContent />}
                {activeItem=='Friends' && <FriendsContent />}
            </div>
        );
    }
}

export { HomePage as HomePage };

