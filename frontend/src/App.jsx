import React from "react";
import { Header } from "./components/Header.jsx";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { PageLogin } from "./components/PagesLogin.jsx";
import { PageIndex } from "./components/PageIndex.jsx";
import { PageNotFound } from "./components/PageNotFound.jsx";
import { PageSignup } from "./components/PageSignup.jsx";
import { useSelector } from "react-redux";
// import { logIn, logOut } from "./store/authSlice.js";

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="login" element={<PageLogin />} />
          <Route path="signup" element={<PageSignup />} />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              <PrivateRouter>
                <PageIndex />
              </PrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
