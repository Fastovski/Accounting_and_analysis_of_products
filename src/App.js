import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Registration} from './Auth/Registration';
import { Authorization } from './Auth/Authorization';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='reg' element={<Registration/>}/>
          <Route path='auth' element = {<Authorization/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
