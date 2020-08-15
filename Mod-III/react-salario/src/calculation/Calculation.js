const round = (value) => {
    return Number(value.toFixed(2));
};

const getDescontoINSS = (baseINSS) => {
    if (baseINSS <= 1045.0) {
      return round(baseINSS * (7.5 / 100));
    } else if (baseINSS <= 2089.6) {
      const primeiroDesconto = round(1045.0 * (7.5 / 100));
      const segundoDesconto = round((baseINSS - 1045.0) * (9 / 100));
  
      return primeiroDesconto + segundoDesconto;
    } else if (baseINSS <= 3134.4) {
      const primeiroDesconto = round(1045.0 * (7.5 / 100));
      const segundoDesconto = round((2089.6 - 1045.0) * (9 / 100));
      const terceiroDesconto = round((baseINSS - 2089.6) * (12 / 100));
  
      return primeiroDesconto + segundoDesconto + terceiroDesconto;
    } else if (baseINSS <= 6101.06) {
      const primeiroDesconto = round(1045.0 * (7.5 / 100));
      const segundoDesconto = round((2089.6 - 1045.0) * (9 / 100));
      const terceiroDesconto = round((3134.4 - 2089.6) * (12 / 100));
      const quartoDesconto = round((baseINSS - 3134.4) * (14 / 100));
  
      return (
        primeiroDesconto + segundoDesconto + terceiroDesconto + quartoDesconto
      );
    } else if (baseINSS > 6101.07) {
      return 713.1;
    }
  };
  
  const getDescontoIRRF = (baseIRRF) => {
    if (baseIRRF <= 1903.98) {
      return 0;
    } else if (baseIRRF <= 2826.65) {
      const primeiroValor = baseIRRF * (7.5 / 100);
      const deducao = primeiroValor - 142.88;
  
      return round(deducao);
    } else if (baseIRRF <= 3751.05) {
      const primeiroValor = baseIRRF * (15 / 100);
      const deducao = primeiroValor - 354.8;
  
      return round(deducao);
    } else if (baseIRRF <= 4664.68) {
      const primeiroValor = baseIRRF * (22.5 / 100);
      const deducao = primeiroValor - 636.13;
  
      return round(deducao);
    } else if (baseIRRF > 4664.69) {
      const primeiroValor = baseIRRF * (27.5 / 100);
      const deducao = primeiroValor - 869.36;
  
      return round(deducao);
    }
  };
  
  const getCalculations = (value) => {
    const baseINSS = value;
    const descontoINSS = getDescontoINSS(baseINSS);
  
    const baseIRRF = baseINSS - descontoINSS;
    const descontoIRRF = getDescontoIRRF(baseIRRF);
  
    const salarioLiquido = value - descontoINSS - descontoIRRF;
  
    return { baseINSS, descontoINSS, baseIRRF, descontoIRRF, salarioLiquido };
  };

  export { getCalculations };