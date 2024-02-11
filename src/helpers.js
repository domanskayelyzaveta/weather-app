export const convertTemperature = (value, unit) => {
  if (unit === "celsius") {
    return value;
  } else {
    return Math.round((value * 9) / 5 + 32);
  }
};
