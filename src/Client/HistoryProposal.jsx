import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Dropdown from 'react-bootstrap/Dropdown';

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

    const columns = ["Название","Время","Стоимость","Состояние"];
  
    const data = history.map((histor) => [histor.proposalId.productId.name, histor.proposalId.deliveryTime, histor.proposalId.totalCost, histor.proposalId.approve===true?<p>Одобрена</p>: <p>В обработке</p>]);
  
    const options = {
        selectableRowsOnClick:false,
        selectableRowsHideCheckboxes:true
    };
    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <Dropdown>
                                <Dropdown.Toggle variant="nav-item" id="dropdown-basic">
                                    Операции
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/user">| Меню |</Dropdown.Item>
                                    <Dropdown.Item href="/user/contracts"> Контракты |</Dropdown.Item>
                                    <Dropdown.Item href="/proposal/approved"> Одобренные заявки |</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Users</a>
                            </li> */}
                            <span className="navbar-text" style={{ color: 'black' }}>
                                Cash:{cash}
                            </span>
                        </ul>
                    </div>
                </div>
            </nav>
            <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />

        </div>
  )
}
