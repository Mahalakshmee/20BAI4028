import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState(['']);
  const [result, setResult] = useState([]);

  const handleChange = (index, event) => {
    const newUrls = [...urls];
    newUrls[index] = event.target.value;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const handleFindNumbers = async () => {
    try {
      const responses = await Promise.all(
        urls.map((url) => axios.get(url))
      );

      const mergedNumbers = responses.reduce((acc, response) => {
        return acc.concat(response.data.numbers);
      }, []);

      const uniqueNumbers = [...new Set(mergedNumbers)].sort((a, b) => a - b);

      setResult(uniqueNumbers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            value={url}
            onChange={(event) => handleChange(index, event)}
          />
          <button onClick={() => handleRemoveUrl(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddUrl}>Add URL</button>
      <button onClick={handleFindNumbers}>Find Numbers</button>
      <h2>Result:</h2>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
}

export default App;
