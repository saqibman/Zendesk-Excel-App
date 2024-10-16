import React from "react";
import { Select, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  selectFocus: {
    "&:after": {
      backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    },
  },
});

const SelectField = ({ id, name, options, placeholder, className = "", disabled, handleChange, value = "" }) => {
  const styles = useStyles();
  return (
    <>
      <Select
        id={id}
        name={name}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        placeholder={placeholder}
        className={`${className !== "" ? className : ""} ${styles.selectFocus}`}
        disabled={disabled}
        value={value}
        onChange={(e) => handleChange(e)}
      >
        {placeholder && placeholder !== "" ? <option value="">{placeholder}</option> : null}

        {options.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.disable ? <option disabled>{item.name}</option> : <option value={item.id}>{item.name}</option>}
            </React.Fragment>
          );
        })}
      </Select>
    </>
  );
};

export default SelectField;

export const SelectFieldCustom = ({
  id,
  options,
  placeholder,
  className,
  handleSelectChange,
  disabled,
  value = "",
}) => {
  return (
    <>
      <Select
        id={id}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        placeholder={placeholder}
        className={className}
        onChange={(e) => handleSelectChange(e)}
        disabled={disabled}
        value={value}
      >
        {options.map((item) => {
          return item.disable ? (
            <option disabled>{item.name}</option>
          ) : (
            <OptionComp key={item.id} item={item} handleSelectChange={handleSelectChange} />
          );
        })}
      </Select>
    </>
  );
};

const OptionComp = (props) => {
  let hasMoreOptions = props.item.fieldsToDisplay && props.item.fieldsToDisplay.length > 0;
  return (
    <>
      <option value={props.item.id}>
        {props.item.name}
        <span>{!hasMoreOptions ? "+" : ""}</span>
      </option>
    </>
  );
};
