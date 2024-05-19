import React, { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import '../Client/menu.css'

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

const columns = ["Название","Общая Стоимость","Action"];

const data = proposal.map((proposals,index) => [proposals.proposalId.productId.name, proposals.proposalId.totalCost,[<button key={index} className='btn btn-outline-primary mx-2' type='button' onClick={()=>{ approveProposal(proposals.proposalId.id);setProp(prevState=>({...prevState,
  id:localStorage.getItem("id"),
})); }}>Одобрить заявку</button>]]);

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
                            <a className="nav-link" href="/employee">Меню</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/banquet/add"> Добавить банкет</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/admin/graphmodel">Посмотреть график по менеджерам</a>
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
