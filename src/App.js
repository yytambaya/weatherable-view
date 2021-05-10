import logo from './logo.svg';
import './App.css';
import './paramforms';
import ConditionalForm from './paramforms';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Weatherable</p>
      </header>
      <div class="main">
        <div class="info">
          <p>This app checks the weather condition of a city you want to visit</p>
          <p>The temperature, the wind speed and rainfall condition</p>  
        </div> 
        <ConditionalForm/>
      </div> 
    </div>
  );
}

export default App;
