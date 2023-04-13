function getFormattedAmountWithCurrency(amount, currency = 'USD') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
}

module.exports = {
  getFormattedAmountWithCurrency,
};
