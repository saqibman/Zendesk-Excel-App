// import SelectField from "./SelectField";
import { useModalAttributes, makeStyles, Button } from "@fluentui/react-components";
import { SelectFieldCustom } from "./SelectField";
import DragAndDrop from "./utils/DragAndDrop";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import { ChooseColumnModalStyle } from "../../style/style";

const useStyles = makeStyles(ChooseColumnModalStyle);

const ChooseColumnModal = (props) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState();

  const { triggerAttributes, modalAttributes } = useModalAttributes({
    trapFocus: true,
  });

  useEffect(() => {
    setSelectedColumns(props.headerParams);
  }, [props.headerParams]);

  const onClickTrigger = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
  };

  const toggleActive = (header) => {
    // Update active status of the specific column
    const updatedColumns = selectedColumns.map((col) => {
      if (col.id === header.id) {
        return {
          ...col,
          active: !col.active,
        };
      }
      return col;
    });

    setSelectedColumns(updatedColumns);

    // Extract names into an array
    const activeNames = updatedColumns.filter((col) => col.active).map((col) => col.name);

    props.setData((val) => ({
      ...val,
      selectParams: activeNames,
    }));
  };

  return (
    <>
      {open && <div className={styles.modalOverlay}></div>}
      <Dialog
        modalType="non-modal"
        open={open}
        onOpenChange={(event, { open }) => setOpen(open)}
      >
        <DialogTrigger disableButtonEnhancement>
          <Button className={styles.modalBtn} onClick={onClickTrigger}>
            <div className={styles.flexWrap}>
              <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#107c10">
                <path d="M11 5H5V19H11V5ZM13 5V19H19V5H13ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z"></path>
              </svg>
              <h3 className={styles.text}>Choose Column</h3>
            </div>
            <div>
              <svg className={styles.iconDrop} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#107c10">
                <path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"></path>
              </svg>
            </div>
          </Button>
        </DialogTrigger>
        <DialogSurface aria-describedby={undefined}>
          <DialogBody>
            <DialogTitle>
              <h4 className={styles.mZero}> Selected Columns</h4>
            </DialogTitle>
            <DialogContent>
              {selectedColumns?.map((header, i) => (
                <span
                  key={i}
                  className={`${styles.clickable} ${header.active ? styles.cardActive : ""}`}
                  onClick={() => toggleActive(header)}
                >
                  {header.name} {header.active ? <span>-</span> : <span>+</span>}
                </span>
              ))}
            </DialogContent>
            <DialogActions>
              <Button className={styles.wideBtn} appearance="primary" onClick={onClickClose}>
                ok
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default ChooseColumnModal;
