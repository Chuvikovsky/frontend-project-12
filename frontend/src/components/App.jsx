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
import { useSelector } from 'react-redux';
import { localRoutes } from '../utils/routes.js';

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const location = useLocation();

  return isLoggedIn
    ? (
        children
      )
    : (
        <Navigate to={localRoutes.login} state={{ from: location }} />
      );
};

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path={localRoutes.login} element={<PageLogin />} />
      <Route path={localRoutes.signup} element={<PageSignup />} />
      <Route path={localRoutes.notFound} element={<PageNotFound />} />
      <Route
        path={localRoutes.root}
        element={(
          <PrivateRouter>
            <PageIndex />
          </PrivateRouter>
        )}
      />
    </Routes>
  </BrowserRouter>
);

export default App;
