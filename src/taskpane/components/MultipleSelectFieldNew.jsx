import React, { useState } from "react";
import { makeStyles } from "@fluentui/react-components";
import Select from "react-select";

const useStyles = makeStyles({
  selectFocus: {
    "&:after": {
      backgroundImage: "linear-gradient(0deg, #107c10 0%, #107c10 50%, transparent 50%, transparent 100%)",
    },
  },
});

const MultipleSelectFieldNew = ({ id, name, options, placeholder, className = "", disabled, setData, value = "" }) => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = useState(value);

  // Handle changes in selected option
  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption, options, "selectedOption");
    setSelectedValue(selectedOption);

    // Update the state using setData
    setData((val) => ({
      ...val,
      searchQuery: {
        ...val.searchQuery,
        [name]: selectedOption, // Set the selected option for this field
      },
    }));
  };

  const customStyles = {
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div>
      <Select
        id={id}
        name={name}
        closeMenuOnSelect={true} // Close menu after selecting a single option
        options={options} // Ensure options are passed correctly
        styles={customStyles}
        placeholder={placeholder}
        className={`${className} ${styles.selectFocus}`}
        value={selectedValue} // Use selectedValue to display selected option
        onChange={handleSelectChange} // Use handleSelectChange to update state
        isDisabled={disabled} // Optional: disable the dropdown if necessary
        isMulti={false} // Ensure multi-select is turned off
      />
    </div>
  );
};

export default MultipleSelectFieldNew;
