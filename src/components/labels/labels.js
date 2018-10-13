import React from 'react';
import {Label} from '../label/label';
import './labels.css';

export let Labels = ({labels, hasChildren}) => (
    <div className={hasChildren ? 'labels labels_has_children' : 'labels'}>
        {labels.map((label, key) => <Label key={key} label={label} />)}
    </div>
);