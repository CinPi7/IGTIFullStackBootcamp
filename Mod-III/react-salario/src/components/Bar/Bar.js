import React, { Component } from "react";
import DefaultBar from "./DefaultBar";

import { formatPercentage } from "../../calculation/Format.js";

import css from "./Bar.module.css";

export default class Bar extends Component {
  render() {
    const {
      bruto,
      descontoINSS,
      descontoIRRF,
      salarioLiquido,
    } = this.props.value;

    const percentualINSS = (descontoINSS / bruto) * 100;
    const percentualIRRF = (descontoIRRF / bruto) * 100;
    const percentualLiquido = (salarioLiquido / bruto) * 100;

    return (
      <div className={css.line}>
        <p className={css.inss}>
          {" "}
          Desconto INSS: {formatPercentage(percentualINSS)}{" "}
        </p>
        <p className={css.irrf}>
          {" "}
          Desconto IRRF: {formatPercentage(percentualIRRF)}{" "}
        </p>
        <p className={css.liquido}>
          {" "}
          Salário Líquido: {formatPercentage(percentualLiquido)}{" "}
        </p>

        <div className={css.bar}>
          <DefaultBar value={percentualINSS} color="#e0904a" />
          <DefaultBar value={percentualIRRF} color="#d67054" />
          <DefaultBar value={percentualLiquido} color="#0ec4a0" />
        </div>
      </div>
    );
  }
}
