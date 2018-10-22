import React from 'react';

import './sign-out.css';

let SIGN_OUT = 'Sign out';

export let SignOut = ({ callback }) => (
    <button className="sign-out" onClick={callback}>
        {SIGN_OUT}
    </button>
);
