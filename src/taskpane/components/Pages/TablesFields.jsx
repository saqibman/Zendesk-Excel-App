import React, { useEffect, useState } from "react";
import { Button, makeStyles, Select } from "@fluentui/react-components";
import Header from "../Header";
import { menuOptions } from "../utils/constants";
import SelectField from "../SelectField";
import MultipleSelectFieldNew from "../MultipleSelectFieldNew";
import ChooseColumnModal from "../ChooseColumnModal";
import InputField from "../InputField";
import getDataFromAPI from "../../office-documents";
import { TableFieldStyle } from "../../../style/style";
import ErrorModal from "../ErrorModal";

const useStyles = makeStyles(TableFieldStyle);

const TablesFields = (props) => {
  // const [dropdowns, setDropdowns] = useState([{ id: 1, selectedValue: "" }]);
  const [dropdowns, setDropdowns] = useState([{ id: 1, selectedValue: "Select a field", isDisabled: true }]);
  const [disableButton, setDisableButton] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [chooseColumns, setChooseColumns] = useState([]);
  const [dimensionSelectedValue, setDimensionSelectedValue] = useState("");
  const [fieldsToDisplay, setFieldsToDisplay] = useState([]); // State for fieldsToDisplay
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    dimension: "",
    searchQuery: {},
    selectParams: [],
    direction: "column",
    sheet: "1",
    sheet_column: "A1",
  });

  const styles = useStyles();
  const [errorValidation, setErrorValidation] = useState(null);
  const dimensionOptions = props.excelStore?.dataOptionFields?.dimensionOptions || [];

  const handleDimensionChange = async (e) => {
    const selectedDimension = e.target.value;

    // Clear appended dropdowns when the dimension changes
    setDropdowns([{ id: 1, selectedValue: "" }]);

    // Update the selected dimension
    setDimensionSelectedValue(selectedDimension);

    // Find the selected dimension's fieldsToDisplay
    const selectedDimObj = dimensionOptions.find((dim) => dim.name === selectedDimension);
    if (selectedDimObj) {
      setFieldsToDisplay(selectedDimObj.fieldsToDisplay || []);
    } else {
      setFieldsToDisplay([]); // Reset if no dimension is selected
    }

    const filterDimension = props.excelStore.dataOptionFields.dimensionOptions.filter(
      (dim) => dim.name === selectedDimension
    )[0];
    setHeaderParams([...filterDimension.fieldsToDisplay]);

    const getActiveChooseColumns = filterDimension.choseColumns
      .filter((column) => column.active === true)
      .map(({ name }) => [name]);

    setData((val) => ({
      ...val,
      dimension: selectedDimension,
      searchQuery: {},
      selectParams: getActiveChooseColumns,
    }));

    setChooseColumns(filterDimension.choseColumns || []);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const headerParamsData = await getDataFromAPI(
        {
          dimension: selectedDimension,
          searchQuery: {},
          selectParams: [],
        },
        false
      );

      setRecords(headerParamsData || []);
    } catch (error) {
      console.error("Error fetching headerParams", error);
      setError("Server 500 Error.");
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownChange = (index, value) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index].selectedValue = value;
    setDropdowns(updatedDropdowns);

    const newSelectedValues = updatedDropdowns.map((dropdown) => dropdown.selectedValue).filter((val) => val !== "");
    setSelectedValues(newSelectedValues);
  };
  const handleInputChange = (index, value) => {
    // Update the corresponding InputField's value or state as needed
    // For example, you might want to save it in a local state if you need to use it later
  };

  const addDropdown = () => {
    setDropdowns([...dropdowns, { id: dropdowns.length + 1, selectedValue: "" }]);
  };

  const onSubmit = async () => {
    if (data.dimension === "" || data.dimension === "placeholder") {
      setErrorValidation("Please select dimension first");
      return;
    }

    setDisableButton(true);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await getDataFromAPI(data, true);
    } catch (error) {
      console.error("Error fetching headerParams", error);
      setError("Failed to submit data.");
    } finally {
      setDisableButton(false);
      setLoading(false);
    }
  };

  const getAllSheets = async () => {
    // eslint-disable-next-line no-undef
    await Excel.run(async (context) => {
      const sheets = context.workbook.worksheets;
      sheets.load("items/name,items/position");

      await context.sync();

      const sheetInfo = sheets.items.map((sheet) => ({
        sheetNumber: sheet.name.match(/\d+/) ? parseInt(sheet.name.match(/\d+/)[0]) : null,
        sheetName: sheet.name,
        position: sheet.position,
      }));
      sheetInfo.sort((a, b) => a.position - b.position);
      setSheetData(sheetInfo);
    }).catch((error) => {
      console.error(`Error retrieving sheets:`, error);
    });
  };

  const startPollingForSheetChanges = () => {
    const intervalId = setInterval(() => {
      getAllSheets();
    }, 5000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    getAllSheets();
    const stopPolling = startPollingForSheetChanges();
    return stopPolling;
  }, []);


  
  return (
    <>
      <Header
        text="Tables Fields"
        showMenu={true}
        menuOptions={menuOptions}
        handleMenuClick={(screen) => {
          props.dispatchExcel({ type: "CHANGE_SCREEN", screen: screen, activeTab: "Column" });
        }}
      />
      <div className={styles.container}>
        <form noValidate autoComplete="off" className={styles.form}>
          <div>
            <SelectField
              handleChange={(e) => {
                if (e.target.value === "Pivot Table") {
                  props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Pivot Table", activeTab: "Pivot Table" });
                } else {
                  props.dispatchExcel({ type: "VIEW_UPDATED", view: e.target.value, activeTab: e.target.value });
                  setData((val) => ({ ...val, direction: e.target.value }));
                }
              }}
              id="view-type"
              className={styles.selectWidthLg}
              options={props.excelStore.dataOptionFields.viewType}
              value={props.excelStore.activeTab}
            />
          </div>
          {chooseColumns.length > 0 ? (
            <div>
              <ChooseColumnModal
                excelStore={props.excelStore}
                selectWidthMd={styles.selectWidthMd}
                moreInformationOptions={props.excelStore.dataOptionFields?.moreInformationOptions}
                value={data.dimension}
                headerParams={chooseColumns || []}
                setData={setData}
                data={data}
              />
            </div>
          ) : null}
          <hr className={styles.hr} />
          <div>
            <SelectField
              className={styles.selectWidthLg}
              id="dimensionDropdown"
              name="dimension"
              value={dimensionSelectedValue}
              options={dimensionOptions.map((dim) => ({
                id: dim.name, // Assuming 'name' is the value for options
                name: dim.name, // Assuming 'name' is the label for options
              }))}
              handleChange={handleDimensionChange} // Ensure handleChange is passed
            />
            {errorValidation && <p className={styles.error}>{errorValidation}</p>}
          </div>

          {dimensionSelectedValue && (
            <>
              <div className={styles.fildersSecMain}>
                {dropdowns.map((dropdown, index) => (
                  <div key={dropdown.id} className={styles.fildersSec}>
                    {/* Multiple Select Field for fieldsToDisplay */}
                    <MultipleSelectFieldNew
                      className={styles.selectWidthLg}
                      id={null}
                      name={`dropdown_${index}`}
                      value={dropdown.selectedValue}
                      options={fieldsToDisplay.map((field) => ({
                        value: field.name,
                        label: field.name,
                      }))}
                      placeholder="Select a field"
                      setData={(newDropdown) => handleDropdownChange(index, newDropdown.value)}
                      disabled={dropdown.isDisabled} // Disable if the dropdown's isDisabled is true
                    />
                    <InputField
                      className={styles.selectWidthLg}
                      id={null}
                      type="text"
                      name=""
                      placeholder="Search"
                      value="" // Set the value appropriately if needed
                      handleChange={(e) => handleInputChange(index, e.target.value)} // Pass the change handler
                    />
                    <hr className={styles.hr} />
                  </div>
                ))}

                {/* Add dropdown button */}
                {dropdowns.length < fieldsToDisplay.length && (
                  <span onClick={addDropdown} className={styles.addbutton}>
                    Add Filter
                  </span>
                )}
              </div>
            </>
          )}
          <hr />
          <div>
            <Button className={styles.wideBtn} appearance="primary" disabled={disableButton} onClick={() => onSubmit()}>
              Done
            </Button>
          </div>
          <div>
            <div className={styles.flexWrap}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.arrowIcon}
              >
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
              <h3 className={styles.headingTitle}>Worksheet</h3>
            </div>
          </div>
          <div>
            <div className={styles.flexWrap}>
              <Select
                id="sheet"
                name="sheet"
                onChange={(e) => {
                  setData((val) => ({ ...val, sheet: e.target.value }));
                }}
                value={data.sheet}
              >
                <option value="">Select Sheet</option>
                {sheetData.map((sheet) => (
                  <option key={sheet.sheetNumber} value={sheet.sheetNumber}>
                    {sheet.sheetName}
                  </option>
                ))}
              </Select>
              <InputField
                handleChange={(e) => {
                  setData((val) => ({ ...val, sheet_column: e.target.value }));
                }}
                id="sheet_column"
                type={"text"}
                name={"sheet_column"}
                placeholder={"Column reference e.g. A1"}
                value={data.sheet_column}
              />
            </div>
          </div>
        </form>
      </div>
      {error && <ErrorModal show={!!error} onClose={() => setError(null)} message={error} />}
    </>
  );
};

export default TablesFields;
