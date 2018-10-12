import React, { Component } from 'react';
import './App.css';
import {Block} from './components/block/block';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      root: {
        id: 0,
        labels: [1,2,3],
        hasChildren: true,
      },
      blocks: [
        {
            id: 1,
            labels: ['boo', 'daa'],
            parentID: 0,
            hasChildren: true
        },
        {
            id: 2,
            labels: ['todo'],
            parentID: 1,
        },
        {
            id: 4,
            labels: ['check me'],
            parentID: 0,
        },
        {
            id: 3,
            labels: ['dooo'],
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
