import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import './Graph.css'


export const GraphModel = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const chartRef = useRef(null);
  
    useEffect(() => {
        fetch('http://localhost:8081/employee/all')
            .then(response => response.json())
            .then(data => {
                setEmployeeData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
  
    useEffect(() => {
      if (employeeData.length > 0) {
          const employeeOperationData = {};
          employeeData.forEach(entry => {
            const name = entry.userId.name;
            if (!employeeOperationData[name]) {
                employeeOperationData[name] = {};
            }
            if (!employeeOperationData[name][entry.operation]) {
                employeeOperationData[name][entry.operation] = 0;
            }
            employeeOperationData[name][entry.operation] += entry.operation; 
        });
        
        
  
          const labels = Object.keys(employeeOperationData);
          const datasets = [];
          labels.forEach(name => {
              Object.keys(employeeOperationData[name]).forEach(operation => {
                  datasets.push({
                      label: `${name} - ${operation}`,
                      data: labels.map(label => label === name ? employeeOperationData[name][operation] : 0)
                  });
              });
          });
  
          const ctx = document.getElementById('employeeChart');
          if (chartRef.current) { 
              chartRef.current.destroy(); 
          }
          chartRef.current = new Chart(ctx, { 
              type: 'bar',
              data: {
                  labels: labels,
                  datasets: datasets
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true,
                          max: 20 
                      }
                  },
                  plugins: {
                      tooltip: {
                          callbacks: {
                              title: function(tooltipItem) {
                                  return labels[tooltipItem[0].dataIndex];
                              }
                          }
                      }
                  }
              }
              
          });
      }
  }, [employeeData]);
  
    return (
        <div className='mback'>
        <div className='chart'> 
            <canvas id="employeeChart" width="1400" height="900"></canvas>
        </div>
        <div className='link'>
            <Link to="/admin">Главная страница админа</Link> {/* Добавьте эту строку */}
        </div>
        </div>
    );
  }
  
export default GraphModel;