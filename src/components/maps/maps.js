import React from 'react';

import { Link } from 'react-router-dom';

import './maps.css';

export let Maps = ({ maps }) => (
    <ul className="maps">
        {maps.map(({ id, label }, index) => (
            <li key={id} className="maps--map">
                <Link className="maps--link" to={`/maps/${id}`}>
                    <span>{index + 1}. </span>
                    {label}
                </Link>
            </li>
        ))}
    </ul>
);
