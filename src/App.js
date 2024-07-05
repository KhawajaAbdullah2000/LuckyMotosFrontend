// import React, { useState } from 'react';
import Sidebar from './Sidebar.jsx'
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
import my_animation from './car_animation.json';
import Lottie from 'react-lottie';

import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

// Register the zoom plugin globally
Chart.register(zoomPlugin);



function App() {
    const [file, setFile] = useState(null);
    const [periods, setPeriods] = useState(5);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false); 


    //lotti animation options
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: my_animation
    
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePeriodChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setPeriods(value);
        } else {
            setPeriods(''); // Handle NaN by resetting or keeping a minimal valid value
        }
    };

    const handleSubmit = async (event) => {
        setResult('')
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('periods', periods);

        try {
            setLoading(true);
            
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
           // console.log( response.data)
            setLoading(false);
          
        } catch (error) {
            setLoading(false);
            console.error('Error uploading file:', error);
        }
    };

    const yhat1Values = result ? Object.values(result.yhat1).map(value => value.toFixed(2)) : [];
    const dates = result ? Object.values(result.ds).map(date => date.split(" ").slice(0, 4).join(" ")) : [];
    const highlightStartIndex = result ? yhat1Values.length - periods : 0;

    const chartData = {
        labels: result ?Object.values(result.ds).map(date => date.split(" ").slice(1, 4).join(" ")) : [],
        datasets: [
            {
                label: 'Sales Forecast (yhat1)',
                data: result ? Object.values(result.yhat1) : [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                pointBackgroundColor: 'rgb(255, 99, 132)', // Point fill color
                pointBorderColor: 'rgb(255, 99, 132)' ,
                pointRadius: 4, 
               pointHoverRadius: 7, 
            },
            // {
            //     label: 'Actual Sales (y)',
            //     data: result ? Object.values(result.y) : [],
            //     borderColor: 'rgb(54, 162, 235)',
            //     backgroundColor: 'rgba(54, 162, 235, 0.5)', // Semi-transparent blue
            //     tension: 0.1,
            //     pointBackgroundColor: 'rgb(0,0,0)', 
            //     pointBorderColor: '#fff',
            //     pointRadius: 4,
            //     pointHoverRadius: 7,
            //     showLine: false, 
            // }
        ]
    };

    const options = {
        scales: {
            x: {
                display:true,
                title: {
                    display: true,
                    text: 'Dates',
                    color: '#911',
                    
                    font: {
                      family: 'Comic Sans MS',
                      size: 20,
                      weight: 'bold',
                      lineHeight: 1.2,
                    }
                   
                  },
                grid: {
                    color: 'rgba(255, 0, 0, 0.5)', // Light pink grid lines on the x-axis
                    borderColor: 'rgba(255, 0, 0, 0.5)' // Pink border line on the x-axis
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 0, 0, 0.5)', // Light blue grid lines on the y-axis
                    borderColor: 'rgba(255, 0, 0, 0.5)'// Blue border line on the y-axis
                }
            }
        },
        plugins:{
            legend:false,
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true,
                  },
               
                  pinch: {
                    enabled: true
                  },
                  pan:{
                    enabled:true
                  
                  },
                  mode: 'xy',
                },
                pan:{
                    enabled:true
                  
                  },
              }
        },
       
      


    };

  return (
    <div className="">
      <div className="row">
        <div className="col-md-2">
        <Sidebar/>
        </div>
        
        <div className="col-md-10 mt-4">
          <div className="row">
          <div className="col-md-4 mt-2">
          <div className="card shadow-lg">
                        <div className="card-header bg-success text-white fw-bold text-center">Upload and Predict</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="form-group">
                                <div className="form-group">
                                    <label htmlFor="fileUpload">Upload file: </label>
                                    <input type="file" className="form-control-file" id="fileUpload" onChange={handleFileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="periodsInput">Periods (in days): </label>
                                    <input type="number" className="form-control" id="periodsInput" value={periods} onChange={handlePeriodChange} />
                                </div>
                                <button type="submit" className="btn btn-success mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
        </div>

     
        
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
            <Line data={chartData} options={options}  />
            </div>

            <div className="col-md-4">
          
            {loading && <Lottie options={defaultOptions} height={400} width={400}/>}

            {yhat1Values.length<=0 && !loading && (
                <div className='text-center'>

                <h3>Results ..</h3>
                
                </div>
            )}

            {yhat1Values.length > 0 && (
                <div className="scrollable-table">
                    <table className="table table-responsive table-info table-bordered" >
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Forecast</th>
                            </tr>
                        </thead>
                        <tbody>
                        {yhat1Values.map((value, index) => (
                            <tr key={index} className={index >= highlightStartIndex ? 'table-warning' : ''}>

                                <td>{dates[index]}</td>
                                <td>{value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
