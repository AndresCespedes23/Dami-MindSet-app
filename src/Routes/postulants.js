import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Work from 'Components/Postulant/Work';
import Layout from 'Components/Layout';
import Sign from 'Components/Postulant/Sign';
import Register from 'Components/Postulant/Register';
import Summary from 'Components/Postulant/Summary';
import Description from 'Components/Postulant/Description';
import PersonalInfo from 'Components/Postulant/PersonalInfo';
import OtherInfoForm from 'Components/Postulant/OtherInfoForm';
import Profile from 'Components/Postulant/Profile';
import Courses from 'Components/Postulant/Courses';
import Education from 'Components/Postulant/Education';
import HomeLogged from 'Components/Postulant/HomeLogged';
import PrivateRoutePostulant from './PrivateRoutePostulant';
import InterviewDetails from 'Components/Postulant/InterviewDetails';
import Availability from 'Components/Postulant/Availability';
import Sessions from 'Components/Postulant/Sessions';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout styleType="postulant">
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/sign`} component={Sign} />
        <Route path={`${url}/register`} component={Register} />
        <PrivateRoutePostulant path={`${url}/personal-info`} component={PersonalInfo} />
        <PrivateRoutePostulant path={`${url}/education`} exact component={Education} />
        <PrivateRoutePostulant path={`${url}/work`} exact component={Work} />
        <PrivateRoutePostulant path={`${url}/courses`} component={Courses} />
        <PrivateRoutePostulant path={`${url}/description`} component={Description} />
        <PrivateRoutePostulant path={`${url}/other-info`} component={OtherInfoForm} />
        <PrivateRoutePostulant path={`${url}/availability`} component={Availability} />
        <PrivateRoutePostulant path={`${url}/summary`} component={Summary} />
        <PrivateRoutePostulant path={`${url}/profile`} component={Profile} />
        <PrivateRoutePostulant path={`${url}/sessions`} component={Sessions} />
        <PrivateRoutePostulant path={`${url}/interview/:id`} component={InterviewDetails} />
        <PrivateRoutePostulant path={`${url}/home`} component={HomeLogged} />
        <Redirect to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
