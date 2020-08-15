import React, { Component } from "react";
import ReadOnlyInputs from "./components/Inputs/ReadOnlyInputs";
import Bar from "./components/Bar/Bar";

import { getCalculations } from "./calculation/Calculation.js";
import { formatMoney } from "./calculation/Format.js";

import "./assets/style/global.css";
import "./components/Inputs/Inputs.css";
import "materialize-css/dist/css/materialize.min.css";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      bruto: '',
      calculations: {
        baseINSS: 0,
        descontoINSS: 0,
        baseIRRF: 0,
        descontoIRRF: 0,
        salarioLiquido: 0,
        salarioPercentual: 0,
      },
    };
  }

  handleInputChange = (e) => {
    const newBruto = Number(e.target.value);

    this.setState({
      bruto: newBruto,
    });
  };

  componentDidUpdate(_, previousState) {
    const { bruto: oldBruto } = previousState;
    const { bruto: newBruto } = this.state;

    if (oldBruto !== newBruto) {
      const calculations = getCalculations(this.state.bruto);
      this.setState({ calculations });
    }
  }

  render() {
    const { bruto, calculations } = this.state;
    const {
      baseINSS,
      descontoINSS,
      baseIRRF,
      descontoIRRF,
      salarioLiquido,
    } = calculations;

    return (
      <div className="principal-style">
        <h1 className="title">Descontos INSS/ IRRF</h1>
        <hr />

        <div className="inputs">
          <label className="input-total">
            Salário Bruto:
            <input
              autoFocus
              type="number"
              value={bruto}
              onChange={this.handleInputChange}
            />
          </label>

          <ReadOnlyInputs
            label="Base INSS"
            value={formatMoney(baseINSS)}
            color="#e0904a"
          />
          <ReadOnlyInputs
            label="Desconto INSS"
            value={formatMoney(descontoINSS)}
            color="#e0904a"
          />
          <ReadOnlyInputs
            label="Base IRRF"
            value={formatMoney(baseIRRF)}
            color="#d67054"
          />
          <ReadOnlyInputs
            label="Desconto IRRF"
            value={formatMoney(descontoIRRF)}
            color="#d67054"
          />
          <ReadOnlyInputs
            label="Salário Líquido"
            value={formatMoney(salarioLiquido)}
            color="#0ec4a0"
          />

          <Bar value={{ bruto, descontoINSS, descontoIRRF, salarioLiquido }} />
        </div>
      </div>
    );
  }
}
