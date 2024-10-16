import React, { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import makeAnimated from 'react-select/animated';
import Select from "react-select";

const animatedComponents = makeAnimated();

const useStyles = makeStyles({
  selectFocus: {
    "&:after": {
      backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    },
  },
});

const MultipleSelectField = ({ id, name, options, placeholder, className = "", disabled, setData, value = [] }) => {

  const styles = useStyles();
  const [selectedValues, setSelectedValues] = useState(value);

  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions, options, "selectedOptions");
    // const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    // setSelectedValues(selectedValues);
    handleChange(selectedValues);
  };

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div>
      {/* <Select
        isMulti
        id={id}
        name={name}
        menuPortalTarget={document.body}
        styles={customStyles}
        placeholder={placeholder}
        className={`${className} ${styles.selectFocus}`}
        isDisabled={disabled}
        value={value}
        onChange={(e) => {
          setData((val) => ({
            ...val,
            searchQuery: {
              ...val.searchQuery,
              [name]: e,
            },
          }));
        }}
        options={options.map((option) => {
          return {
            value: name,
            label: option.name,
          };
        })}
      /> */}

    <Select
      id={id}
      name={name}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      className={`${className} ${styles.selectFocus}`}
      value={value}
      onChange={(e) => {
        setData((val) => ({
          ...val,
          searchQuery: {
            ...val.searchQuery,
            [name]: e,
          },
        }));
      }}
    />

    </div>
  );
};

export default MultipleSelectField;

export const MultipleSelectFieldDynamic = ({ id, name, options, isMulti = true,  placeholder, className = "", disabled, onHandleChange, value = [] }) => {

  const styles = useStyles();
  const [selectedValues, setSelectedValues] = useState(value);

  const handleSelectChange = (selectedOptions) => {
    console.log(selectedOptions, options, "selectedOptions");
    // const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    // setSelectedValues(selectedValues);
    handleChange(selectedValues);
  };

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div>
      {/* <Select
        isMulti
        id={id}
        name={name}
        menuPortalTarget={document.body}
        styles={customStyles}
        placeholder={placeholder}
        className={`${className} ${styles.selectFocus}`}
        isDisabled={disabled}
        value={value}
        onChange={(e) => onHandleChange(e, name)}
        options={options}
      /> */}

    <Select
      id={id}
      name={name}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={isMulti}
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      className={`${className} ${styles.selectFocus}`}
      value={value}
      onChange={(e) => onHandleChange(e, name)}
    />

    </div>
  );
};
