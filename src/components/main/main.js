import React, { Component } from 'react';
import { withRouter } from 'react-router';

import './main.css';

class Main extends Component {
    componentDidMount() {
        let { history } = this.props;
        history.push('/login');
    }

    render() {
        return <div className="main">User autentification...</div>;
    }
}

export default withRouter(Main);
