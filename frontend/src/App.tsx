import * as React from 'react';
import './App.css';

import SensorData from './SensorData';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
       <SensorData />
      </div>
    );
  }
}

export default App;
