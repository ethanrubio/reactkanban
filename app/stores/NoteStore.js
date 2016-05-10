import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    
    this.notes = [];
  }
  
  create(note) {
    
    const notes = this.notes;
    
    note.id = uuid.v4();
    
    // this.setState is a feature of Alt that allows us to 
    // signify that we are going to alter the store state. 
    // Alt will signal the change to possible listeners.
    this.setState({
      notes: notes.concat(note)
    });
  }
  
  update(updatedNoted) {
    
    const notes = this.notes.map(note => {
      if (note.id === updatedNoted.id) {
        // Object.assign is used to patch the note data here. It
        // mutates target (first parameter). In order to avoid that,
        // use {} as its target and apply data on it.
        //
        // Example: {}, {a: 5, b: 3}, {a: 17} -> {a: 17, b: 3}
        // You can pass as many objects to the method as you want.
        
        return Object.assign({}, note, updatedNoted);
      }
      
      return note;
    });
    
    // This is same as `this.setState({notes: notes})` known as property shorthand
    this.setState({notes});
  }
  
  delete(id) {
    
  }
}

export default alt.createStore(NoteStore, 'NoteStore');