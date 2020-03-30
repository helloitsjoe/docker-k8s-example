import React from 'react';
import { fetchData } from './services';

const NEG_2 = -2;
const NEG_1 = -1;
const NEUTRAL = 0;
const POS_1 = 1;
const POS_2 = 2;

const analyzePolarity = polarity => {
  if (polarity < -0.5) {
    return NEG_2;
  }
  if (polarity < 0) {
    return NEG_1;
  }
  if (polarity === 0) {
    return NEUTRAL;
  }
  // It looks like polarity only goes up to 0.625
  // So set threshold at 0.3125
  if (polarity > 0.3125) {
    return POS_2;
  }
  if (polarity > 0) {
    return POS_1;
  }
};

const emotionMap = {
  [NEG_2]: { message: 'You are VERY unhappy about that!', emoji: 'D:' },
  [NEG_1]: { message: 'You are slightly unhappy.', emoji: ':(' },
  [NEUTRAL]: { message: 'You are EXTREMELY neutral.', emoji: ':|' },
  [POS_1]: { message: 'You are slightly happy.', emoji: ':)' },
  [POS_2]: { message: 'You are VERY happy about that!', emoji: ':D' },
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
        setError('');
        setLoading(false);
        console.log(`res.data:`, res.data);
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        setData(null);

        let { message } = err;

        if (err.message.match(/failed to fetch/i)) {
          message += '... Do you have Docker containers running?';
        }

        setError(`Error: ${message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a sentence and I will analyze it!</h2>
      <input onChange={e => setValue(e.target.value)} value={value} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading &&
        data &&
        (() => {
          const emotion = analyzePolarity(data.polarity);
          const { message, emoji } = emotionMap[emotion];
          return (
            <pre>
              <h2>{emoji}</h2>
              <p>{message}</p>
            </pre>
          );
        })()}
    </form>
  );
};

export default App;
