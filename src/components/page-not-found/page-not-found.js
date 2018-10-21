import React from 'react';
import { Link } from 'react-router-dom';

import './page-not-found.css';

export let PageNotFound = () => (
    <div>
        <p>
            The page is not found, please{' '}
            <Link to="/">go to the main page</Link>
        </p>
    </div>
);
