import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Dropdown from 'react-bootstrap/Dropdown';

export const ApprovedProposal = () => {
    const backgroundImage = {
        backgroundImage: `url('https://img.freepik.com/free-vector/wavy-background-with-copy-space_52683-65230.jpg?w=1060&t=st=1683470888~exp=1683471488~hmac=5f886b9474bab136ac2138b9c684fedb5f0987d5ddef6beb1e86d035b4c2fc1c')`,
        backgroundSize: 'cover',
        height: '100vh',
    };
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

    const columns = ["Название","Начало","Конец","Общая Стоимость","Состояние","Action"];

    const data = proposal.map((proposals,index) => [proposals.proposalId.productId.name, proposals.proposalId.deliveryTime, proposals.proposalId.totalCost, proposals.proposalId.approve===true?<p>Одобрена</p>: <p>В обработке</p>,[<button key={index} className='btn btn-outline-primary mx-2' type='button' onClick={()=>{ if(proposals.proposalId.totalCost<cash){bought(proposals.id);  
        setProp(prevState=>({...prevState,
        totalCost:proposals.proposalId.totalCost,
        clientId:{id:proposals.proposalId.clientId.id}
     })); }else{window.confirm("Недостаточно средств")}}}>Оплатить заявку</button>]]);

    const options = {
        onRowsDelete: (data) => { deleteProduct(proposal[data.data[0].dataIndex].proposalId.id) },
        selectableRows: 'single'
    };
    return (
        <div style={backgroundImage}>
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
                                    <Dropdown.Item href="/proposal/history"> История заявок |</Dropdown.Item>
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


