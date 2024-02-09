import moment from "moment";

export const formatDate = (dateString) => {
  const date = moment(dateString);
  const formattedDate = date.format("ddd, D MMMM, HH:mm");
  return formattedDate;
};

export const convertTemperature = (value, unit) => {
  if (unit === "celsius") {
    return value;
  } else {
    return Math.round((value * 9) / 5 + 32);
  }
};
