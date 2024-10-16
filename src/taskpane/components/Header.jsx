import React from "react";
import { makeStyles } from "@fluentui/react-components";
import MenuBox from "./MenuBox";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#107c10",
    paddingLeft: "6px",
    paddingBottom: "8px",
    paddingTop: "8px",
    paddingRight: "6px",
    minWidth: "min-content",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#fff",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
    fontWeight: "500",
  },
});

/**
 * Header component
 * @param {string} text - The header text
 * @param {boolean} showMenu - Whether to show the menu
 * @param {Array} menuOptions - The menu options
 */
const Header = ({ text, showMenu = false, menuOptions = [], handleMenuClick }) => {
  const styles = useStyles();

  return (
    <div className={`${styles.wrapper}`}>
      <h4 className={styles.heading}>{text}</h4>
      {showMenu ? <MenuBox options={menuOptions} handleMenuClick={handleMenuClick} /> : null}
    </div>
  );
};

export default Header;
