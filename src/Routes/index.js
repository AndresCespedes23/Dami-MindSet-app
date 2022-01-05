import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';
import { tokenListener } from 'helpers/firebase';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulants'));
const PsychologistRoutes = lazy(() => import('Routes/psychologist'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Router>
      <Suspense
        fallback={<Spinner type="TailSpin" color="#002147" height={80} width={80} text="MindSet" />}
      >
        <Switch>
          <Route path="/postulants" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/psychologist" component={PsychologistRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/postulants" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
