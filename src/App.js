import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure the CSS is imported

function App() {
    const [file, setFile] = useState(null);
    const [periods, setPeriods] = useState(5);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePeriodChange = (event) => {
        setPeriods(parseInt(event.target.value, 10)); // Ensure it's an integer
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('periods', periods);

        try {
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // Convert the yhat1 object to an array of values
    const yhat1Values = result ? Object.values(result.yhat1).map(value => value.toFixed(2)) : [];
    const dates = result ? Object.values(result.ds).map(date => date.split(" ").slice(0, 4).join(" ")) : [];

    return (
        <div className="container mt-5">

        <h1 className='text-center mb-4'>Sales Forecasting</h1>
            <div className="row">
                <div className="col-md-6 center-content">
                    <div className="card">
                        <div className="card-header">
                            Upload and Predict
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} className="form-group">
                                <div className="form-group">
                                    <label htmlFor="fileUpload">Upload file:</label>
                                    <input type="file" className="form-control-file" id="fileUpload" onChange={handleFileChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="periodsInput">Periods:</label>
                                    <input type="number" className="form-control" id="periodsInput" value={periods} onChange={handlePeriodChange} />
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 full-width-table">
                    {yhat1Values.length > 0 && (
                        <div className="scrollable-table">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Forecast</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yhat1Values.map((value, index) => (
                                        <tr key={index}>
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
    );
}

export default App;
