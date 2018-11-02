import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Input from '../input';
import Maps from '../maps';
import Button from '../button';

import { services } from '../../services';

import './map-menu.css';

let { 
    getMaps,
    createMap,
    signOff,
} = services;

let SIGN_OFF = 'Sign off';
let MESSAGE = 'no maps yet';
let initialState = {
    newMapName: '',
    maps: [],
};

class MapMenu extends Component {
    constructor(props) {
        super(props);
        let {
            location: {
                state: {
                    displayName
                }
            }
        } = props;

        this.state = {
            ...initialState,
            displayName
        };

        this.getMaps = getMaps;
        this.signOff = signOff;
        this.createMap = createMap;
    }

    componentDidMount() {
        this.getMaps()
            .then((maps) => this.setState({ maps }))
            .catch(({ message }) => console.error(message));
    }

    validateAndGoToNewCreatedMap = (label) => {
        let { history } = this.props;
        let { maps } = this.state;

        let isUniqLabel = !maps.find(
            ({ label: currentLabel }) => currentLabel === label
        );
        let mapLabel = label.trim();

        if (isUniqLabel && label.trim()) {
            return this.createMap(mapLabel)
                .then(({ label, id }) =>
                    history.push(`/maps/${label}`, {
                        id,
                    })
                )
                .catch(console.error);
        }

        return this.setState({ defaultValue: label });
    };

    signOffHandler = () => {
        this.signOff()
            .then(() => {
                console.log(1);
                let { history } = this.props;
                history.push('/login');        
            })
            .catch(console.error);
    };

    render() {
        let { displayName, maps, defaultValue } = this.state;

        return (
            <div className="menu">
                <h1 className="menu--title">
                    Welcome to Mind-Map,
                    {` ${displayName}`}
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

                <Button label={SIGN_OFF} callback={this.signOffHandler} />
            </div>
        );
    }
}

export default withRouter(MapMenu);
