import React, { Component } from 'react';
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import PizzaList from './containers/PizzaList/PizzaList';
import './App.css'
import bgImg from'./assets/images/bgImg.jpg'
class App extends Component {
  render () {
    return (
      <div style={{ backgroundImage: `url(${bgImg})`}}>
        <Toolbar/>
        <PizzaList/>
      </div>
    );
  }
}
export default App;
 