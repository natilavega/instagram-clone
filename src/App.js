import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import UseAuthListener from './hooks/useAuthListener';

const LoginPage = lazy(() => import('./pages/loginPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));
const DashboardPage = lazy(() => import('./pages/dashboardPage'));
const NotFoundPage = lazy(() => import('./pages/notFoundPage'));

const App = () => {
  const { user } = UseAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                user ? (
                  <DashboardPage />
                ) : (
                  <Navigate to={ROUTES.LOGIN} replace />
                )
              }
            />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
