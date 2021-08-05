import './App.css';
import {OrderForm} from './OrderForm.js'

function App() {
  return (
    <div className="App">
      <div className="titleContainer">
        <h1>Hexocean Diner</h1>
      </div>
      <div className="content">
        <OrderForm/>
      </div>
    </div>
  );
}

export default App;
