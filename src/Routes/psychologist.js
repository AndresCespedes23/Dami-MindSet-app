import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Psychologist/Home';
import FirstView from 'Components/Psychologist/FirstView';
import CompletedInterviews from 'Components/Psychologist/CompletedInterviews';
import Layout from 'Components/Layout';
import PrivateRoutePsychologist from './PrivateRoutePsychologist';
import Interview from 'Components/Psychologist/Interview';
import PostulantProfile from 'Components/Psychologist/PostulantProfile';
import Search from 'Components/Psychologist/Search';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="psychologist">
      <Switch>
        <PrivateRoutePsychologist path={`${url}/`} exact component={Home} />
        <PrivateRoutePsychologist path={`${url}/first-view`} component={FirstView} />
        <PrivateRoutePsychologist
          path={`${url}/completed-interviews`}
          component={CompletedInterviews}
        />
        <PrivateRoutePsychologist path={`${url}/postulants/search`} component={Search} />
        <PrivateRoutePsychologist path={`${url}/postulant/:id`} component={PostulantProfile} />
        <PrivateRoutePsychologist path={`${url}/interview/:id`} component={Interview} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
