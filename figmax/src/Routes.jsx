import React, { Component } from 'react'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Home = () => (
    <div>
      <Homepage />
    </div>
)

const Routes = () => (
  <Router>
    <div className='outer-container'>
     <main id='page-wrap'>
     <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
      </main>
    </div>
  </Router>
)

export default Routes