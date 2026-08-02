import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import AppWrapper from "./HOC/AppWrapper";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./utils/ScrollToTop";

let theme = createTheme({
  typography: {
    fontFamily: "Work Sans",
    fontSize: 14,
    h1: {
      fontSize: "4.125rem", //66px
    },
    h2: {
      fontSize: "1.75rem", //28px
    },
    h3: {
      fontSize: "1.25rem", //20px
    },
    h4: {
      fontSize: "1.125rem", //18px
    },
    h5: {
      fontSize: "1rem", //16px
    },
    h6: {
      fontSize: "0.875rem", //14px
    },
  },
  palette: {
    primary: {
      main: "#0077cc",
    },
    secondary: {
      main: "#ff4400",
    },
  },
});

theme = responsiveFontSizes(theme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ScrollToTop />
          <AppWrapper>
            <App />
          </AppWrapper>
        </Router>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
);
