import React from 'react';
import TextArea from '../text-area';
import TextField from '../text-field';

import './label.css';

export let Label = ({ block, updateLabel, closeLabel, switchLabelToEditMode }) => {
    let { id, value, isEditMode, hasChildren } = block;
    let blockData = { id, value, isEditMode };

    let className = hasChildren ? 'labels labels_has_children' : 'labels';
    
    return (
        <div className={className}>
            <label className="label">
                <TextField
                    {...blockData}
                    switchLabelToEditMode={switchLabelToEditMode}
                />
                <TextArea 
                    {...blockData} 
                    updateLabel={updateLabel}
                    closeLabel={closeLabel}
                />
            </label>
        </div>
    );
};