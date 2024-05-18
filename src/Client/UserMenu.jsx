import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Dropdown from 'react-bootstrap/Dropdown';

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

    const columns = ["Name", "Category", "Cost", "Action"];
        
        
    const data = product.map((product, index) => [product.name, product.category, product.cost, [<Link key={index} className='btn btn-outline-primary mx-2' to={`/proposal/add/${product.id}`}>Оформить заявку</Link>]]);

    const options = {
        selectableRowsOnClick: false,
        selectableRowsHideCheckboxes: true
    };
    return (
        <div>
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
                                    <Dropdown.Item href="/user/contracts">| Контракты   |</Dropdown.Item>
                                    <Dropdown.Item href="/proposal/history"> История заявок |</Dropdown.Item>
                                    <Dropdown.Item href="/proposal/approved"> Одобренные заявки |</Dropdown.Item>
                                    <Dropdown.Item href="/user/money"> Пополнение баланса |</Dropdown.Item>
                                    <Dropdown.Item href="/map"> Карта |</Dropdown.Item>

                                    <Dropdown.Divider />
                                </Dropdown.Menu>
                            </Dropdown>
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
