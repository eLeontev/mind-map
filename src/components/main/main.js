import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { services } from '../../services';

import './main.css';

let { isUserAuthorized } = services;

class Main extends Component {
    componentDidMount() {
        let { history } = this.props;
        isUserAuthorized()
            .then(({ displayName }) => {
                // eslint-disable-next-line no-undef
                sessionStorage.setItem('displayName', displayName);
                history.push('/maps', { displayName });
            })
            .catch(() => history.push('/login'));
    }

    render() {
        return <div className="main">User autentification...</div>;
    }
}

export default withRouter(Main);
