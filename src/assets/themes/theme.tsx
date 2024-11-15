import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5", // Light gray background for the whole app
      paper: "#FFFFFF", // White background for components like cards
    },
    text: {
      primary: "#333333", // Dark text color
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Apply custom background
          color: "#333333", // Apply custom text color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // Custom background for buttons
          color: "#333333", // Custom text color for buttons
          "&:hover": {
            backgroundColor: "#f0f0f0", // Slightly darker on hover
          },
        },
      },
    },
  },
});
