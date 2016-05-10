import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    
    this.notes = [];
  }
  
  create(note) {
    
  }
  
  update(note) {
    
  }
  
  delete(id) {
    
  }
}

export default alt.createStore(NoteStore, 'NoteStore');