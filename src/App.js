import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Registration} from './Auth/Registration';
import { Authorization } from './Auth/Authorization';
import { AddEmployee } from './Admin/AddEmployee';
import { UpdateEmployee } from './Admin/UpdateEmployee';
import { AdminMenu } from './Admin/AdminMenu';
import { EmployeeMenu } from './Manager/EmployeeMenu';
import { AddItem } from './Manager/AddItem';
import { UserMenu } from './Client/UserMenu';
import { NewProposal } from './Client/NewProposal';
import { UpdateProduct } from './Manager/UpdateProduct';
import { HadlingProposal } from './Manager/HadlingProposal';
import { HistoryProposal } from './Client/HistoryProposal';
import { ApprovedProposal } from './Client/AprovedProposal';
import { PayedContracts } from './Client/PayedContracts';
import Money from './Client/Money';

import './App.css';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='reg' element={<Registration/>}/>
          <Route path='auth' element = {<Authorization/>}/>

          <Route path = '/admin/add' element = {<AddEmployee/>}/>
          <Route path = '/admin' element = {<AdminMenu/>}/>
          <Route path = '/admin/update/:id' element = {<UpdateEmployee/>}/>

          <Route path = '/banquet/add' element = {<AddItem/>}/>
          <Route path = '/employee' element = {<EmployeeMenu/>}/>
          <Route path = '/banquet/update/:id' element = {<UpdateProduct/>}/>
          <Route path = '/employee/handle' element={<HadlingProposal/>}/>

          <Route path="/user" element={<UserMenu/>}/>
          <Route path="/proposal/add/:id" element={<NewProposal/>}/>
          <Route path="/proposal/history" element={<HistoryProposal/>}/>
          <Route path="/proposal/approved" element={<ApprovedProposal/>}/>
          <Route path="/user/contracts" element={<PayedContracts/>}/>
          <Route path="/user/money" element={<Money/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
