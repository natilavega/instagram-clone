import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/useAuthListener';

const LoginPage = lazy(() => import('./pages/loginPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));
const DashboardPage = lazy(() => import('./pages/dashboardPage'));
const ProfilePage = lazy(() => import('./pages/profilePage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage'));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                user ? (
                  <DashboardPage user={user} />
                ) : (
                  <Navigate to={ROUTES.LOGIN} replace />
                )
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                !user ? (
                  <LoginPage />
                ) : (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                )
              }
            />
            <Route
              path={ROUTES.SIGN_UP}
              element={
                !user ? (
                  <SignUpPage />
                ) : (
                  <Navigate to={ROUTES.DASHBOARD} replace />
                )
              }
            />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
