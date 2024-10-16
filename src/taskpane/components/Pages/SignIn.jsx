import React, { useState } from "react";
import Header from "../Header";
import HeadingColor from "../HeadingColor";
import { Button, makeStyles } from "@fluentui/react-components";
import InputField from "../InputField";
import { SingInStyle } from "../../../style/style";

const useStyles = makeStyles(SingInStyle);

const SignIn = (props) => {
  const styles = useStyles();

  // Initialize the state with default values
  const [email, setEmail] = useState("saqibman@example.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });

  const validate = () => {
    let tempErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid.";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignInClick = () => {
    if (validate()) {
      const dummyEmail = "saqibman@example.com";
      const dummyPassword = "123456";

      if (email === dummyEmail && password === dummyPassword) {
        // Move to the setup screen
        props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Setup" });
      } else {
        setErrors({ ...errors, general: "Credentials do not match." });
      }
    }
  };

  return (
    <>
      <Header text="Sign in" />
      <div className={styles.container}>
        <HeadingColor SimpleText={`to Your Account`} coloredText="Welcome" />

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

          <div>
            <InputField
              type="password"
              placeholder="Password"
              id="user-password"
              handleChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>

          {errors.general && <p className={styles.errorText}>{errors.general}</p>}
        </form>

        <Button className={styles.wideBtn} appearance="primary" onClick={handleSignInClick}>
          Sign In
        </Button>

        <p className={`${styles.simpleText} ${styles.textCenter}`}>
          Don't have an account?{" "}
          <a
            href="#"
            className={styles.ancher}
            onClick={() => {
              props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-up" });
            }}
          >
            Sign Up
          </a>
        </p>
        <p className={`${styles.simpleText} ${styles.textCenter}`}>
          Forget Password{" "}
          <a
            href="#"
            className={styles.ancher}
            onClick={() => {
              props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Forget-password" });
            }}
          >
            here
          </a>
        </p>
      </div>
    </>
  );
};

export default SignIn;
