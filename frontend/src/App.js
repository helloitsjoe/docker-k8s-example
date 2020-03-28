import React from 'react';

const wait = () => new Promise(resolve => setTimeout(resolve, 200));

const fetchData = value => {
  return wait().then(() =>
    fetch(`http://localhost:5000?name=${value}`, { method: 'GET' }).then(res => res.json())
  );
};

const App = () => {
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [value, setValue] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    fetchData(value)
      .then(res => {
        setLoading(false);
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Enter name" onChange={e => setValue(e.target.value)} value={value} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && data && <pre>{data}</pre>}
    </form>
  );
};

export default App;
