import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Input from '../input';
import Maps from '../maps';
import SignOut from '../sign-out';

import { services } from '../../services';

import './map-menu.css';

let { getMapsByUserID, createNewMap } = services;

let MESSAGE = 'no maps yet';
let initialState = {
    userName: 'User',
    newMapName: '',
    maps: [
        // {
        //     id: 'id',
        //     label: 'mapName',
        // },
        // {
        //     id: 'id3',
        //     label: 'mapName2',
        // },
    ],
};

class MapMenu extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        let { maps } = this.state;
        getMapsByUserID(maps).then((maps) => this.setState({ maps }));
    }

    validateAndGoToNewCreatedMap = (label) => {
        let { history } = this.props;
        let { maps } = this.state;

        let isUniqLabel = !maps.find(
            ({ label: currentLabel }) => currentLabel === label
        );
        let mapLabel = label.trim();

        if (isUniqLabel && label.trim()) {
            return createNewMap(mapLabel).then((label) =>
                history.push(`/maps/${label}`)
            );
        }

        return this.setState({ defaultValue: label });
    };

    signOut = () => {
        let { history } = this.props;
        history.push('/login');
    };

    render() {
        let { userName, maps, defaultValue } = this.state;

        return (
            <div className="menu">
                <h1 className="menu--title">
                    Welcome to Mind-Map,
                    {`   ${userName}`}
                </h1>
                <label className="menu--label">
                    <Input
                        defaultValue={defaultValue}
                        callback={this.validateAndGoToNewCreatedMap}
                    />
                </label>
                {maps.length ? (
                    <Maps maps={maps} />
                ) : (
                    <p className="message">{MESSAGE}</p>
                )}

                <SignOut callback={this.signOut} />
            </div>
        );
    }
}

export default withRouter(MapMenu);
