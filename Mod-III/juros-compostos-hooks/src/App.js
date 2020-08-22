import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Terms from './components/Terms';

export default function App() {

  const [capital, setCapital] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [time, setTime] = useState(0);
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const newTerms = [];

    for (let i = 1; i <= time; i++) {
      let total = (capital * (((interestRate / 100) + 1) ** i)).toFixed(2);
      let percentage = (Math.pow(1 + interestRate / 100, i) - 1) * 100 ;

      newTerms.push({
        id: i,
        total,
        interest: total - capital,
        percentage,
      });
    }

    setTerms(newTerms);
  }, [capital, interestRate, time]);

  const onChanges = (newCapital, newInterestRate, newTime) => {
    if (newCapital !== null) {
      setCapital(newCapital);
      return;
    }

    if (newInterestRate !== null) {
      setInterestRate(newInterestRate);
      return;
    }

    if (newTime !== null) {
      setTime(newTime)
    }
  }

  return (
    <div className="container">
      <h1 className="center">Compound Interest</h1>
      <Form onChanges={onChanges} data={{ capital, interestRate, time }} />
      <Terms data={terms} />
    </div>
  );
}
