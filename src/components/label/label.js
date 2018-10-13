import React from 'react';
import './label.css';
import {TextArea} from '../text-area/text-area';
import {TextField} from '../text-field/text-field';

export let Label = ({id, value, isEditMode, hasChildren, updateLabel, updateAndCloseLabel, switchLabelToEditMode}) => (
    <div className={hasChildren ? 'labels labels_has_children' : 'labels'}>
        <label className="label">
            <TextField
                id={id}
                value={value}
                isEditMode={isEditMode}
                switchLabelToEditMode={switchLabelToEditMode}
            />
            <TextArea 
                id={id} 
                value={value} 
                isEditMode={isEditMode} 
                updateLabel={updateLabel}
                updateAndCloseLabel={updateAndCloseLabel}
            />
        </label>
    </div>
);