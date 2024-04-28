import React, { useEffect, useState } from 'react';
//import { Formik, Field, Form, ErrorMessage } from 'formik';
//import * as Yup from 'yup';
import {  Link } from 'react-router-dom';
import {useTable} from 'react-table';
import axios from 'axios';

export const UserMenu = () => {

    //let navigate = useNavigate();
    const [data, setProduct] = useState([]);

    const ProductTable = () => {
        

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const result = await axios.get('http://localhost:8081/banquet/get');
                    setProduct(result.data);
                } catch (error) {
                    console.error("Ошибка при выполнении запроса: ", error);
                }
            };
            fetchData();
        }, []);        
        
        const columns = React.useMemo(
            () => [
                {
                    Header: 'ID',
                    accessor: 'id',
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                },
                {   
                    Header: 'Category',
                    accessor: 'category',
                },
                {
                    Header: 'Cost',
                    accessor: 'cost',
                },
                {
                    Header: 'Actions',
                    accessor: 'actionsid',
                    Cell: ({ value }) => (
                        <Link className='btn btn-outline-primary mx-2' to={`/proposal/add/${value}`}>Заказать</Link>
                    ),
                },
            ],
            []
        );
            
    
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({ columns, data });
    
        return (
            <table {...getTableProps()} style={{ width: '100%', margin: '0 auto' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
    return <ProductTable />;
}
