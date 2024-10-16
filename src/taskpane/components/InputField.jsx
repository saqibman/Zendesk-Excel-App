import React from "react";
import { Input, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  inputFocus: {
    "&:after": {
      backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    },
  },
  inputWidth: {
    width: "125px !important",
  },
});

const InputField = ({ type, id, name, placeholder, handleChange, className = "", value = "", width }) => {
  const styles = useStyles();
  return (
    <>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`${className} ${styles.inputFocus} ${width ? styles.inputWidth : ""}`}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
};

export default InputField;
