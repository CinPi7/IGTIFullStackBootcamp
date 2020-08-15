const format = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const formatMoney = (value) => {
  return format.format(value);
};

const formatPercentage = (value) => {
  if (value) {
    return `${value.toFixed(2).replace(".", ".")}%`;
  }
  return "";
};

export { formatMoney, formatPercentage };
