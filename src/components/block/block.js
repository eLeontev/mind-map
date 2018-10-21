import React from 'react';
import Label from '../label';

import './block.css';

export let Block = ({ block, blocks, hadnlers }) => {
    let { id, hasChildren, isEditMode, isRoot = false } = block;
    let { removeBlockWithChildren } = hadnlers;

    let childrenBlocks = blocks.filter(({ parentID }) => parentID === id);
    let shoudDisplaySeparator = childrenBlocks.length > 1;

    let renderCHildrenBlocks = (childrenBlocks, blocks) =>
        childrenBlocks.map((block) => (
            <Block
                key={block.id}
                block={block}
                blocks={blocks}
                hadnlers={hadnlers}
            />
        ));

    let souldDisplayRemoveButton = !(isEditMode || isRoot);
    return (
        <div className="block">
            <div className="block--label-container">
                <Label block={block} {...hadnlers} />
                {souldDisplayRemoveButton && (
                    <button
                        className="block--remove-button"
                        onClick={() => removeBlockWithChildren(id)}
                    />
                )}
            </div>
            {hasChildren && (
                <div className="block--children">
                    {shoudDisplaySeparator && (
                        <div className="block--children-separator" />
                    )}
                    {renderCHildrenBlocks(childrenBlocks, blocks)}
                </div>
            )}
        </div>
    );
};
