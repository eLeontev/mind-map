import React from 'react';
import {Labels} from '../labels/labels';
import './block.css';

export let Block = ({id, labels, hasChildren, blocks}) => {
    let renderBlocks = (id) => (
        blocks.filter(({parentID}) => parentID === id)
        .map(block => (<Block key={block.id} {...block} blocks={blocks} />))
    );

    console.log(labels);
    return (
        <div className="block">
            <Labels labels={labels} hasChildren={hasChildren} />
            {/* <div className="labels"> */}
                {/* {labels.map((label, key) => <Label key={key} label={label} />)} */}
            {/* </div> */}
            {hasChildren && (
                <div className="block--children">
                    {hasChildren && renderBlocks(id)}
                </div>
            )}
        
        </div>
    )
}