import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header.jsx';
import PageLogin from './PagesLogin.jsx';
import PageIndex from './PageIndex.jsx';
import PageNotFound from './PageNotFound.jsx';
import PageSignup from './PageSignup.jsx';
import { localRoutes } from '../utils/routes.js';

const PrivateRouter = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
  <div className="d-flex flex-column h-100">
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
  </div>
);

export default App;
