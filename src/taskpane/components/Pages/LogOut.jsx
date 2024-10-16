import React, { useEffect } from "react";
// import { makeStyles } from "@fluentui/react-components";
// import { SingInStyle } from "../../../style/style";

// const useStyles = makeStyles(SingInStyle);

const LogOut = (props) => {
  // const styles = useStyles();

  const handleLogOut = async () => {
    // Get the access token from local storage
    const token = localStorage.getItem("access_token");

    // if (token) {
    //   try {
    //     const response = await fetch(`${process.env.BACKEND_END_POINT}/auth/logout`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `${token}`,
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }

    //     // Remove the token from localStorage
    //     localStorage.clear();

    //     // Dispatch action to change the screen to Sign-in
    //     props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
    //   } catch (error) {
    //     console.error("Logout failed:", error);
    //     // If there's an error, still redirect to Sign-in screen
    //     props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
    //   }
    // } else {
    // If no token found, directly change the screen to Sign-in
    localStorage.clear(); // Clear all items from local storage
    props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
    // }
  };

  useEffect(() => {
    handleLogOut(); // Automatically run the logout logic on component mount
  }, [props]); // Dependency array includes props to ensure the effect runs when props change

  return null; // No UI is needed
};

export default LogOut;
