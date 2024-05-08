import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

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
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        
                    </div>
                    <Link className="btn btn-danger w-50 my-2" to={"/banquet/add"}>Добавить продукт</Link>
                    <Link className="btn btn-danger w-50 my-2" to={"/employee/handle"}>|  Одобрить заявку</Link>


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


