import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const LoginPage = lazy(() => import('./pages/loginPage'));
const SignUpPage = lazy(() => import('./pages/signUpPage'));
const DashboardPage = lazy(() => import('./pages/dashboardPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
