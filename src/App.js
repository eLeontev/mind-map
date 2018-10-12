import React, { Component } from 'react';
import './App.css';
let Label = ({label}) => (
  <b>
    {label}
  </b>
);

let Block = ({id, labels, hasChildren, blocks}) => {
  let renderBlocks = (id) => (
    blocks.filter(({parentID}) => parentID === id)
        .map(block => (<Block id={block.id} {...block} blocks={blocks} />))
  );

  return (
    <div>
      {labels.map((label, key) => <Label key={key} label={label} />)}
      {hasChildren && renderBlocks(id)}
    </div>
  )
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parent: {
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
    let {blocks, parent} = this.state;

    return (
        <div>
            {parent.labels.map((label, key) => <Label key={key} label={label} />)}
            <Block
              id={parent.id}
              labels={['parent']}
              blocks={blocks}
              hasChildren={true}
            />
        </div>
    );
  }
}

export default App;
