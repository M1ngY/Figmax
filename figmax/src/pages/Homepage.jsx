import React, { Component } from 'react'
import '../styles/Homepage.css';

import logo from '../documentations/design/homepage/logo.svg';
import button from '../documentations/design/homepage/button.svg';
import menuicon from '../documentations/design/homepage/menuicon.svg';
import pic from '../documentations/design/homepage/pic.svg';

export default class Homepage extends Component {
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
          Enter the idea name here &nbsp;&nbsp;<img src={button} alt='button' classname='button'/>
        </div>
        <div className='pic'>
          <img src={pic} alt='pic'/> 
        </div>
      </div>
    )
  }
}