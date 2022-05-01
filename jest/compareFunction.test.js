const { compareEnhanced, NO_TYPEMATCH } = require('./compareFunction');

test('no a or no b', () => {
  expect(compareEnhanced()).toBe('no a');
  expect(compareEnhanced(2)).toBe('no b');
});

test('different Typechecks: number, string, array & object', () => {
  expect(compareEnhanced(2, '3')).toBe(NO_TYPEMATCH);
  expect(compareEnhanced('2', 3)).toBe(NO_TYPEMATCH);
  expect(compareEnhanced([2, 2, 2], '343')).toBe(NO_TYPEMATCH);
  expect(compareEnhanced({ value: 4 }, 3)).toBe(NO_TYPEMATCH);
});

test('a < b, a > b, a = b as numbers', () => {
  expect(compareEnhanced(2, 2)).toBe('=');
  expect(compareEnhanced(5, 2)).toBe('>');
  expect(compareEnhanced(2, 5)).toBe('<');
});

test('a < b, a > b, a = b as strings', () => {
  expect(compareEnhanced('2', '2')).toBe('=');
  expect(compareEnhanced('5', '2')).toBe('>');
  expect(compareEnhanced('2', '5')).toBe('<');
});

test('a < b, a > b, a = b as arrays', () => {
  expect(compareEnhanced([1, 2, 3, 4, 5], [6, 7, 8, 9, 5])).toBe('=');
  expect(compareEnhanced([1, 2, 3, 4, 5], [1, 2])).toBe('>');
  expect(compareEnhanced([1, 2, 3], [1, 2, 3, 4, 5])).toBe('<');
});

test('a < b, a > b, a = b as objects', () => {
  expect(compareEnhanced({ value: 4 }, { value: 4 })).toBe('=');
  expect(compareEnhanced({ value: 7 }, { value: 4 })).toBe('>');
  expect(compareEnhanced({ value: 4 }, { value: 8 })).toBe('<');
});

test('a < b, a > b, a = b as functions', () => {
  expect(
    compareEnhanced(
      () => 2,
      () => 2,
    ),
  ).toBe('=');
  expect(
    compareEnhanced(
      () => 5,
      () => 2,
    ),
  ).toBe('>');
  expect(
    compareEnhanced(
      () => 2,
      () => 5,
    ),
  ).toBe('<');
});
