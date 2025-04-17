import React from "react";
import { Header } from "./Header.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { PageLogin } from "./PagesLogin.jsx";
import { PageIndex } from "./PageIndex.jsx";
import { PageNotFound } from "./PageNotFound.jsx";
import { PageSignup } from "./PageSignup.jsx";
import { useSelector } from "react-redux";

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
  );
}

export default App;
