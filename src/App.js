import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const LoginPage = lazy(() => import('./pages/loginPage'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
