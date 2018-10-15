import React from 'react';
import TextArea from '../text-area';
import TextField from '../text-field';

import './label.css';

export let Label = ({ block, updateLabel, closeLabel, switchLabelToEditMode, removeLabel }) => {
    let { id, value, isEditMode, hasChildren } = block;
    let blockData = { id, value, isEditMode };

    let className = hasChildren ? 'labels labels_has_children' : 'labels';
    const labelClassName = `label ${block.parentID || block.parentID === 0 ? '' : ' is_root_label'}`; 
    
    return (
        <div className={className}>
            <label className={labelClassName}>
                <TextField
                    {...blockData}
                    switchLabelToEditMode={switchLabelToEditMode}
                />
                <TextArea 
                    {...blockData} 
                    updateLabel={updateLabel}
                    closeLabel={closeLabel}
                />
                {
                    block.parentID != null && <div className="removeLabel" onClick={() => removeLabel(id, block.parentID)}>X</div>
                }
            </label>
            
        </div>
    );
};