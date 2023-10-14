import React, { Component } from 'react'
import '../styles/Homepage.css';

import logo from '../documentations/design/homepage/logo.svg';
import button from '../documentations/design/homepage/button.svg';
import menuicon from '../documentations/design/homepage/menuicon.svg';
import pic from '../documentations/design/homepage/pic.svg';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaName: 'Enter the idea name here',
      isFocused: false
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  setEditableDivRef = (element) => {
    this.editableDiv = element;
  }

  handleInputChange(event) {
    this.setState({
      ideaName: event.target.innerText
    });
  }

  handleInputFocus() {
    this.setState(prevState => ({
      ideaName: prevState.ideaName === 'Enter the idea name here' ? '' : prevState.ideaName,
      isFocused: true
    }), () => {
      const div = this.editableDiv;
      // Ensure the cursor stays at the end when the div gains focus
      const range = document.createRange();
      range.selectNodeContents(div);
      range.collapse(false);  // Collapse the range to the end
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });
  }

  handleInputBlur() {
    if (!this.state.ideaName.trim()) {
      this.setState({
        ideaName: 'Enter the idea name here',
        isFocused: false
      });
    }
  }

  async handleButtonClick() {
    const { ideaName } = this.state;
    const response = await fetch(`http://localhost:3001/whiteboard?boardName=${ideaName}`);
    const data = await response.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <div className='title'>
          <img src={logo} alt="Logo" className='logo' />
          <text className='productName'>FigMAX</text>
          <button className='signUpButton'> Sign Up </button>
          <button className='logInButton'> Log In </button>
          <img src={menuicon} alt="Menu" className='menuicon' />
        </div>
        <div className='contents'>
          <div className='slogan1'>
            better idea <br />collaboration
          </div>
          <div className='slogan2'>
            <br/> Create a whiteboard to share your ideas <br />and work with your friends
          </div>
        </div>
        <div className='buttonArea'>
          <div 
            ref = {this.setEditableDivRef}
            contentEditable="true" 
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
            onInput={this.handleInputChange}
            className='editableDiv'
          >
            {this.state.isFocused || this.state.ideaName !== 'Enter the idea name here' ? '' : this.state.ideaName}
          </div>
          <img 
            src={button} 
            alt='button' 
            classname='button'
            onClick={this.handleButtonClick}/>
        </div>
        <div className='pic'>
          <img src={pic} alt='pic'/> 
        </div>
      </div>
    )
  }
}
