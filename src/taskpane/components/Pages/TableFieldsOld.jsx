import React, { useEffect, useState } from "react";
import { Button, makeStyles, Select } from "@fluentui/react-components";
import InputField from "../InputField";
import Header from "../Header";
import SelectField from "../SelectField";
import MultipleSelectField from "../MultipleSelectField";
import Modal from "../Modal";
import ChooseColumnModal from "../ChooseColumnModal";
import axios from "axios";
import getDataFromAPI from "../../office-documents";
import { Spinner } from "@fluentui/react-spinner";
import { TableFieldStyle } from "../../../style/style";
import { menuOptions } from "../utils/constants";
import ErrorModal from "../ErrorModal";

const useStyles = makeStyles(TableFieldStyle);

const TablesFields = (props) => {
  const styles = useStyles();
  const [disableButton, setDisableButton] = useState(false);
  const [subsidiaries, setSubsidiaries] = useState([]);
  const [headerParams, setHeaderParams] = useState([]);
  const [records, setRecords] = useState([]);
  const [chooseColumns, setChooseColumns] = useState([]);
  const [sheetData, setSheetData] = useState([]);
  const [currentColumn, setCurrentColumn] = useState("");
  const [currentCellValue, setCurrentCellValue] = useState("");
  const [currentCellAddress, setCurrentCellAddress] = useState("");
  const [data, setData] = useState({
    dimension: "",
    searchQuery: {},
    selectParams: [],
    direction: "column",
    sheet: "1",
    sheet_column: "A1",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorValidation, setErrorValidation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const url = process.env.BACKEND_END_POINT;

  const url = "example.com";

  useEffect(() => {}, [records]);

  const getSubsidiaries = () => {
    if (!localStorage.getItem("subsidiaries")) {
      axios
        .post(`${url}/netsuite/subsidiary`)
        .then((res) => {
          const subsidiariesFormat = res.data.data.map(function (subsidiary) {
            return {
              label: subsidiary.name,
              value: subsidiary.id,
            };
          });

          localStorage.setItem("subsidiaries", JSON.stringify([...subsidiariesFormat]));

          setSubsidiaries([...subsidiariesFormat]);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch subsidiaries.");
        });
    } else {
      setSubsidiaries(JSON.parse(localStorage.getItem("subsidiaries")));
    }
  };

  useEffect(() => {
    getSubsidiaries();
  }, []);

  const handleChangeDimension = async (e) => {
    const { value } = e.target;

    if (value === "placeholder") return;

    setLoading(true);

    const filterDimension = props.excelStore.dataOptionFields.dimensionOptions.filter((dim) => dim.name === value)[0];

    setHeaderParams([...filterDimension.fieldsToDisplay]);
    const getActiveChooseColumns = filterDimension.choseColumns
      .filter((column) => column.active === true)
      .map(({ name }) => [name]);

    setData((val) => ({
      ...val,
      dimension: value,
      searchQuery: {},
      selectParams: getActiveChooseColumns,
    }));
    setChooseColumns(filterDimension.choseColumns || []);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const headerParamsData = await getDataFromAPI(
        {
          dimension: value,
          searchQuery: {},
          selectParams: [],
        },
        false
      );

      setRecords(headerParamsData || []);
    } catch (error) {
      console.error("Error fetch headerParams", error);
      setError("Server 500 Error.");
    } finally {
      setLoading(false);
    }
  };

  const onHandleChange = (e) => {
    setData((val) => ({
      ...val,
      searchQuery: {
        ...val.searchQuery,
        [e[0].value]: e,
      },
      direction: props.excelStore.selectedView ? props.excelStore.selectedView : "column",
    }));
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

  const getCurrentCellColumn = async () => {
    // eslint-disable-next-line no-undef
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const cell = context.workbook.getActiveCell();
      cell.load("address");

      await context.sync();

      const address = cell.address.split("!")[1];
      const column = address.match(/[A-Z]+/)[0];
      setCurrentCellAddress(address);
    });
  };

  const getCurrentCellValue = async () => {
    // eslint-disable-next-line no-undef
    await Excel.run(async (context) => {
      const cell = context.workbook.getActiveCell();
      cell.load("values");

      await context.sync();

      const value = cell.values[0][0];
      setCurrentCellValue(value);
    });
  };

  const addCellChangedEventListener = async () => {
    // eslint-disable-next-line no-undef
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = sheet.getRange("A1:XFD1048576");
      range.onChanged.add(async (event) => {
        await getCurrentCellColumn();
        await getCurrentCellValue();
      });
    });
  };

  useEffect(() => {
    getAllSheets();
    const stopPolling = startPollingForSheetChanges();
    getCurrentCellColumn();
    getCurrentCellValue();
    addCellChangedEventListener();

    return stopPolling;
  }, []);

  const handleModalClose = (name, cellValue) => {
    setIsModalOpen(false);

    const updatedSearchQuery = { ...data.searchQuery };
    const param = headerParams.find((param) => param.name === name);

    if (!param) {
      console.error(`Parameter with name ${name} not found`);
      return;
    }

    const filterRecords = filterHeaderRecords(param);

    const cellValueString = String(cellValue);

    const matchingRecord = filterRecords.find((record) => record.value === cellValueString);

    if (matchingRecord) {
      updatedSearchQuery[name] = updatedSearchQuery[name] || [];
      if (!updatedSearchQuery[name].some((record) => record.value === matchingRecord.value)) {
        updatedSearchQuery[name].push(matchingRecord);
      }
    } else {
      console.warn(`Cell value ${cellValueString} not found in filterRecords`);
    }

    setData((val) => ({
      ...val,
      searchQuery: updatedSearchQuery,
    }));
  };

  const filterHeaderRecords = (param) => {
    let filterRecords = [];
    if (param.id === "isinactive" || param.id === "budgettype") {
      filterRecords = [
        {
          value: "T",
          label: "T",
        },
        {
          value: "F",
          label: "F",
        },
      ];
    } else if (param.id === "subsidiary") {
      filterRecords = subsidiaries;
    } else {
      filterRecords = records
        .map((record) => {
          return {
            value: record[param.id],
            label: record[param.id],
          };
        })
        .filter((record) => record.label && record.label.trim() !== "")
        .reduce((acc, current) => {
          if (!acc.find((record) => record.label === current.label)) {
            acc.push(current);
          }
          return acc;
        }, []);
    }

    return filterRecords;
  };

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
              handleChange={(e) => {
                handleChangeDimension(e);
                props.dispatchExcel({
                  type: "DIMENSION_UPDATED",
                  selectedDimension: e.target.value,
                  fieldsToDisplay: props.excelStore.dataOptionFields.dimensionOptions.filter(
                    (dim) => dim.name == e.target.value
                  )[0]?.fieldsToDisplay,
                });
              }}
              id="dimension"
              name="dimension"
              options={props.excelStore.dataOptionFields.dimensionOptions}
              value={data.dimension}
            />
            {errorValidation && <p className={styles.error}>{errorValidation}</p>}
          </div>
          {loading ? ( // Render loader if loading state is true
            <div className={styles.loader}>
              <Spinner />
            </div>
          ) : (
            <>
              {headerParams.length > 0 ? (
                <>
                  <hr className={styles.hr} />
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
                      <h3 className={styles.headingTitle}>Header Parameter</h3>
                    </div>
                  </div>
                  <div>
                    {headerParams.map((param, index) => {
                      const filterRecords = filterHeaderRecords(param);
                      // check records key in param object key matach and return complete array of param

                      return (
                        <div key={index}>
                          <div className={styles.flexWrap}>
                            <MultipleSelectField
                              className={styles.selectWidthMd}
                              id={param.id}
                              name={param.name}
                              placeholder={param.placeholder}
                              setData={setData}
                              value={data.searchQuery[param.name] || []}
                              options={filterRecords}
                            />
                            <div className={styles.mx}>
                              <Modal
                                id={param.id}
                                name={param.name}
                                records={filterRecords}
                                handleChange={onHandleChange}
                                placeholder={param.placeholder}
                                value={currentCellValue || data.searchQuery[param.name] || ""}
                                currentCellAddress={currentCellAddress}
                                currentCellValue={currentCellValue}
                                onModalClose={handleModalClose} // Pass the handleModalClose function
                              />
                            </div>
                            <div className={styles.icon}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bdbdbd">
                                <path d="M19 8H5V10H19V8ZM19 14H5V16H19V14Z"></path>
                              </svg>
                            </div>
                            <p className={styles.valueText}>Any</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
              <hr />
              <div>
                <Button
                  className={styles.wideBtn}
                  appearance="primary"
                  disabled={disableButton}
                  onClick={() => onSubmit()}
                >
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
            </>
          )}
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
