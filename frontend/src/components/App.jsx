import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Header from './Header.jsx';
import PageLogin from './PagesLogin.jsx';
import PageIndex from './PageIndex.jsx';
import PageNotFound from './PageNotFound.jsx';
import PageSignup from './PageSignup.jsx';
import AuthContext from '../store/authContext.js';
import useAuth from '../utils/useAuth.jsx';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: null,
    isLoggedIn: false,
  });

  const logIn = (username) => setUser({ isLoggedIn: true, username });
  const logOut = () => {
    localStorage.removeItem('token');
    setUser({
      username: null,
      isLoggedIn: false,
    });
  };

  const authHandler = useMemo(
    () => ({
      user,
      logIn,
      logOut,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

const PrivateRouter = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return user.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="login" element={<PageLogin />} />
        <Route path="signup" element={<PageSignup />} />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={(
            <PrivateRouter>
              <PageIndex />
            </PrivateRouter>
          )}
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
