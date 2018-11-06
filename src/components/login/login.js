import React, { Component } from 'react';

import Loader from '../loader';
import './login.css';

let label = 'Google AUTH';


export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: true
        };
    }

    render() {
        let { isLoaded } = this.state;
        return (
            <div className="login">
                <h1 className="login--title">Login</h1>
                <a
                    onClick={() => this.setState({ isLoaded: false })}
                    className="auth-button"
                    href="auth/google"
                >
                    {label}
                </a>
                {!isLoaded && <Loader />}
            </div>
        );
    }
};
