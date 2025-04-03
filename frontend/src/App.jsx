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
import AuthContext from "./contexts/auth.jsx";
import useAuth from "./hooks/auth.jsx";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRouter = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
