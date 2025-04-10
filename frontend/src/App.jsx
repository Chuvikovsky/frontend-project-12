import React, { useState } from "react";

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
import { useSelector, useDispatch } from "react-redux";
// import { logIn, logOut } from "./store/authSlice.js";

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  // return children;
  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<PageLogin />} />
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
  );
}

export default App;
