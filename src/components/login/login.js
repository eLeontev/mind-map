import React from 'react';
import { withRouter } from 'react-router';

import './login.css';

let Login = ({ history }) => {
    let login = () => {
        fetch('/auth/google', {
            method: 'GET',
            mode: 'no-cors'
        })
        .then(() => history.push('/maps'))
        .catch(console.error)    
    }
    return (
        <div className="login">
            <h1 className="login--title">Login</h1>
            <button className="auth-button"
                onClick={login}
            >
                Google AUTH
            </button>
        </div>
)};

export default withRouter(Login);