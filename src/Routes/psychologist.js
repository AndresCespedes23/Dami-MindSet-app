import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import FirstPage from 'Components/Psychologist/FirstPage';
import Home from 'Components/Psychologist/Home';
import CompletedInterviews from 'Components/Psychologist/CompletedInterviews';
import ChangeInterviewed from 'Components/Psychologist/ChangeInterviewed';
import Layout from 'Components/Layout';
import PrivateRoutePsychologist from './PrivateRoutePsychologist';
import Interview from 'Components/Psychologist/Interview';
import PostulantProfile from 'Components/Psychologist/PostulantProfile';
import Search from 'Components/Psychologist/Search';
import Availability from 'Components/Psychologist/Availability';
import Profile from 'Components/Psychologist/Profile';

const PsychologistRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout styleType="psychologist">
      <Switch>
        <PrivateRoutePsychologist
          path={`${url}/change-interviewed/:id`}
          component={ChangeInterviewed}
        />
        <PrivateRoutePsychologist path={`${url}/`} exact component={FirstPage} />
        <PrivateRoutePsychologist path={`${url}/home`} component={Home} />
        <PrivateRoutePsychologist
          path={`${url}/completed-interviews`}
          component={CompletedInterviews}
        />
        <PrivateRoutePsychologist path={`${url}/profile`} component={Profile} />
        <PrivateRoutePsychologist path={`${url}/postulants/search`} component={Search} />
        <PrivateRoutePsychologist path={`${url}/postulant/:id`} component={PostulantProfile} />
        <PrivateRoutePsychologist path={`${url}/availability`} component={Availability} />
        <PrivateRoutePsychologist path={`${url}/interview/:id`} component={Interview} />
        <Redirect to={`${url}/`} />
      </Switch>
    </Layout>
  );
};

export default PsychologistRoutes;
