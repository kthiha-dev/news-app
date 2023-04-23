import React, { useState } from "react";
import { AppBar, Typography, Link, Button, Toolbar } from "@mui/material";
import axios from "axios";

const NavMenu = () => {
  const isLogIn = localStorage.getItem("isLoggedIn");
  const [redirect, setRedirect] = useState(false);
  const handleLogout = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/logout`)
      .then((res) => {
        if (res.status === 200) {
          setRedirect(true);
          localStorage.clear();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          style={{
            textDecoration: "none",
            boxShadow: "none",
          }}
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          component={Link}
        >
          <Link href="/" underline="none">
            Interview News
          </Link>
        </Typography>
        {!isLogIn || redirect ? (
          <>
            <Button href="/sign-up" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              SignUp
            </Button>
            <Button href="/sign-in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogout}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
