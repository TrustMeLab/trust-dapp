import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    text: {
      primary: "#1c1c1c", // Cod Grey
    },
    primary: {
      main: "#007873",
      contrastText: "#ffffff", // White
    },
  },
  typography: {
    fontFamily: "sans-serif",
    h1: {
      fontSize: 60,
      fontWeight: "lighter",
    },
    h2: {
      fontSize: 48,
      fontWeight: "lighter",
    },
    h3: {
      fontSize: 34,
      fontWeight: "normal",
    },
    h4: {
      fontSize: 24,
      fontWeight: "normal",
    },
    h5: {
      fontSize: 20,
      fontWeight: "normal",
    },
    h6: {
      fontSize: 16,
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: "normal",
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: "bold",
    },
    body1: {
      fontSize: 16,
      fontWeight: "normal",
    },
    body2: {
      fontSize: 14,
      fontWeight: "normal",
    },
    caption: {
      fontSize: 12,
      fontWeight: "normal",
    },
  },
});
