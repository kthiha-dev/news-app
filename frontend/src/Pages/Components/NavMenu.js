import React from "react";
import { AppBar, Typography, Link, Button, Toolbar } from "@mui/material";
const NavMenu = () => {
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
        <Button href="/sign-up" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          SignUp
        </Button>
        <Button href="/sign-in" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
