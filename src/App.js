import React, { Component } from 'react';
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import PizzaList from './containers/PizzaList/PizzaList';
import './App.css'
import Aux from './hoc/Aux'
class App extends Component {
  render () {
    return (
      <Aux>
        <Toolbar/>
        <PizzaList/>
      </Aux>
    );
  }
}
export default App;
 