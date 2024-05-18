import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import './Index.css'

export const Index=()=> {
    
    const [product, setProduct] = useState([]);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get("http://localhost:8081/banquet/get");
        setProduct(result.data);
    }

    const columns = ["Name", "Category", "Cost"];
        
        
    const data = product.map((product, index) => [product.name, product.category, product.cost]);

    const options = {
        selectableRowsOnClick: false,
        selectableRowsHideCheckboxes: true
    };

    return (
    <div className="admin-menu">
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <div className="container-fluid">

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/auth">Авторизоваться</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/reg">Зарегестрироваться</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
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
