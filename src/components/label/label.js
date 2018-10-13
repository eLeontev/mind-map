import React from 'react';
import './label.css';

export let Label = ({label}) => (
    <label className="label">
        <p className="label--text">{label}</p>
    </label>
);