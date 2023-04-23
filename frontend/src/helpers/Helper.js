import { useTheme, useMediaQuery } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

export const useIsSmallScreen = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
};

export const useLocQuery = () => {
  const appHistory = useParams();
  return appHistory;
};

export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};
