import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

export const GraphModel = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const chartRef = useRef(null); // Добавьте эту строку

  useEffect(() => {
      // Запрос данных с сервера
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
          // Обработка данных для построения графика
          const employeeSuccessData = {};
          employeeData.forEach(entry => {
              if (!employeeSuccessData[entry.name]) {
                  employeeSuccessData[entry.name] = {};
              }
              if (!employeeSuccessData[entry.name][entry.operation]) {
                  employeeSuccessData[entry.name][entry.operation] = 0;
              }
              if (entry.success) {
                  employeeSuccessData[entry.name][entry.operation]++;
              }
          });

          const labels = Object.keys(employeeSuccessData);
          const datasets = Object.keys(employeeSuccessData[labels[0]]).map(operation => ({
              label: operation,
              data: labels.map(name => employeeSuccessData[name][operation] || 0)
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
                          beginAtZero: true
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






// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from "axios";

// export const GraphModel = () => {

//     const [chartData, setChartData] = useState([]);

//     const chart = async () => {
//       let employee = [];
//       let operation = [];
  
//       const res = await axios.get('http://localhost:8081/employee/all');
//       for (const dataObj of res.data ){
//           employee.push(dataObj.userId.name);
//           operation.push(dataObj.operation);
//       }
  
//       setChartData({
//           labels: employee,
//           datasets: [
//             {
//               label: 'Количество операций',
//               data: operation,
//               backgroundColor: ['rgba(75, 192, 192, 0.6)'],
//               borderWidth: 4
//             }
//           ]
//         });
//       };
    
//     useEffect(() => {
//       chart();
//     }
//     ,[])

//     return (
//       <div className="App">
//         <h1>Диаграмма операций сотрудников</h1>
//         <div>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               title: { text: 'Количество операций по сотрудникам', display: true },
//               scales: {
//                 yAxes: [
//                   {
//                     ticks: {
//                       autoSkip: true,
//                       beginAtZero: true
//                     },
//                     gridLines: {
//                       display: false
//                     }
//                   }
//                 ],
//                 xAxes: [
//                   {
//                     gridLines: {
//                       display: false
//                     }
//                   }
//                 ]
//               }
//             }}
//           />
//         </div>
//       </div>
//     );
//   };