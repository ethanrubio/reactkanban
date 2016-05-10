import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = NoteStore.getState();
    
    // this.addNote = this.addNote.bind(this)
  }
  
  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }
  
  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }
  
  // experimental property intializer
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context because it defaults to
    // `undefined` in strict mode.
    this.setState(state);
  }
  
  render() {
    const notes = this.state.notes;
    
    return (
      <div>
        <button 
          className="add-note"
          onClick={this.addNote}>+</button>
        <Notes 
          notes={notes} 
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
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