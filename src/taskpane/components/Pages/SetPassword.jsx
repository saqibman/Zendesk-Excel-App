import React, { useState } from "react";
import Header from "../Header";
import HeadingColor from "../HeadingColor";
import { Button, makeStyles } from "@fluentui/react-components";
import InputField from "../InputField";
import { SetPassStyle } from "../../../style/style";

const useStyles = makeStyles(SetPassStyle);

const SetPassword = (props) => {
  const styles = useStyles();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ token: "", password: "", confirmPassword: "", general: "" });

  const validate = () => {
    let tempErrors = { token: "", password: "", confirmPassword: "", general: "" };
    let isValid = true;

    if (!token) {
      tempErrors.token = "Token is required.";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required.";
      isValid = false;
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSetPasswordClick = async () => {
    if (validate()) {
      try {
        // Commented out the API call
        // const response = await fetch(`${process.env.BACKEND_END_POINT}/auth/set-new-password`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ password, confirmPassword, token }),
        // });

        // Using dummy data for validation
        const dummyResponse = { status: 200 }; // Simulate a successful response

        if (dummyResponse.status === 200) {
          props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
        } else {
          setErrors({ ...errors, general: "Error in setting new password." });
        }
      } catch (error) {
        setErrors({ ...errors, general: "Error in setting new password." });
      }
    }
  };

  return (
    <>
      <Header text="Set New Password" />
      <div className={styles.container}>
        <HeadingColor coloredText="Set New Password" />
        <p className={styles.message}>Check your email, you should have received a Token.</p>
        <form noValidate autoComplete="off" className={styles.form}>
          <div>
            <InputField
              type="text"
              placeholder="Reset Token"
              id="token"
              handleChange={(e) => setToken(e.target.value)}
              value={token}
            />
            {errors.token && <p className={styles.errorText}>{errors.token}</p>}
          </div>

          <div>
            <InputField
              type="password"
              placeholder="New Password"
              id="password"
              handleChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          <div>
            <InputField
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              handleChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
          </div>

          {errors.general && <p className={styles.errorText}>{errors.general}</p>}
        </form>

        <Button className={styles.wideBtn} appearance="primary" onClick={handleSetPasswordClick}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default SetPassword;
