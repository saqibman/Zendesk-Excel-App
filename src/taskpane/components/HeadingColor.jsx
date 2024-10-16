import React from "react";
import { makeStyles } from "@fluentui/react-components";
const useStyles = makeStyles({
  heading: {
    color: "#242424",
    fontSize: "40px",
    lineHeight: "46px",
    marginTop: "0",
    marginBottom: "15px",
    fontWeight: "700",
  },
  coloredHeading: {
    color: "#107C10",
  },
});
const HeadingColor = ({ coloredText, SimpleText }) => {
  const styles = useStyles();

  return (
    <h3 className={styles.heading}>
      {" "}
      <span className={styles.coloredHeading}>{coloredText}</span> {SimpleText}
    </h3>
  );
};

export default HeadingColor;
