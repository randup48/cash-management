import blue from "@mui/material/colors/blue";
import createTheme from "@mui/material/styles/createTheme";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: blue[600],
      // contrastText: "#000",
      // dark: "#fff",
    },
  },
});
