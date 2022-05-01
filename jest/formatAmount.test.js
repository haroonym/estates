const { formatAmount } = require('./formatAmount');

test('amount is missing, currency is missing', () => {
  expect(formatAmount()).toBe('');
  expect(formatAmount(3)).toBe('');
});

test('negative Number, currency not a string', () => {
  function negativenumber() {
    formatAmount(-3, 'eur');
  }

  function currencynotastring() {
    formatAmount(2, 3);
  }

  expect(negativenumber).toThrowError(new Error('negative numbers not allowed.'));
  expect(currencynotastring).toThrowError(new Error('currency must be a string.'));
});

test('string length more than 3', () => {
  expect(formatAmount(3, 'euro')).toBe('3.00 EUR');
});

test('everything is correct', () => {
  expect(formatAmount(3, 'eur')).toBe('3.00 EUR');
});