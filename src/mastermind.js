const colors = require("./colors");
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


module.exports = {
  pickColor
};
