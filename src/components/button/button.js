import React from 'react';

import './button.css';

export let Button = ({ label, callback, className = 'sign-out' }) => (
    <button className={className} onClick={callback}>
        {label}
    </button>
);
