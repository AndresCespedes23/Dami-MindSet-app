import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/Login';
import Layout from 'Components/Layout';

const authRoutes = [
  { name: 'Login', path: '/auth/login' },
  { name: 'sign up', path: '/auth/sign-up' }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={authRoutes}>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
