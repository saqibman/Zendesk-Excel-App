import React, { useState } from "react";
import Header from "../Header";
import HeadingColor from "../HeadingColor";
import { Button, makeStyles } from "@fluentui/react-components";
import Paragraph from "../Paragraph";
import InputField from "../InputField";
import { SignUpStyle } from "../../../style/style";

const useStyles = makeStyles(SignUpStyle);

const SignUp = (props) => {
  const styles = useStyles();

  // Autofill the form with dummy data
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("saqibman@example.com");
  const [password, setPassword] = useState("123456");
  const [firstName, setFirstName] = useState("saqib");
  const [lastName, setLastName] = useState("man");
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    let tempErrors = { email: "", password: "" };
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
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignUpClick = () => {
    if (!showForm) {
      setShowForm(true);
    } else {
      if (validate()) {
        // Using dummy data instead of API call
        const dummyToken = "dummyToken123";

        localStorage.setItem("access_token", dummyToken);
        localStorage.setItem("user_detail", JSON.stringify({ email, password }));

        props.dispatchExcel({
          type: "SIGNED_IN",
          email: email,
          password: password,
          token: dummyToken,
        });

        setSuccessMessage("Registration and login successful! You are now signed in.");
      }
    }
  };

  return (
    <>
      <Header text="Sign up" />
      <div className={styles.container}>
        <HeadingColor SimpleText={`Your Account`} coloredText="Create" />
        <Paragraph text="Start with a 14-day free trial. No credit card required." />
        {showForm ? (
          <form noValidate autoComplete="off" className={styles.form}>
            <div>
              <InputField
                type="text"
                id="firstName"
                placeholder="First Name"
                handleChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div>
              <InputField
                type="text"
                id="lastName"
                placeholder="Last Name"
                handleChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div>
              <InputField
                type="email"
                id="email"
                placeholder="Email ID"
                handleChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {errors.email && <p className={styles.errorText}>{errors.email}</p>}
            </div>
            <div>
              <InputField
                type="password"
                id="password"
                placeholder="Password"
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {errors.password && <p className={styles.errorText}>{errors.password}</p>}
            </div>

            {errors.general && <p className={styles.errorText}>{errors.general}</p>}
            {successMessage && <p className={styles.successText}>{successMessage}</p>}
          </form>
        ) : (
          <hr className={styles.line} />
        )}

        <Button className={styles.wideBtn} appearance="primary" onClick={handleSignUpClick}>
          Sign up
        </Button>
        {showForm && (
          <>
            <p className={styles.simpleSmText}>
              By signing up, you agree to our{" "}
              <a href="#" className={styles.ancher}>
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className={styles.ancher}>
                Terms of Use.
              </a>
            </p>
          </>
        )}

        <p className={`${styles.simpleText} ${showForm ? styles.textCenter : ""}`}>
          Already have an account?{" "}
          <a
            href="#"
            className={styles.ancher}
            onClick={() => {
              props.dispatchExcel({ type: "CHANGE_SCREEN", screen: "Sign-in" });
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUp;
