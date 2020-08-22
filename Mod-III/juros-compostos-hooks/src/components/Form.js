import React from "react";
import Input from "./Input";

export default function Form({ data, onChanges }) {
  const { capital, interestRate, time } = data;

  const onCapitalChange = (value) => {
    onChanges(value, null, null);
  };
  const onRateChange = (value) => {
    onChanges(null, value, null);
  };
  const onTermsChange = (value) => {
    onChanges(null, null, value);
  };

  return (
    <div className="form row">
      <form>
        <Input
          id="capital"
          label="Capital"
          value={capital}
          constraints={{ min: "0", max: "100000", step: "100" }}
          onInputChange={onCapitalChange}
        />
        <Input
          id="interest_rate"
          label="Interest Rate %"
          value={interestRate}
          constraints={{ min: "-12", max: "12", step: "0.1" }}
          onInputChange={onRateChange}
        />
        <Input
          id="time"
          label="Set Time in Months"
          value={time}
          constraints={{ min: "1", max: "36", step: "1" }}
          onInputChange={onTermsChange}
        />
      </form>
    </div>
  );
}
