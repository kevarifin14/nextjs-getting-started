import { useState } from 'react';

export default function Create() {
  const [name, setName] = useState();
  const [ticker, setTicker] = useState();
  const [buyOrSell, setBuyOrSell] = useState();

  const fields = [
    {
      label: 'Name',
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      label: 'Ticker',
      value: ticker,
      onChange: (e) => setTicker(e.target.value),
    },
    {
      label: 'buyOrSell',
      value: buyOrSell,
      onChange: (e) => setBuyOrSell(e.target.value),
    },
  ];

  const submit = () => {
    const body = JSON.stringify({
      createList: [{
        fields: {
          'Name': name,
          'Ticker': ticker,
          'Buy or Sell?': buyOrSell,
        }
      }],
    });

    fetch(
      '/api/airtable/create',
      { method: 'POST', body, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return (
    <form onSubmit={submit}>
      {fields.map(({ label, value, onChange }) => (
        <>
          <label>{`${label}: `}</label>
          <input value={value} onChange={onChange} />
        </>
      ))}
      <button type="submit">Create</button>
    </form>
  )
}