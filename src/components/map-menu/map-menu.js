import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './map-menu.css';

class MapMenu extends Component {
    render() {
        let mapName = 'mapName';
        return (
            <div>
                <Link to={`/maps/${mapName}`}>go to the new map page</Link>
            </div>
        )    
    }
 }

export default MapMenu;