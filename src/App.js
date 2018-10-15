import React, { Component } from 'react';
import Block from './components/block';

import { CONSTANTS } from './constants';
import { utils } from './utils';

import './App.css';

let { elementsHandledOnCLick, rootBlock, ENTER_KEY_CODE, TAB_KEY_CODE } = CONSTANTS;
let { guid, getNewBlock } = utils;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBlockID: 0,
      enableCreateNewBlock: true,
      blocks: [{ ...rootBlock }],
    };
  }

  keyDown = (event) => {
    let hasEditedBlocks = this.state.blocks.some(({ isEditMode }) => isEditMode);
    
    if (hasEditedBlocks) {
        return;
    }

    let { selectedBlockID, enableCreateNewBlock } = this.state; 
    let { which: keyCode } = event;

    switch (true) {
        case (keyCode === ENTER_KEY_CODE && enableCreateNewBlock): {
            this.createNewSisterBlock(selectedBlockID);
            break;
        }
        case (keyCode === TAB_KEY_CODE): {
            event.preventDefault();
            
            this.createNewChildrenBlock(selectedBlockID);
            break;
        }
        default: {
            this.setState({
                enableCreateNewBlock: true,
            });
        }
    }
  }

  clickOnEmptySpace = ({target: { className: targetClass }}) => {
    let isClickOnHandledElement = elementsHandledOnCLick.some((className) => className === targetClass);
    
    if (!isClickOnHandledElement) {
        this.closeEditedLabelOnCLick();
    }
  }

  componentDidMount() {
      document.addEventListener('keydown', this.keyDown, false);
      document.addEventListener('mousedown', this.clickOnEmptySpace, true);
  }

  componentWillUnmount() {
      document.removeEventListener('keydown', this.keyDown, false);
      document.removeEventListener('mousedown', this.clickOnEmptySpace, true);
  }
  
  switchLabelToEditMode = (id) => {
    let hasEditedBlockWithEmptyLabel = this.state.blocks.find(
        ({ isEditMode, value }) => isEditMode && !value.trim()
    );

    if (hasEditedBlockWithEmptyLabel) {
        return;
    }

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
    let blocks = this.state.blocks.map((block) => (
        block.id === id ? {
            ...block, 
            value, 
        } : block
    ));

    this.setState({ 
        blocks,
    });
  } 

  closeLabel = (selectedBlockID) => {
    let blocks = this.state.blocks.map((block) => (
        block.id === selectedBlockID ? {
            ...block, 
            isEditMode: false
        } : block
    ));

    this.setState({ 
        blocks,
        selectedBlockID,
    });
  }

  createNewSisterBlock = (id) => {
    if (id === rootBlock.id) {
        return;
    }

    let { blocks } = this.state;
    let parentID = blocks.find(
        ({ id: currentID }) => currentID === id
    ).parentID;

    this.createAndSelectNewBlock(parentID, blocks);
  }

  createNewChildrenBlock = (parentID) => {
    let blocks = this.state.blocks.map((block) => (
        block.id === parentID ? {
            ...block, 
            hasChildren: true
        } : block
    ));

    this.createAndSelectNewBlock(parentID, blocks);
  }

  createAndSelectNewBlock = (parentID, blocks) => {
    let selectedBlockID = guid();
    
    this.setState({ 
        blocks: [
            ...blocks, 
            getNewBlock(selectedBlockID, parentID)
        ],
        selectedBlockID,
    })
  }

  closeEditedLabelOnCLick = () => {
    let { hasEditedLabel, blocks } = this.state.blocks.reduce(({ blocks, hasEditedLabel }, block) => {
        let { isEditMode, value } = block;

        if (isEditMode && value.trim()) {
            block = { ...block, isEditMode: false };
            hasEditedLabel = true;
        }

        return {
            hasEditedLabel,
            blocks: [ ...blocks, block ],
        };
    }, { blocks: [] });
      
    if (hasEditedLabel) {
        this.setState({ blocks });    
    }
  }

  removeLabel = (id, parentId) => {
    const blocks = this.state.blocks;
    this.setState({
        blocks: blocks.filter(b => b.id !== id),
        selectedBlockID: parentId
    });
  }

  render() {
    let { blocks } = this.state;
    let [rootBlock] = this.state.blocks;
    let hadnlers = { 
        updateLabel: this.updateLabel, 
        closeLabel: this.closeLabel, 
        switchLabelToEditMode: this.switchLabelToEditMode,
        removeLabel: this.removeLabel
    };
    
    return (
        <Block
            block={rootBlock}
            blocks={blocks}
            hadnlers={hadnlers}
        />
    );
  }
}

export default App;
