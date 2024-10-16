import React from "react";
import { makeStyles } from "@fluentui/react-components";
const useStyles = makeStyles({
  para: {
    color: "#999999",
    fontSize: "16px",
    marginTop: "0px",
    marginBottom: "0",
    fontWeight: "400",
  },
});
const Paragraph = ({text}) => {
  const styles = useStyles();
  return <p className={styles.para}>{text}</p>;
};

export default Paragraph;
