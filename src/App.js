import React, { Component } from 'react';
import './App.css';
import {Block} from './components/block/block';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      root: {
        id: 0,
        labels: ['text 1', 'text 2'],
        hasChildren: true,
      },
      blocks: [
        {
            id: 1,
            labels: ['text 3', 'text 4'],
            parentID: 0,
            hasChildren: true
        },
        {
            id: 2,
            labels: ['text'],
            parentID: 1,
        },
        {
            id: 4,
            labels: ['просто длинный текст сообщения'],
            parentID: 0,
        },
        {
            id: 6,
            labels: ['просто длинный текст сообщения'],
            parentID: 0,
        },
        ,
        {
            id: 3,
            labels: ['Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor at impedit dolore sequi quibusdam dolores atque quo consequatur officiis nulla, non, totam odit tempora.'],
            parentID: 1,
        }
      ]
    };
  }

  render() {
    let { blocks, root: { labels, id } } = this.state;

      return (
          <Block
              id={id}
              labels={labels}
              blocks={blocks}
              hasChildren={true}
          />
      );
  }
}

export default App;
