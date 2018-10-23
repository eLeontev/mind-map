import React from 'react';
import { Link } from 'react-router-dom';

import './login.css';

export let Login = () => (
    <div className="login">
        <h1 className="login--title">Login</h1>
        <Link 
            className="auth-button"
            to="/auth/google"
        >
            Google AUTH
        </Link>
    </div>
);
