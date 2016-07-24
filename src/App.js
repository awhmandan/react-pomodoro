import React, { Component } from 'react';
import Header from './Header.js';
import Clock from './Clock.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Clock />
      </div>
    );
  }
}

export default App;
