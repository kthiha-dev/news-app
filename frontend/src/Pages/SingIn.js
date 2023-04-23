import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import Copyright from "./Components/Copyright";
import Contents from "./Components/Contents";
import { isValidEmail } from "../helpers/Helper";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [remember, setRemember] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const isEmailValid = email !== "" && isValidEmail(email);
    const emailErrorMsg = isEmailValid ? "" : "Invalid Email Address";
    setEmailError(!isEmailValid);
    setEmailErrorMsg(emailErrorMsg);

    const passwordErrorMsg = password === "" ? "Password is required" : "";
    setPasswordError(password === "");
    setPasswordErrorMsg(passwordErrorMsg);

    if (!isEmailValid || password === "") {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email,
        password,
        remember,
      })
      .then((res) => {
        if (res?.status === 200) {
          localStorage.setItem("isLoggedIn", true);
          setRedirect(true);
        }
      })
      .catch((err) => {
        setLoginError("Invalid login user credential");
      });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  const login = localStorage.getItem("isLoggedIn");
  if (login) {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
            helperText={emailErrorMsg}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordErrorMsg}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={remember}
                color="primary"
                name="remember"
                onChange={() => setRemember(!remember)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            {loginError && (
              <Grid item xs>
                <Box>
                  <Typography variant="caption" color="error">
                    {loginError}
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item>
              <Link href="sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Contents>
  );
}
