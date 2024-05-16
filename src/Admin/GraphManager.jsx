import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

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

  //как обрабатывать данные для построения графика
  useEffect(() => {
    if (employeeData.length > 0) {
        const employeeOperationData = {};
        employeeData.forEach(entry => {
            if (!employeeOperationData[entry.name]) {
                employeeOperationData[entry.name] = {};
            }
            if (!employeeOperationData[entry.name][entry.operation]) {
                employeeOperationData[entry.name][entry.operation] = 0;
            }
            employeeOperationData[entry.name][entry.operation]++;
        });

        const labels = Object.keys(employeeOperationData);
        const datasets = Object.keys(employeeOperationData[labels[0]]).map(operation => ({
            label: operation,
            data: labels.map(name => employeeOperationData[name][operation] || 0)
        }));

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
                }
            }
            
        });
    }
}, [employeeData]);

  return (
      <div>
          <canvas id="employeeChart" width="800" height="400"></canvas>
      </div>
  );
}

export default GraphModel;
