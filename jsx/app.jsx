import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router'

require('./app.less')

const Home = () => <div>Home route</div>

const Submit = () => <div>Submit something.... <input /></div>

export default class App extends Component {
  render () {
    return (
      <div className='app'>
        <header>
          <Link to='/'><h1>Boiler-postgres</h1></Link>
        </header>

        <hr />

        <ul>
          <Link to='/'>Home</Link>
          <Link to='/submit'>Submit</Link>
        </ul>

        <Switch>
          <Route exact key='recent' path='/' component={Home} />
          <Route key='submit' path='/submit' component={Submit} />
        </Switch>

        <hr />

        <footer>
          Footer ⛄
        </footer>
      </div>
    )
  }
}
