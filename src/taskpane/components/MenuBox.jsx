import React from "react";
import { makeStyles, Menu, MenuTrigger, MenuList, MenuItem, MenuPopover } from "@fluentui/react-components";

const useStyles = makeStyles({
  icon: {
    width: "18px",
    fill: "#fff",
  },
});

const MenuBox = ({ options, handleMenuClick }) => {
  const styles = useStyles();
  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            {options.map((item) => {
              return (
                <MenuItem key={item.id} id={item.id} onClick={() => handleMenuClick(item.name)}>
                  {item.name}{" "}
                </MenuItem>
              );
            })}
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};

export default MenuBox;
