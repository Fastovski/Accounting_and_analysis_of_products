import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// export const AdminMenu = () => {

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';

// const DataTable = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await axios.get('http://localhost:8081/employee/all');
//             setData(result.data);
//         };

//         fetchData();
//     }, []);

//     const columns = React.useMemo(
//         () => [
//             {
//                 Header: 'ID',
//                 accessor: 'id',
//             },
//             {
//                 Header: 'Name',
//                 accessor: 'name',
//             },
//             {
//                 Header: 'Email',
//                 accessor: 'email',
//             },
//             // добавьте здесь больше столбцов, если нужно
//         ],
//         []
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow,
//     } = useTable({ columns, data });

//     return (
//         <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
//             <thead>
//                 {headerGroups.map(headerGroup => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                         {headerGroup.headers.map(column => (
//                             <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                         ))}
//                     </tr>
//                 ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//                 {rows.map(row => {
//                     prepareRow(row);
//                     return (
//                         <tr {...row.getRowProps()}>
//                             {row.cells.map(cell => (
//                                 <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                             ))}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// };

// export default DataTable;


//}