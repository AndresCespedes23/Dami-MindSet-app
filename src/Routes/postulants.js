import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';
import Sign from 'Components/Postulant/Sign';
import PersonalInfo from 'Components/Postulant/PersonalInfo';
import OtherInfoForm from 'Components/Postulant/OtherInfoForm';
import Profile from 'Components/Postulant/Profile';
import Courses from 'Components/Postulant/Courses';

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="postulant">
      <Switch>
        <Route path={`${url}/sign`} component={Sign} />
        <Route path={`${url}/personal-info`} component={PersonalInfo} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/courses`} component={Courses} />
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/other-info-form`} component={OtherInfoForm} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
