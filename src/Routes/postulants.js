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
import PrivateRoute from './PrivateRoute';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="postulant">
      <Switch>
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/sign`} component={Sign} />
        <Route path={`${url}/register`} component={Register} />
        <PrivateRoute path={`${url}/personal-info`} component={PersonalInfo} />
        <PrivateRoute path={`${url}/education`} exact component={Education} />
        <PrivateRoute path={`${url}/work`} exact component={Work} />
        <PrivateRoute path={`${url}/courses`} component={Courses} />
        <PrivateRoute path={`${url}/description`} component={Description} />
        <PrivateRoute path={`${url}/other-info`} component={OtherInfoForm} />
        <PrivateRoute path={`${url}/summary`} component={Summary} />
        <PrivateRoute path={`${url}/profile`} component={Profile} />
        <Redirect to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
