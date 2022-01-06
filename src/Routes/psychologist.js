import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import FirstView from 'Components/Psychologist/FirstView';
import CompletedInterviews from 'Components/Psychologist/CompletedInterviews';
import ChangeInterviewed from 'Components/Psychologist/ChangeInterviewed';
import Layout from 'Components/Layout';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="psychologist">
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/first-view`} component={FirstView} />
        <Route path={`${url}/completed-interviews/:id`} component={CompletedInterviews} />
        <Route path={`${url}/change-interviewed/:id`} component={ChangeInterviewed} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
