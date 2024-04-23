import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Registration} from './Auth/Registration';
import { Authorization } from './Auth/Authorization';
import { AddEmployee } from './Admin/AddEmployee';
import { UpdateEmployee } from './Admin/UpdateEmployee';
import { AdminMenu } from './Admin/AdminMenu';
import { EmployeeMenu } from './Manager/EmployeeMenu';
import { AddItem } from './Manager/AddItem';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='reg' element={<Registration/>}/>
          <Route path='auth' element = {<Authorization/>}/>
        </Routes>
        <Routes>
          <Route path = '/admin/add' element = {<AddEmployee/>}/>
          <Route path = '/admin' element = {<AdminMenu/>}/>
          <Route path = '/admin/update/:id' element = {<UpdateEmployee/>}/>
        </Routes>
        <Routes>
          <Route path = '/banquet/add' element = {<AddItem/>}/>
          <Route path = '/employee' element = {<EmployeeMenu/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
