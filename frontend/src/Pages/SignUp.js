import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { Redirect } from "react-router-dom";
import Copyright from "./Components/Copyright";
import Contents from "./Components/Contents";
import { isValidEmail } from "../helpers/Helper";
import axios from "axios";

const SignUp = () => {
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [signUpError, setSignUpError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fName = data.get("firstName");
    const lName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    const firstNameErrorMsg = fName === "" ? "First Name is required" : "";
    setFirstNameError(fName === "");
    setFirstNameErrorMsg(firstNameErrorMsg);

    const lastNameErrorMsg = lName === "" ? "Last Name is required" : "";
    setLastNameError(lName === "");
    setLastNameErrorMsg(lastNameErrorMsg);

    const isEmailValid = email !== "" && isValidEmail(email);
    const emailErrorMsg = isEmailValid ? "" : "Invalid Email Address";
    setEmailError(!isEmailValid);
    setEmailErrorMsg(emailErrorMsg);

    const passwordErrorMsg = password === "" ? "Password is required" : "";
    setPasswordError(password === "");
    setPasswordErrorMsg(passwordErrorMsg);

    if (!isEmailValid || password === "" || fName === "" || lName === "") {
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/register`, {
        fname: fName,
        lname: lName,
        email,
        password,
      })
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          setRedirect(true);
        }
      })
      .catch((err) => {
        setSignUpError(err.response.data.message);
      });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Contents>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item lg={12} xs={6} sm={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={firstNameError}
                helperText={firstNameErrorMsg}
              />
            </Grid>
            <Grid item lg={12} xs={6} sm={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                error={lastNameError}
                helperText={lastNameErrorMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
                helperText={emailErrorMsg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={passwordError}
                helperText={passwordErrorMsg}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            {signUpError && (
              <Grid item xs>
                <Box>
                  <Typography variant="caption" color="error">
                    {signUpError}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Contents>
  );
};

export default SignUp;
