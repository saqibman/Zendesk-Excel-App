import React, { useState } from "react";
import { Button, makeStyles } from "@fluentui/react-components";
import InputField from "../InputField";
import { ChangePasswordStyle } from "../../../style/style";

const useStyles = makeStyles(ChangePasswordStyle);

const ChangePassword = (props) => {
  const styles = useStyles();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirm_password: "",
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirm_password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (
      formData.oldPassword.length < 6 ||
      formData.newPassword.length < 6 ||
      formData.confirm_password.length < 6
    ) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (formData.newPassword !== formData.confirm_password) {
      setErrorMessage("New password and confirm password do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    if (!validateForm()) {
      return;
    }

    const userDetailString = localStorage.getItem("user_detail");
    console.log("localData:", userDetailString);

    if (!userDetailString) {
      setErrorMessage("User details not found in local storage. Please log in again.");
      return;
    }

    const userDetail = JSON.parse(userDetailString);
    const email = userDetail.email;
    console.log("Email:", email);

    try {
      // Commented out the API call
      // const response = await fetch(`${process.env.BACKEND_END_POINT}/auth/reset-password`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: email,
      //     oldPassword: formData.oldPassword,
      //     newPassword: formData.newPassword,
      //   }),
      // });

      // Using dummy data for validation
      const dummyResponse = { status: 200 }; // Simulate a successful response

      if (dummyResponse.status === 200) {
        setApiResponse("Password updated successfully.");
      } else {
        setApiResponse("Failed to update password. Please try again.");
      }
    } catch (error) {
      setApiResponse({ error: "An error occurred. Please try again later." });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.simpleText}>
          By changing your password, you will automatically be signed out from the account, and you have to sign in
          again in <a href="#" className={styles.ancher}>Zendesk.app</a>
        </p>
        <form noValidate autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
          <div>
            <InputField
              type="password"
              id="oldPassword"
              placeholder="Current password"
              value={formData.oldPassword}
              handleChange={handleChange}
            />
          </div>
          <div>
            <InputField
              type="password"
              id="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              handleChange={handleChange}
            />
          </div>
          <div>
            <InputField
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              handleChange={handleChange}
            />
          </div>
          <Button className={styles.wideBtn} appearance="primary" type="submit">
            Update Password
          </Button>
        </form>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {apiResponse && (
          <div className={styles.apiResponse}>
            {typeof apiResponse === "string" ? (
              <p>{apiResponse}</p>
            ) : (
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
