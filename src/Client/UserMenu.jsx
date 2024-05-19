import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import './UserMenu.css'

export const UserMenu=()=> {
    
    const [product, setProduct] = useState([]);

    const [money, setMoney] = useState({});

    const { cash } = money;

    useEffect(() => {
        loadProduct();
        loadMoney(localStorage.getItem("id"));
    }, []);

    const loadMoney = async (id) => {
        const result = await axios.get(`http://localhost:8081/client/getMoney/${id}`);
        setMoney(result.data);
    }

    const loadProduct = async () => {
        const result = await axios.get("http://localhost:8081/banquet/get");
        setProduct(result.data);
    }

    const columns = ["Name", "Category", "Описание", "Cost", "Action"];
        
        
    const data = product.map((product, index) => [product.name, product.category, product.description, product.cost, [<Link key={index} className='btn btn-outline-primary mx-2' to={`/proposal/add/${product.id}`}>Заказать</Link>]]);

    const options = {
        selectableRowsOnClick: false,
        selectableRowsHideCheckboxes: true
    };
    return (
        <div className='usermenu'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid nav-div">
                    <a className="navbar-brand" href="/">Выход из аккаунта</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/user/contracts">Контракты</a>
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
                        </ul>
                    </div>
                </div>
            </nav>
            <br/>
            <div className='table-div'>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
            />
            </div>
            

        </div>
    )
}
