import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import './menu.css'

export const PayedContracts = () => {

    const [proposal, setProposal] = useState([]);
    const [money, setMoney] = useState({});

    const { cash } = money;

    useEffect(() => {
        loadProposal(localStorage.getItem("id"));
        loadMoney(localStorage.getItem("id"));
    }, []);

    const loadMoney = async (id) => {
        const result = await axios.get(`http://localhost:8081/client/getMoney/${id}`);
        setMoney(result.data);
    }

    const loadProposal = async (id) => {
        const result = await axios.get(`http://localhost:8081/contract/get/${id}`);
        setProposal(result.data);
    }

    const columns = ["Название","Время","Общая Стоимость","Дата оформления"];

    const data = proposal.map((proposals) => [proposals.proposalId.productId.name, proposals.proposalId.deliveryTime, proposals.proposalId.totalCost,proposals.conclusion]);

    const options = {
        selectableRowsOnClick:false,
        selectableRowsHideCheckboxes:true
    };
    return (
        <div className='menu'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
  
                            <li className="nav-item">
                                <a className="nav-link" href="/user"> Меню</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/proposal/history">История заявок</a>
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

