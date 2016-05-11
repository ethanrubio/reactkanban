import React from 'react';
import Notes from './Notes.jsx';
import AltContainer from 'alt-container';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  
  render() {
    // Alt containers bind data to children
    // inject notes property into Notes
    return (
      <div>
        <button 
          className="add-note"
          onClick={this.addNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
        >
          <Notes 
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
  
  deleteNote(id, e) {
    // avoid bubbling to edit
    e.stopPropagation();
    
    NoteActions.delete(id);
  }
  
  addNote() {
    NoteActions.create({task: 'New task'});
  }
  
  editNote(id, task) {
    // don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }
    
    NoteActions.update({id, task});
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