import React, { useEffect, useState } from 'react';
import { Dialog, DialogBody, makeStyles, DialogSurface, DialogTitle, DialogContent, Button } from "@fluentui/react-components";
import { ModalStyle } from '../../style/style';

const useStyles = makeStyles(ModalStyle);

const ErrorModal = ({ show, onClose, message }) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(show);

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const handleClose = (event, { open }) => {
    setIsOpen(open);
    if (!open) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && <div className={styles.modalOverlay}></div>}
      <Dialog modalType="non-modal" open={isOpen} onOpenChange={handleClose}>
        <DialogSurface aria-describedby={undefined}>
          <DialogBody>
            <DialogTitle>
              <div className={styles.modalHeader}>
                <div className={styles.flexWrap}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={styles.arrowIcon}
                    >
                      <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </DialogTitle>
            <DialogContent className={styles.content}>
              <p className={styles.popupErrorAlert}>{message}</p>
            </DialogContent>
            {/* <Button className={styles.wideBtn} appearance="primary" onClick={() => handleClose(null, { open: false })}>
              Close
            </Button> */}
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default ErrorModal;
