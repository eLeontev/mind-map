import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { services } from '../../services';

import './main.css';

let { isUserAutorized } = services;

class Main extends Component {
    componentDidMount() {
        let { history } = this.props;
        
        isUserAutorized()
            .then((displayName) => {
                debugger;
                history.push('/maps', displayName);
            })
            .catch(() => {
                debugger;
                history.push('/login')
            });
    }

    render() {
        return <div className="main">User autentification...</div>;
    }
}

export default withRouter(Main);
