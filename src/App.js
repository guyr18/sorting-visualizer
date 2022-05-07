import React from 'react';

// Component imports
import AppWrapper from './components/AppWrapper';

// Style imports
import './App.css';

class App extends React.Component
{

  constructor(props)
  {

    super(props);

  }

  render()
  {

    return (
      <div className="App">
          <AppWrapper />
      </div>
    );
  }
}

export default App;
