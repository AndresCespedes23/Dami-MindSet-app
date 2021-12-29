import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import FirstView from 'Components/Psychologist/FirstView';
import CompletedInterviews from 'Components/Psychologist/CompletedInterviews';
import Layout from 'Components/Layout';
import Interview from 'Components/Psychologist/Interview';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="psychologist">
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/interview/:id`} component={Interview} />
        <Route path={`${url}/first-view`} component={FirstView} />
        <Route path={`${url}/completed-interviews`} component={CompletedInterviews} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
