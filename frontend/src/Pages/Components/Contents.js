import React from "react";
import {
  CssBaseline,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import NavMenu from "./NavMenu";

const theme = createTheme();
const Contents = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <NavMenu />
      <Container component="main" maxWidth="md">
        {children}
      </Container>
    </ThemeProvider>
  );
};

export default Contents;
