import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

export const GraphModel = () => {

    const [chartData, setChartData] = useState([]);

    const chart = async () => {
        let employee = [];
        let operation = [];
    

    const res = await axios.get('http://localhost:8081/employee/all');
    for (const dataObj of res.data ){
        employee.push(dataObj.userId.name);
        employee.push(parseInt(dataObj.operation));
    }

    setChartData({
        labels: employee,
        datasets: [
          {
            label: 'Количество операций',
            data: operation,
            backgroundColor: ['rgba(75, 192, 192, 0.6)'],
            borderWidth: 4
          }
        ]
      });
    };
    
    useEffect(() => {
      chart();
    }
    ,[])
}