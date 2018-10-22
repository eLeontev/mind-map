import React from 'react';

import { CONSTANTS } from '../../constants';

import './input.css';

let { ENTER_KEY_CODE } = CONSTANTS;

export let Input = ({ callback, defaultValue }) => {
    let onEnterPress = ({ which, target: { value } }) => {
        if (which === ENTER_KEY_CODE && value.trim()) {
            callback(value);
        }
    };

    return (
        <input
            defaultValue={defaultValue}
            onKeyPress={(event) => onEnterPress(event)}
            className="input-field"
        />
    );
};
