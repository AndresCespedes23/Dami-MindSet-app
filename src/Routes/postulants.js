import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';
import Sign from 'Components/Postulant/Sign';
import Profile from 'Components/Postulant/Profile';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]}>
      <Switch>
        <Route path={`${url}/sign`} component={Sign} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/`} exact component={Home} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
