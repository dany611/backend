function getFormattedAmountWithCurrency(amount, currency = 'EUR') {
  const formatter = new Intl.NumberFormat('en-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

module.exports = {
  getFormattedAmountWithCurrency,
};
