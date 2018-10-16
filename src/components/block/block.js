import React from 'react';
import Label from '../label';

import './block.css';

export let Block = ({ block, blocks, hadnlers }) => {
    let { id, hasChildren } = block;
    
    let childrenBlocks = blocks.filter(({ parentID }) => parentID === id);
    let shoudDisplaySeparator = childrenBlocks.length > 1;

    let renderCHildrenBlocks = (childrenBlocks, blocks) => (
        childrenBlocks.map(block => (
            <Block 
                key={block.id} 
                block={block} 
                blocks={blocks} 
                hadnlers={hadnlers}
            />
        ))
    );
   
    return (
        <div className="block">
            <div className="block--label-container">
                <Label
                    block={block}
                    {...hadnlers}
                />
            </div>
            {hasChildren && (
                <div className="block--children">
                    {shoudDisplaySeparator && <div className="block--children-separator"></div>}
                    {renderCHildrenBlocks(childrenBlocks, blocks)}
                </div>
            )}
        </div>
    )
}