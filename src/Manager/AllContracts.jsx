import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import '../Client/menu.css'

export const AllPayedContracts = () => {

    const [proposal, setProposal] = useState([]);

    useEffect(() => {
        loadAllPaidContracts();
    }, []);

    const loadAllPaidContracts = async () => {
        const result = await axios.get(`http://localhost:8081/contract/allPaid`);
        setProposal(result.data);
    }

    const columns = ["Название","Общая Стоимость","Дата оформления"];

    const data = proposal.map((proposals) => [proposals.proposalId.productId.name, proposals.proposalId.totalCost,proposals.conclusion]);

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
                                <a className="nav-link" href="/employee"> Меню</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/banquet/add">Добавить продукт</a>
                            </li>
                            <li className='nav-link'>
                                <a className="nav-link" href="/employee/handle"> Одобрить заявку</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/graphmodel">Посмотреть график по менеджерам</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br/>
            <div className="table-div">
                <MUIDataTable
                    title={"Все оплаченные контракты"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
}
