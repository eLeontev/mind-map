import React from 'react';

import { Link } from 'react-router-dom';

import './maps.css';

export let Maps = ({ maps }) => (
    <ul className="maps">
        {maps.map(({ id, label }) => (
            <li key={id} className="maps--map">
                <Link to={`/maps/${id}`}>{label}</Link>
            </li>
        ))}
    </ul>
);
