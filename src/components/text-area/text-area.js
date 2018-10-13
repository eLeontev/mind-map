import React, {Component} from 'react';
import './text-area.css';

export class TextArea extends Component {
    componentDidMount() {
        this.textarea.focus();
    }

    onEnterUpdate = (event) => {
        if (event.which === 13 && this.props.value.trim()) {
            this.props.updateAndCloseLabel(this.props.id, this.props.value.trim());
        }
    }

    preventFocus = (event) => {
        if (event.which === 9) {
            return event.preventDefault();
        }
    }
    render() {
        let {value} = this.props;
        
        return (
            <textarea 
                ref={(textarea) => this.textarea = textarea}
                value={value}
                placeholder="start type here to begin"
                onChange={({target: {value}}) => this.props.updateLabel(this.props.id, value)}
                onKeyPress={this.onEnterUpdate}
                onKeyDown={this.preventFocus}
                className={this.props.isEditMode ? 'editable-block': 'editable-block editable-block_hidden'}
            ></textarea>
        )
    }
}