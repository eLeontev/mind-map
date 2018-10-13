import React, { Component } from 'react';
import {guid} from './utils/uuid';
import './App.css';
import {Block} from './components/block/block';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBlockID: 0,
      enableCreateNewBlock: true,
      blocks: [{
        id: 0,
        hasChildren: false,
        isEditMode: true,
        value: '',
      }],
    };
  }

  keyDown = (event) => {
    if (this.state.blocks.some(({isEditMode}) => isEditMode)) {
        return;
    }

    if (event.which === 13 && this.state.enableCreateNewBlock) {
        return this.createNewSisterBlock(this.state.selectedBlockID)
    }

    if (event.which === 9) {
        event.preventDefault();

        return this.createNewChildrenBlock(this.state.selectedBlockID);
    }

    this.setState({
        enableCreateNewBlock: true
    });
  }

  componentDidMount() {
      document.addEventListener('keydown', this.keyDown, false);
  }

  componentWillUnmount() {
      document.removeEventListener('keydown', this.keyDown, false);
  }
  
  switchLabelToEditMode = (id) => {
    let blocks = this.state.blocks.map((block) => ({
        ...block,
        isEditMode: block.id === id,
    }));

    this.setState({ 
        blocks,
        selectedBlockID: id,
     });
  }

  updateLabel = (id, value) => {
    let blocks = this.state.blocks.map((block) => {
        if (block.id === id) {
            return {
                ...block, 
                value, 
              }
        }

        return block;
    });

    this.setState({ 
        blocks,
    });
  } 

  updateAndCloseLabel = (id, value) => {
    let blocks = this.state.blocks.map((block) => {
        if (block.id === id) {
            return {
                ...block, 
                value, 
                isEditMode: false
              }
        }

        return block;
    });

    this.setState({ 
        blocks,
        selectedBlockID: id,
    });
  }

  createNewSisterBlock = (id) => {
    if (id === 0) {
        return;
    }

    let parentID = this.state.blocks.find((block) => block.id === id).parentID;

    let selectedBlockID = guid();
    this.setState({
        blocks: [
            ...this.state.blocks, {
                parentID,
                hasChildren: false,
                isEditMode: true,
                value: '',
                id: selectedBlockID,
            }
        ],
        selectedBlockID,
    })
  }

  createNewChildrenBlock = (parentID) => {
      let blocks = this.state.blocks.map((block) => {
          if (block.id === parentID) {
              return {...block, hasChildren: true}
          }

          return block;
      });

      
      let selectedBlockID = guid();
      this.setState({ 
          blocks: [...blocks, {
            parentID,
            hasChildren: false,
            isEditMode: true,
            value: '',
            id: selectedBlockID,
          }],
          selectedBlockID,
      })
  }

  render() {
    let { blocks } = this.state;
    // get parent data
    let [{id, hasChildren, isEditMode, value}] = blocks;

      return (
          <Block
              id={id}
              value={value}
              blocks={blocks}
              isEditMode={isEditMode}
              hasChildren={hasChildren}
              updateLabel={this.updateLabel}
              updateAndCloseLabel={this.updateAndCloseLabel}
              switchLabelToEditMode={this.switchLabelToEditMode}
              createNewBlock={this.createNewBlock} 
          />
      );
  }
}

export default App;
