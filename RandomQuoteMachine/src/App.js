import './App.css';
import QuoteComponent from './QuoteComponent.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFire } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="container-fluid bg-danger h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <QuoteComponent />
      </div>
    </div>
  );
}

export default App;
