import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

const FormattedDate = ({ dateString }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = moment(dateString);
    const shortDay = date.format("ddd");
    const longMonth = date.format("MMMM");

    return (
      t("shortDays." + shortDay) +
      ", " +
      date.format("D") +
      " " +
      t("longMonths." + longMonth) +
      ", " +
      date.format("HH:mm")
    );
  };

  const styles = {
    fontSize: "18px",
    fontWeight: 300,
    marginBottom: "12px",
  };

  return <span style={styles}>{formatDate(dateString)}</span>;
};

export default FormattedDate;
