import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [periods, setPeriods] = useState(5);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePeriodChange = (event) => {
        setPeriods(event.target.value);
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
    const yhat1Values = result ? Object.values(result.yhat1) : [];

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Upload file:
                    <input type="file" onChange={handleFileChange} />
                </label>
                <br />
                <label>
                    Periods:
                    <input type="number" value={periods} onChange={handlePeriodChange} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            {/* Render yhat1 values if result is available */}
            {yhat1Values.length > 0 && (
                <div>
                    <h3>yhat1 Values:</h3>
                    <ul>
                        {yhat1Values.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
