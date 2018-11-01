import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { services } from '../../services';

import './main.css';

let { isUserAuthorized } = services;

class Main extends Component {
    componentDidMount() {
        let { history } = this.props;
        isUserAuthorized()
            .then((displayName) => history.push('/maps', displayName))
            .catch(() => history.push('/login'));
    }

    render() {
        return <div className="main">User autentification...</div>;
    }
}

export default withRouter(Main);
