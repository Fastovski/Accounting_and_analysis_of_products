import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import './menu.css'

export const HistoryProposal = () => {

    const [history, setHistory] = useState([]);
    const [money,setMoney]=useState({});
  
    const {cash}=money;
  
    useEffect(() => {
      loadHistory(localStorage.getItem("id"));
      loadMoney(localStorage.getItem("id"));
    }, []);
  
    const loadMoney = async (id) => {
      const result = await axios.get(`http://localhost:8081/client/getMoney/${id}`);
      setMoney(result.data);
    }
  
    const loadHistory = async (id) => {
      const result = await axios.get(`http://localhost:8081/history/by/${id}`);
      setHistory(result.data);
    }

    const columns = ["Название","Стоимость","Состояние"];
  
    const data = history.map((histor) => [histor.proposalId.productId.name, histor.proposalId.totalCost, histor.proposalId.approve===true?<p>Одобрена</p>: <p>В обработке</p>]);
  
    const options = {
        selectableRowsOnClick:false,
        selectableRowsHideCheckboxes:true
    };
    return (
        <div className='menu'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid nav-div">
                    <a className="navbar-brand" href="/">Home</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                          <a className="nav-link" href="/user"> Меню </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/user/contracts">Контракты</a>
                        </li>
                        <li className='nav-link'>
                          <a className="nav-link" href="/proposal/approved">Одобренные заявки</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/user/money">Пополнение баланса</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/map">О нас</a>
                        </li>
                        <span className="navbar-text" style={{ color: 'black' }}>
                          Cash:{cash}
                        </span>
                      </ul>
                    </div>
                </div>
            </nav>
            <br/>
      <div className="table-div">
        <MUIDataTable
            data={data}
            columns={columns}
            options={options}
        />
      </div>
        </div>
  )
}
