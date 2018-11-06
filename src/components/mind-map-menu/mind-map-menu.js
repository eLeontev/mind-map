import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Button from '../button';

import { services } from '../../services';

import './mind-map-menu.css';

let SAVE_LABEL = 'Save';
let BACK_TO_MENU_LABEL = 'Back to map menu';

class MindMapMenu extends Component {
    constructor(props) {
        super(props);

        this.services = services;
    }

    saveMap = () => {
        let {
            props: { blocks, id },
        } = this;
        this.services
            .saveMapByID(id, blocks)
            .then(({ status }) => console.log(status))
            .catch(console.error);
    };

    goToMapMenu = () => {
        let { history } = this.props;
        history.push('/maps');
    };

    render() {
        return (
            <div className="mind-map-menu">
                <Button
                    label={BACK_TO_MENU_LABEL}
                    callback={this.goToMapMenu}
                />
                <Button label={SAVE_LABEL} callback={this.saveMap} />
            </div>
        );
    }
}

export default withRouter(MindMapMenu);
