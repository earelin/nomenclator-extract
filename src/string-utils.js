const _ = require('lodash');

function capitalizeWords(string) {
  return string.toLocaleLowerCase()
    .split(' ')
    .map(word => _.capitalize(word))
    .join(' ');
}

function undoCommaSplit(string) {
  if (string.includes(',')) {
    const splitCommaString = string.split(',');

    if (splitCommaString[1].includes('(')) {
      const optionalNamePosition = splitCommaString[1].indexOf('(');
      splitCommaString[0] += " " + splitCommaString[1].slice(optionalNamePosition);
      splitCommaString[1] = splitCommaString[1].slice(0, optionalNamePosition);
    }

    return splitCommaString.reverse()
      .map(part => part.trim())
      .join(" ")
  }

  return string;
}

module.exports = {
  capitalizeWords,
  undoCommaSplit
};
