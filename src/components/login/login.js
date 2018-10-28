import React from 'react';

import './login.css';

export let Login = () => { 
    //TODO implement logic
    return (
        <div className="login">
            <h1 className="login--title">Login</h1>
            <a className="auth-button"
                href="auth/google"
            >
                Google AUTH
            </a>
        </div>
    )
};
