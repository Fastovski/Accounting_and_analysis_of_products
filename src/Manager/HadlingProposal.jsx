import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Dropdown from 'react-bootstrap/Dropdown';

export const HadlingProposal = () => {

const [proposal, setProposal] = useState([]);
const [prop,setProp]=useState({});


useEffect(() => {
    loadProposal(localStorage.getItem("id"));
}, []);


const loadProposal = async (id) => {
    const result = await axios.get("http://localhost:8081/contract/all");
    setProposal(result.data);
}

const approveProposal=async(id)=>{
    await axios.put(`http://localhost:8081/proposal/approve/${id}`,prop);
    loadProposal();
}

const columns = ["Название","Время","Общая Стоимость","Action"];

const data = proposal.map((proposals,index) => [proposals.proposalId.productId.name, proposals.proposalId.deliveryTime, proposals.proposalId.totalCost,[<button key={index} className='btn btn-outline-primary mx-2' type='button' onClick={()=>{ approveProposal(proposals.proposalId.id);setProp(prevState=>({...prevState,
  id:localStorage.getItem("id"),
})); }}>Одобрить заявку</button>]]);

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
                                    <Dropdown.Item href="/employee">| Меню |</Dropdown.Item>
                                    <Dropdown.Item href="/banquet/add"> Добавить банкет |</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
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
