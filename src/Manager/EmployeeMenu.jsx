import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import '../Client/menu.css'

export const EmployeeMenu=()=> {
    
    const [product, setProduct] = useState([]);
    
    useEffect(() => {
      loadProduct();
    }, []);
  
  
    const loadProduct = async () => {
      const result = await axios.get("http://localhost:8081/banquet/get");
      setProduct(result.data);
    }
  
    const deleteProduct = async (id) => {
      await axios.delete(`http://localhost:8081/banquet/delete/${id}`);
      loadProduct();
    }

    const columns = ["Name","Category", "Cost","Action"];
  
    const data = product.map((product, index) => [product.name, product.category, product.cost, <Link key={index} className='btn btn-outline-primary mx-2' to={`/banquet/update/${product.id}`}>Изменить</Link>]);
  
    const options = {
      onRowsDelete: (data) => {deleteProduct(product[data.data[0].dataIndex].id)},
      selectableRows:'multiply'
    };
    return (
        <div className='menu'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                      <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/banquet/add">Добавить продукт</a>
                            </li>
                            <li className='nav-link'>
                                <a className="nav-link" href="/employee/handle"> Одобрить заявку</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/admin/graphmodel">Посмотреть график по менеджерам</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/employee/allcontracts">Посмотреть все контракты</a>
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


