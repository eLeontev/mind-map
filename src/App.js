import React, { Component } from 'react';
import Block from './components/block';

import { CONSTANTS } from './constants';
import { utils } from './utils';

import './App.css';

let { guid, getNewBlock } = utils;
let {
    elementsHandledOnCLick,
    rootBlock,
    ENTER_KEY_CODE,
    TAB_KEY_CODE,
} = CONSTANTS;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBlockID: 0,
            enableCreateNewBlock: true,
            blocks: [{ ...rootBlock }],
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown, false);
        document.addEventListener('mousedown', this.clickOnEmptySpace, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown, false);
        document.removeEventListener('mousedown', this.clickOnEmptySpace, true);
    }

    keyDown = (event) => {
        let { selectedBlockID, enableCreateNewBlock, blocks } = this.state;

        let hasEditedBlocks = blocks.some(({ isEditMode }) => isEditMode);

        if (hasEditedBlocks) {
            return;
        }

        let { which: keyCode } = event;

        /* eslint-disable indent */
        switch (true) {
            case keyCode === ENTER_KEY_CODE && enableCreateNewBlock: {
                this.createNewSisterBlock(selectedBlockID);
                break;
            }
            case keyCode === TAB_KEY_CODE: {
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
        /* eslint-enable indent */
    };

    clickOnEmptySpace = ({ target: { className: targetClass } }) => {
        let isClickOnHandledElement = elementsHandledOnCLick.some(
            (className) => className === targetClass
        );

        if (!isClickOnHandledElement) {
            this.closeEditedLabelOnCLick();
        }
    };

    switchLabelToEditMode = (id) => {
        let { blocks } = this.state;

        let hasEditedBlockWithEmptyLabel = blocks.find(
            ({ isEditMode, value }) => isEditMode && !value.trim()
        );

        if (hasEditedBlockWithEmptyLabel) {
            return;
        }

        blocks = blocks.map((block) => ({
            ...block,
            isEditMode: block.id === id,
        }));

        this.setState({
            blocks,
            selectedBlockID: id,
        });
    };

    updateLabel = (id, value) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block) =>
                block.id === id
                    ? {
                          ...block,
                          value,
                      }
                    : block
        );
        /* eslint-enable indent */
        this.setState({
            blocks,
        });
    };

    closeLabel = (selectedBlockID) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block) =>
                block.id === selectedBlockID
                    ? {
                          ...block,
                          isEditMode: false,
                      }
                    : block
        );
        /* eslint-enable indent */
        this.setState({
            blocks,
            selectedBlockID,
        });
    };

    createNewSisterBlock = (id) => {
        if (id === rootBlock.id) {
            return;
        }

        let { blocks } = this.state;
        let { parentID } = blocks.find(({ id: currentID }) => currentID === id);

        this.createAndSelectNewBlock(parentID, blocks);
    };

    createNewChildrenBlock = (parentID) => {
        let { blocks } = this.state;

        /* eslint-disable indent */
        blocks = blocks.map(
            (block) =>
                block.id === parentID
                    ? {
                          ...block,
                          hasChildren: true,
                      }
                    : block
        );
        /* eslint-enable indent */
        this.createAndSelectNewBlock(parentID, blocks);
    };

    createAndSelectNewBlock = (parentID, blocks) => {
        let selectedBlockID = guid();

        this.setState({
            blocks: [...blocks, getNewBlock(selectedBlockID, parentID)],
            selectedBlockID,
        });
    };

    closeEditedLabelOnCLick = () => {
        /* eslint-disable-next-line react/destructuring-assignment */
        let { hasEditedLabel, blocks } = this.state.blocks.reduce(
            ({ blocks, hasEditedLabel }, block) => {
                let { isEditMode, value } = block;

                if (isEditMode && value.trim()) {
                    block = { ...block, isEditMode: false };
                    hasEditedLabel = true;
                }

                return {
                    hasEditedLabel,
                    blocks: [...blocks, block],
                };
            },
            { blocks: [] }
        );

        if (hasEditedLabel) {
            this.setState({ blocks });
        }
    };

    render() {
        let { blocks } = this.state;
        let [rootBlock] = blocks;
        let hadnlers = {
            updateLabel: this.updateLabel,
            closeLabel: this.closeLabel,
            switchLabelToEditMode: this.switchLabelToEditMode,
        };

        return <Block block={rootBlock} blocks={blocks} hadnlers={hadnlers} />;
    }
}

export default App;
