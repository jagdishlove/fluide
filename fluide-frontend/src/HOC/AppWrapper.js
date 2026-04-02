import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "../components/alert/Alert";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppWrapper = ({ children }) => {
  const loading = useSelector((state) => state.loadingReducer);
  const navigate = useNavigate();

  useEffect(() => {
    // Add any global initialization code here (e.g. fetching user data, etc.)
  }, []);

  return (
    <div>
      {/* {loading?.isLoading && <LoadingSpinner />} */}
      {children}
      <Toast />
      <Typography variant="h5">
        <CookieConsent
          style={{
            background: "rgba(53, 51, 51, 0.8)",

            display: "flex",
            alignItems: "center",
          }}
          buttonStyle={{ color: "#000000", background: "#fdfdfd" }}
          buttonText={<Typography variant="h5">Accept & Close</Typography>}
        >
          This website uses cookies to optimize your experience with our
          services on the site, as described in our{" "}
          <spam
            onClick={() =>  window.open('/policy.pdf','_blank')}
            style={{ color: "#528ad8", cursor: "pointer" }}
          >
            Privacy Policy
          </spam>
          .
        </CookieConsent>
      </Typography>
    </div>
  );
};

export default AppWrapper;
