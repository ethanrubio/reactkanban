import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    
    this.notes = [];
    
    // implement public method to accepts 
    // an array of Note ids, and returns the 
    // corresponding objects.
    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this)
    });
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
    
    return note;
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
    
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }
  
  getNotesByIds(ids) {
    // 1. make sure that we are operating over an array
    // and map over ids
    // [id, id, id...] -> [[Note], [], [Note], ...]
    return (ids || []).map(
      // 2. extract matching notes
      // [Note, Note, Note] -> [Note, ...] (match) or 
      // [] (no match)
      id => this.notes.filter(note => note.id === id)
      // 3. filter out possible empty arrays and get notes
      // [[Note], [], [Note]] -> [[Note], [Note]] -> [Note, Note]
    ).filter(a => a.length).map(a => a[0]);
  }
}

export default alt.createStore(NoteStore, 'NoteStore');