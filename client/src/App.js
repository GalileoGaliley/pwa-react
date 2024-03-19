
import './App.css';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from './store';
import Router from "./Router";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router/>
      </div>
    </Provider>
  );
}

export default App;
