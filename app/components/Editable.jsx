import React from 'react';

export default class Editable extends React.Component {
  
  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;
    
    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
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
        element.selectionStart = this.props.value.length :
        null
      }
      autofocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  
  renderValue = () => {
    const onDelete = this.props.onDelete;
    
    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };
  
  renderDelete = () => {
    return <button 
      className="delete"
      onClick={this.props.onDelete}>x</button>;
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
      
    }
  };
}