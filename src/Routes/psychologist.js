import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import Layout from 'Components/Layout';
import Search from 'Components/Psychologist/Search';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="psychologist">
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/interviews/search`} component={Search} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
