import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    
    // Track 'editing' state
    this.state = {
      editing: false
    };
  }
  
  render() {
    // render the component differently based on state
    if (this.state.editing) {
      return this.renderEdit();
    }
    
    return this.renderNote();
  }
  
  renderEdit = () => {
    // we deal with blur and input handlers here. These 
    // map to DOM events.
    //
    // we also set selection to input end using a callback at a ref.
    // it gets triggered after a component is mounted.
    // 
    // we could also use a string reference (i.e., 'ref="input") and
    // then refer to the element in question later in the code through
    // 'this.refs.input'. we could get the value of the input using
    // 'this.refs.input.value' through the DOM in this case.
    //
    // Refs allow us to access the underlying DOM structure. They 
    // can be useful when you need to move beyond pure React. They
    // also tie your implementaton to the browser, though.
    return <input type="text"
      ref={
        element => element ?
        element.selectionStart = this.props.task.length :
        null
      }
      autofocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  
  renderNote = () => {
    // if user selects a normal note, trigger editing logic.
    
    const onDelete = this.props.onDelete;
    
    return (
      <div onClick={this.edit}>
        <span className="task">{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };
  
  renderDelete = () => {
    return <button 
      className="delete-note"
      onClick={this.props.onDelete}>x</button>;
  };
  
  edit = () => {
    // enter edit mode
    this.setState({
      editing: true
    });
  };
  
  checkEnter = (e) => {
    // if user hits enter, finish up
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  
  finishEdit = (e) => {
    // Note will trigger an optional 'onEdit' callback once
    // it has new value. We will use this to communicate the change to App.
    //
    // A smarter way to deal with default value would be to set it 
    // through defaultProps.
    const value = e.target.value;
    
    if (this.props.onEdit) {
      this.props.onEdit(value);
      
      // exit edit mode
      this.setState({
        editing: false
      });
    }
  };
}