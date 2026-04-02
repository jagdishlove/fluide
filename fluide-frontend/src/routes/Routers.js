import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import Header from "../components/Header/Header";
import Login from "../pages/LoginPage/Login";
import LessonPage from "../pages/lessonPage/LessonPage";
import DescriptionCard from "../components/DescriptionCard/DescriptionCard";
import HeaderPopOver from "../components/HeaderPopOver/HeaderPopOver";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import Profilesettings from "../pages/LoginPage/profilesettings";
import Footer from "../components/Footer/Footer";
import ProtectedRoutes from "./ProtectedRoutes";
import VerificationPage from "../pages/verificationPage/VerificationPage";
import ErrorPage from "../pages/errorPage/ErrorPage";
import GoogleAuth from "../pages/googleAuthPage/GoogleAuth";
import Privacy from "../pages/Privacy";
import TermsAndCondition from "../pages/TermsAndCondition";
import DescriptionPage from "../pages/descriptionPage/DescriptionPage";

const Routers = () => {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lesson/:id/:module" element={<LessonPage />} />
            <Route
              path="/lesson/:id/:module/chapter"
              element={<DescriptionPage />}
            />
            <Route path="/paper" element={<DescriptionCard />} />
            <Route path="/popover" element={<HeaderPopOver />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/verification_page" element={<VerificationPage />} />
            <Route path="/profile_settings" element={<Profilesettings />} />
            <Route path="/googleLogin" element={<GoogleAuth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsAndCondition />} />

            <Route path="/*" element={<ErrorPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Routers;
