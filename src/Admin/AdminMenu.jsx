import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Dropdown from 'react-bootstrap/Dropdown';
import './AdminMenu.css'

export const AdminMenu = () => {
    
  const [employee, setEmployee] = useState([]);


  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const result = await axios.get("http://localhost:8081/employee/all");
    setEmployee(result.data);
  }

  const deleteBanquet = async (id) => {
    await axios.delete(`http://localhost:8081/employee/delete/${id}`);
    loadEmployee();
  }
  const columns = ["Name","Login","Operation","Action"];

  const data = employee.map((user, index) => [user.userId.name, user.userId.email, user.operation, <Link key={index} className='btn btn-outline-primary mx-2' to={`/admin/update/${user.userId.id}`}>Изменить</Link>]);

  const options = {
    onRowsDelete: (data) => {deleteBanquet(employee[data.data[0].dataIndex].userId.id)},
    selectableRows:'multiple'
  };

  return (
    <div className="admin-menu">
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
          <div className="container-fluid nav-div">
              <a className="navbar-brand" href="/">Home</a>
              {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button> */}
              <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav me-auto">
                      <li className="nav-item">
                          <a className="nav-link" href="/admin/add">Добавить работника</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" href="/admin/graphmodel">График отчетности</a>
                      </li>
                      <li>
                          <a className="nav-link" href="/admin/aboutusupdate">Изменить информацию о компании</a>
                      </li>
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

  // return (
  //       <div>
  //         <nav className="navbar navbar-expand-lg navbar-light bg-light ">
  //             <div className="container-fluid">
  //                 <a className="navbar-brand" href="/">Home</a>
  //                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  //                     <span className="navbar-toggler-icon"></span>
  //                 </button>
  //                 <div className="collapse navbar-collapse" id="navbarNav">
  //                     <ul className="navbar-nav me-auto">
  //                         <Dropdown>
  //                             <Dropdown.Toggle variant="nav-item" id="dropdown-basic" placeholder='center'>
  //                                 Операции
  //                             </Dropdown.Toggle>

  //                             <Dropdown.Menu>
  //                                 <Dropdown.Item style={{screenLeft: '20px'}} href="/admin/add">Добавить работника  |  </Dropdown.Item>
  //                                 <Dropdown.Item style={{screenLeft: '20px'}} href="/admin/graphmodel">График отчетности  |  </Dropdown.Item>

  //                                 {/* <Dropdown.Item href="/admin/chart">График отчетности менеджеров</Dropdown.Item>  */}

  //                             </Dropdown.Menu>
  //                         </Dropdown>
  //                     </ul>
  //                 </div>
  //             </div>
  //         </nav>
  //         <br/>
  //         <MUIDataTable
  //     data={data}
  //     columns={columns}
  //     options={options}
  //   />
  //   </div>
  // )



// import React, { useEffect, useState } from 'react';
// //import { Formik, Field, Form, ErrorMessage } from 'formik';
// //import * as Yup from 'yup';
// import { useNavigate, Link } from 'react-router-dom';
// import {useTable} from 'react-table';
// import axios from 'axios';

// export const AdminMenu = () => {

//     let navigate = useNavigate();
//     const [data, setEmployee] = useState([]);

//     const EmployeeTable = () => {
        

//         useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const result = await axios.get('http://localhost:8081/employee/all');
//                     setEmployee(result.data);
//                 } catch (error) {
//                     console.error("Ошибка при выполнении запроса: ", error);
//                 }
//             };
//             fetchData();
//         }, []);        
        
//         const columns = React.useMemo(
//             () => [
//                 {
//                     Header: 'ID',
//                     accessor: 'id',
//                 },
//                 {
//                     Header: 'Name',
//                     accessor: 'userId.name',
//                 },
//                 {
//                     Header: 'Email',
//                     accessor: 'userId.email',
//                 },
//                 {
//                     Header: 'Operation',
//                     accessor: 'operation',
//                 },
//                 {
//                     Header: 'Actions',
//                     accessor: 'userId.id',
//                     Cell: ({ value }) => (
//                         <Link className='btn btn-outline-primary mx-2' to={`/admin/update/${value}`}>Изменить</Link>
//                     ),
//                 },
//             ],
//             []
//         );
            
    
//         const {
//             getTableProps,
//             getTableBodyProps,
//             headerGroups,
//             rows,
//             prepareRow,
//         } = useTable({ columns, data });
    
//         return (
//             <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
//                 <thead>
//                     {headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map(column => (
//                                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {rows.map(row => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()}>
//                                 {row.cells.map(cell => (
//                                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                                 ))}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         );
//     }
//     return <EmployeeTable />;
// }
