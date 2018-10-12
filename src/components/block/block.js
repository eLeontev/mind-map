import React from 'react';
import {Label} from '../label/label';
import './block.css';

export let Block = ({id, labels, hasChildren, blocks}) => {
    let renderBlocks = (id) => (
        blocks.filter(({parentID}) => parentID === id)
        .map(block => (<Block key={block.id} {...block} blocks={blocks} />))
    );

    console.log(labels);
    return (
        <div className="block">
            {labels.map((label, key) => <Label key={key} label={label} />)}
            {hasChildren && renderBlocks(id)}
        </div>
    )
}