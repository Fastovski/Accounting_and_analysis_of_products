import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import './menu.css'

export const ApprovedProposal = () => {
    const [proposal, setProposal] = useState([]);
    const [prop,setProp]=useState({});
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
        const result = await axios.get(`http://localhost:8081/contract/getBy/${id}`);
        setProposal(result.data);
    }

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8081/proposal/delete/${id}`);
        loadProposal();
    }
    const bought=async(id)=>{
        await axios.put(`http://localhost:8081/contracts/buy/${id}`,prop);
        loadProposal();
    }

    const columns = ["Название","Общая Стоимость","Состояние","Action"];

    const data = proposal.map((proposals,index) => [proposals.proposalId.productId.name, proposals.proposalId.totalCost, proposals.proposalId.approve===true?<p>Одобрена</p>: <p>В обработке</p>,[<button key={index} className='btn btn-outline-primary mx-2' type='button' onClick={()=>{ if(proposals.proposalId.totalCost<cash){bought(proposals.id);  
        setProp(prevState=>({...prevState,
        totalCost:proposals.proposalId.totalCost,
        clientId:{id:proposals.proposalId.clientId.id}
     })); }else{window.confirm("Недостаточно средств")}}}>Оплатить заявку</button>]]);

    const options = {
        onRowsDelete: (data) => { deleteProduct(proposal[data.data[0].dataIndex].proposalId.id) },
        selectableRows: 'single'
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
                                <a className="nav-link" href="/user/contracts">Контракты</a>
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


