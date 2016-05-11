import React from 'react';
import AltContainer from 'alt-container';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {
  
  render() {
    // Alt containers bind data to children
    // inject notes property into Notes
    return (
      <div>
        <button 
          className="add-lane"
          onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
  
  addLane() {
    LaneActions.create({name: 'New lane'});
  }
  
  // could also be written as with binding at constructor
  // addNote() {
  //   this.setState({
  //     notes: this.state.notes.concat([{
  //       id: uuid.v4(),
  //       task: 'New task'
  //     }])
  //   });
  // };
}