import React from 'react';
import Note from './Note.jsx';

export default class App extends React.Component {
  render() {
    const notes = [
      {
        id: '4a068c42-75b2-4ae2-bd0d-284b4abbb8f0',
        task: 'Learn Webpack!'
      },
      {
        id: '4e81fc6e-bfb6-419b-93e5-0242fb6f3f6a',
        task: 'Learn React'
      },
      {
        id: '11bbffc8-5891-4b45-b9ea-5c99aadf870f',
        task: 'Learn Scala'
      }
    ];
    
    return (
      <div>
        <ul>{notes.map(note => 
          <li key={note.id}>{note.task}</li>
          )}</ul>
      </div>
    );
  }
}