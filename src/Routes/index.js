import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulants'));

const Routes = () => {
  return (
    <Router>
      <Suspense
        fallback={<Spinner type="TailSpin" color="#002147" height={80} width={80} text="MindSet" />}
      >
        <Switch>
          <Route path="/postulants" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Redirect to="/postulants" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
