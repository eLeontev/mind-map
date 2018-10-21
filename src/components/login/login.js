import React from 'react';
import { Link } from 'react-router-dom';

import './login.css';

export let Login = () => (
    <div>
        <p>Login</p>
        <Link to="/mind-map">Go to maps</Link>
    </div>
);
