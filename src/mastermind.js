const colors = require("./colors");
const hints = require('./hints')
const pickColor = (randomFn) => {
  let randomValue = randomFn();

  randomValue = randomValue - Math.trunc(randomValue);

  if (randomValue < 0.125) {
    return colors.RED;
  } else if (randomValue >= 0.125 && randomValue < 0.25) {
    return colors.GREEN;
  } else if (randomValue >= 0.25 && randomValue < 0.375) {
    return colors.YELLOW;
  } else if (randomValue >= 0.375 && randomValue < 0.5) {
    return colors.BLUE;
  } else if (randomValue >= 0.5 && randomValue < 0.675) {
    return colors.PURPLE;
  } else if (randomValue >= 0.675 && randomValue < 0.75) {
    return colors.ORANGE;
  } else if (randomValue >= 0.75 && randomValue < 0.875) {
    return colors.PINK;
  } else if (randomValue >= 0.875 && randomValue < 1.0) {
    return colors.BROWN;
  }

  throw new Error("Invalid Random Function");
};

const generateCode = (randomFn) => {
  return [1, 2, 3, 4].map((_) => {
    return pickColor(randomFn)
  })
}

const checkCode = (code, guess) => {
  const result = []
  guess.forEach((color, index) => {
    if (color === code[index]) {
      result.push(hints.FITS)
    }
    else if (color === code[0] || color === code[1] || color === code[2] || color === code[3]) {
      result.push(hints.PARTIALLY)
    }
    else {
      result.push(hints.NOT_AT_ALL)
    }
  })
  return result
}

const scrumble = (code, guess, randomFn) => {
  const result = [];

  for (var i = 0; i <= 3; i++) {
    if (code[i] === guess[i]) {
      result.push(hints.FITS)
    } else if (code.indexOf(guess[i]) !== -1) {
      result.push(hints.PARTIALLY)
    } else {
      result.push(hints.NOT_AT_ALL)
    }
    
  }

  for (var i = result.length - 1; i > 0; i--) {
    var random = Math.floor(Math.random() * (i + 1));
    [result[i], result[random]] = [result[random], result[i]]
  }
  return result
}


module.exports = {
  pickColor,
  generateCode,
  checkCode,
  scrumble
};
