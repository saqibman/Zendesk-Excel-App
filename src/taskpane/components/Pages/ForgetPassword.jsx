import React, { useState } from "react";
import Header from "../Header";
import HeadingColor from "../HeadingColor";
import { Button, makeStyles } from "@fluentui/react-components";
import InputField from "../InputField";
import { ForgetPassStyle } from "../../../style/style";

const useStyles = makeStyles(ForgetPassStyle);

const ForgetPassword = (props) => {
  const styles = useStyles();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "", general: "" });

  const validate = () => {
    let tempErrors = { email: "", general: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleForgetPasswordClick = async () => {
    if (validate()) {
      try {
        // Commented out the API call
        // const response = await fetch(`${process.env.BACKEND_END_POINT}/auth/forgot-password`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ email }),
        // });

        // Using dummy data for validation
        const dummyResponse = { status: 200 }; // Simulate a successful response

        if (dummyResponse.status === 200) {
          props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Set-password" });
        } else {
          setErrors({ ...errors, general: "Error in sending reset link." });
        }
      } catch (error) {
        setErrors({ ...errors, general: "Error in sending reset link." });
      }
    }
  };

  return (
    <>
      <Header text="Forget Password" />
      <div className={styles.container}>
        <HeadingColor SimpleText={`Enter your Email`} coloredText="Forget Password" />

        <form noValidate autoComplete="off" className={styles.form}>
          <div>
            <InputField
              type="email"
              placeholder="Email ID"
              id="user-email"
              handleChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>

          {errors.general && <p className={styles.errorText}>{errors.general}</p>}
        </form>

        <Button className={styles.wideBtn} appearance="primary" onClick={handleForgetPasswordClick}>
          Submit
        </Button>

        <p className={`${styles.simpleText} ${styles.textCenter}`}>
          Remembered your password?{" "}
          <a
            href="#"
            className={styles.ancher}
            onClick={() => {
              props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
            }}
          >
            Sign In
          </a>
        </p>
      </div>
    </>
  );
};

export default ForgetPassword;
