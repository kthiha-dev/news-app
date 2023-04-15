import { Link } from "@inertiajs/inertia-react";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        {/* <a className="navbar-brand" href="#">
          Navbar
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href={route("home")}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={route("dashboard")}>
                Dashboard
              </Link>
            </li>
          </ul> */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href={route("login")}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={route("register")}>
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    // return (
    //   <Container>
    //     <Box sx={{ flexGrow: 1 }}>
    //       <AppBar position="static">
    //         <Toolbar>
    //           <IconButton
    //             size="large"
    //             edge="start"
    //             color="inherit"
    //             aria-label="menu"
    //             sx={{ mr: 2 }}
    //           ></IconButton>
    //           <MenuIcon />
    //           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //             News
    //           </Typography>
    //           <Button color="inherit" href={route("login")}>
    //             Login
    //           </Button>
    //           <Button color="inherit" href={route("register")}>
    //             Register
    //           </Button>
    //         </Toolbar>
    //       </AppBar>
    //     </Box>
    //   </Container>
  );
}
