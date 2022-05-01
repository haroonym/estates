/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/**
 Diese Funktion formatiert einen Betrag (amount) und eine Währung (currency).

 Der Betrag darf nicht negativ sein und die Währung soll im ISO 4217:2015 Format angeben werden.

 ISO 4217:2015 bedeutet 3 Buchstaben, zb: "EUR", "USD", "CHK" usw.
 Beispiel:
 formatAmount(1, "eur") returns "1.00 EUR".

 Diese Funktion wirft bei falschen Eingaben einen Error.
 */

function formatAmount(amount, currency) {
  if (amount == undefined) {
    return '';
  }
  if (currency == undefined) {
    return '';
  }
  if (parseFloat(amount) < 0) {
    throw new Error('negative numbers not allowed.');
  }
  if (!(typeof currency === 'string')) {
    throw new Error('currency must be a string.');
  }
  if (currency.length != 3) {
    currency = currency.substr(0, 3).padEnd(3, ' ');
  }

  return `${amount.toFixed(2)} ${currency.toUpperCase()}`;
}

module.exports = { formatAmount };
