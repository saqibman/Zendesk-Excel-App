import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import InputField from "../InputField";
import Header from "../Header";
import SelectField from "../SelectField";
import ChangePassword from "./ChangePassword";
import ZendeskInstance from "./ZendeskInstance"; // Import ZendeskInstance
import { menuOptions } from "../utils/constants";
import { StandardReportStyle } from "../../../style/style";

const useStyles = makeStyles(StandardReportStyle);

const Setup = (props) => {
  const styles = useStyles();
  const [selectedTab, setSelectedTab] = useState("MainConnections");

  useEffect(() => {
    // Set the active tab to "Connections" by default
    props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Setup", activeTab: "Connections" });
  }, []);

  // Auto-fill dummy data
  const [data, setData] = useState({
    subdomain: "dummy-subdomain",
    email: "dummy-email@zendesk.com",
    account_type: "Type1",
    token: "dummy-token",
    isActive: true,
    isDefaultSet: false,
  });

  const accountTypeOptions = [
    { id: "Type1", name: "Account Type 1" },
    { id: "Type2", name: "Account Type 2" },
  ];

  const onHandleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((val) => ({
      ...val,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const checkConnection = () => {
    // Simulate a successful connection test with dummy data
    // alert("Connection test successful with dummy data!");
    props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "TablesFields" });
  };

  const saveAndTestConnection = () => {
    // Simulate saving dummy data and a successful connection test
    // alert("Data saved with dummy data and connection test successful!");
    props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "TablesFields" });
  };

  return (
    <>
      <Header
        text="Set up"
        showMenu={true}
        menuOptions={menuOptions}
        handleMenuClick={(screen) => {
          props.dispatchExcel({ type: "CHANGE_SCREEN", screen: screen, activeTab: "Connections" });
        }}
      />
      <div className={styles.tabBtns}>
        <div className={styles.tabBtnsWrap}>
          <div
            className={`${styles.tabBtnsList} ${
              props.excelStore.activeTab === "Connections" ? styles.tabBtnsListActive : null
            }`}
            onClick={() => props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Setup", activeTab: "Connections" })}
          >
            Connections
          </div>
          <div
            className={`${styles.tabBtnsList} ${
              props.excelStore.activeTab === "changePass" ? styles.tabBtnsListActive : null
            }`}
            onClick={() => props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Setup", activeTab: "changePass" })}
          >
            Change Password
          </div>
        </div>
      </div>

      {props.excelStore.activeTab === "changePass" ? (
        <ChangePassword excelStore={props.excelStore} dispatchExcel={props.dispatchExcel} />
      ) : props.excelStore.activeTab === "Connections" ? (
        <>
          <div className={styles.tabBtns}>
            <div className={styles.tabInnerBtnsWrap}>
              <div
                className={`${styles.tabInnerBtnsList} ${
                  selectedTab === "MainConnections" ? styles.tabBtnsListActive : null
                }`}
                onClick={() => setSelectedTab("MainConnections")}
              >
                Main Connections
              </div>
              <div
                className={`${styles.tabInnerBtnsList} ${
                  selectedTab === "ZendeskInstance" ? styles.tabBtnsListActive : null
                }`}
                onClick={() => setSelectedTab("ZendeskInstance")}
              >
                Zendesk Instance
              </div>
            </div>
          </div>

          {selectedTab === "MainConnections" ? (
            <div className={styles.container}>
              <p className={styles.simpleText}>
                Please make a connection to{" "}
                <a href="#" className={styles.ancher}>
                  {" "}
                  Zendesk.app
                </a>
              </p>
              <form noValidate autoComplete="off" className={styles.form}>
                <div>
                  <InputField
                    type="text"
                    id="subdomain"
                    name="subdomain"
                    placeholder="Subdomain"
                    value={data.subdomain}
                    handleChange={onHandleChange}
                  />
                </div>
                <div>
                  <InputField
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    handleChange={onHandleChange}
                  />
                </div>
                <div>
                  <SelectField
                    id="account_type"
                    name="account_type"
                    options={accountTypeOptions}
                    placeholder="Account Types"
                    value={data.account_type}
                    handleChange={onHandleChange}
                  />
                </div>
                <div>
                  <InputField
                    type="text"
                    id="token"
                    name="token"
                    placeholder="Token"
                    value={data.token}
                    handleChange={onHandleChange}
                  />
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={data.isActive}
                      onChange={onHandleChange}
                    />
                    Active
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      id="isDefaultSet"
                      name="isDefaultSet"
                      checked={data.isDefaultSet}
                      onChange={onHandleChange}
                    />
                    Default Set
                  </label>
                </div>
              </form>

              <Button className={styles.wideBtn} appearance="primary" onClick={checkConnection}>
                Test Connection
              </Button>
              <Button className={styles.wideBtn} appearance="primary" onClick={saveAndTestConnection}>
                Save and Test Connection
              </Button>
            </div>
          ) : (
            <ZendeskInstance excelStore={props.excelStore} dispatchExcel={props.dispatchExcel} />
          )}
        </>
      ) : null}
    </>
  );
};

export default Setup;
