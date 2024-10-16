import React, { useEffect, useState } from "react";
import { makeStyles, Button } from "@fluentui/react-components";
import { Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogContent, DialogBody } from "@fluentui/react-components";
import InputField from "./InputField";
import { ModalStyle } from "../../style/style";

const useStyles = makeStyles(ModalStyle);

const Modal = ({ id, name, records = [], placeholder, value = "", currentCellAddress, currentCellValue, onModalClose }) => {
  const styles = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState("A1");
  const [cellValue, setCellValue] = useState(""); // State for the cell value

  const onDialogOpenChange = (event, isOpen) => {
    setIsModalOpen(isOpen);
    if (!isOpen && onModalClose) {
      onModalClose(name, cellValue); // Call the callback function with the selected cell value when the modal closes
    }
  };

  // Function to register the event listener for cell selection changes
  const registerEvent = async () => {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      sheet.onSelectionChanged.add(handleChange);
      await context.sync();
    });
  };

  useEffect(() => {
    registerEvent();
  }, []);

  // Function to handle cell selection changes
  const handleChange = async (event) => {
    await Excel.run(async (context) => {
      const cell = context.workbook.getActiveCell();
      cell.load(["address", "values"]);

      await context.sync();

      const address = cell.address.split("!")[1];
      const value = cell.values[0][0]; // Get the cell value

      setSelectedCell(address);
      setCellValue(value);
    });
  };

  // Function to handle input change (manual cell address input or selection from dropdown)
  const handleInputChange = async (event) => {
    const address = event.target.value;
    setSelectedCell(address);

    if (address) {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const cell = sheet.getRange(address);
        cell.load(["values"]);

        await context.sync();

        const value = cell.values[0][0]; // Get the cell value

        setCellValue(value);
      });
    } else {
      setCellValue("");
    }
  };

  return (
    <>
      {isModalOpen && <div className={styles.modalOverlay}></div>}
      <Dialog modalType="non-modal" open={isModalOpen} onOpenChange={(_, { open }) => onDialogOpenChange(_, open)}>
        <DialogTrigger disableButtonEnhancement>
          <Button className={styles.modalBtn} onClick={() => setIsModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#107c10" className={styles.icon}>
              <path d="M12 4.83582L5.79291 11.0429L7.20712 12.4571L12 7.66424L16.7929 12.4571L18.2071 11.0429L12 4.83582ZM12 10.4857L5.79291 16.6928L7.20712 18.107L12 13.3141L16.7929 18.107L18.2071 16.6928L12 10.4857Z"></path>
            </svg>
          </Button>
        </DialogTrigger>
        <DialogSurface aria-describedby={undefined}>
          <DialogBody>
            <DialogTitle>
              <div className={styles.modalHeader}>
                <div className={styles.flexWap}>
                  <div onClick={() => setIsModalOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.arrowIcon}>
                      <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                    </svg>
                  </div>
                  <h3 className={styles.modalTitle}>
                    Select Items | <span className={styles.modalDlTitle}>Search Type</span>
                  </h3>
                </div>
              </div>
            </DialogTitle>
            <DialogContent className={styles.content}>
              <hr className={styles.line} />
              <div className={styles.cellInfo}>
                <p>Current Cell: {selectedCell}</p>
                <p>Current Value: {cellValue}</p>
              </div>
              <InputField
                id={id}
                name={name}
                options={records}
                placeholder={placeholder}
                handleChange={handleInputChange}
                value={selectedCell}
              />
              <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bdbdbd">
                  <path d="M19 8H5V10H19V8ZM19 14H5V16H19V14Z"></path>
                </svg> cell value
              </div>
            </DialogContent>
            <DialogTrigger disableButtonEnhancement>
              <Button className={styles.wideBtn} appearance="primary" onClick={() => setIsModalOpen(false)}>
                OK
              </Button>
            </DialogTrigger>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default Modal;
