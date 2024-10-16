import React, { useReducer, useEffect, useState } from "react";
import SignUp from "./Pages/SignUp";
import Setup from "./Pages/Setup";
import SignIn from "./Pages/SignIn";
import ForgetPassword from "./Pages/ForgetPassword";
import SetPassword from "./Pages/SetPassword";
import ChangePassword from "./Pages/ChangePassword";
import TablesFields from "./Pages/TablesFields";
// import TablesFieldsNew from "./Pages/TablesFields"; 
import LogOut from "./Pages/LogOut";
import { excelReducerFunctions, initialState } from "./utils/ReducerFunctions";

export default function App() {
  const [excelStore, dispatchExcel] = useReducer(excelReducerFunctions, initialState);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    document.addEventListener("associateComplete", function (event) {
      const { buttonName, groupName } = event.detail;
      console.log(buttonName, groupName);
      setActiveTab(buttonName);
      dispatchExcel({ type: "CHANGE_SCREEN", screen: groupName, activeTab: buttonName });
    });
  }, []);

  useEffect(() => {
    dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
  }, []);

  // return <TablesFieldsNew excelStore={excelStore} dispatchExcel={dispatchExcel} />;

  return (
    <div>
      {excelStore.activeScreen === "Sign-up" ? (
        <SignUp excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Sign-in" ? (
        <SignIn excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Forget-password" ? (
        <ForgetPassword excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Set-password" ? (
        <SetPassword excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Setup" ? (
        <Setup excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Change-Password" ? (
        <ChangePassword excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "TablesFields" || excelStore.activeScreen === "Tables Fields" ? ( // Update route to TablesFields
        <TablesFields excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : excelStore.activeScreen === "Logout" ? (
        <LogOut excelStore={excelStore} dispatchExcel={dispatchExcel} />
      ) : null}
    </div>
  );
}
