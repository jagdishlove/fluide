import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage/HomePage";
import LandingPage from "../pages/LandingPage/LandingPage";
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
import PublicRoutes from "./PublicRoutes";

const Routers = () => {
  return (
    <>
      <div
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* 1. UNIVERSAL / OPEN ROUTES (Accessible to everyone) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsAndCondition />} />
            <Route path="/paper" element={<DescriptionCard />} />

            <Route
              path="/lesson/:id/:module/chapter"
              element={<DescriptionPage />}
            />

            {/* 2. GUEST ONLY ROUTES (Redirects to /dashboard if already logged in) */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/googleLogin" element={<GoogleAuth />} />
            </Route>

            {/* 3. PROTECTED ROUTES (Redirects to /login if logged out) */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/profile_settings" element={<Profilesettings />} />
              <Route path="/verification_page" element={<VerificationPage />} />
              <Route path="/lesson/:id/:module" element={<LessonPage />} />
            </Route>

            {/* 4. FALLBACK / 404 ROUTE */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Routers;
