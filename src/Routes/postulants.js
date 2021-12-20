import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Postulant/Home';
import Layout from 'Components/Layout';
import Sign from 'Components/Postulant/Sign';
<<<<<<< HEAD
import PersonalInfo from 'Components/Postulant/PersonalInfo';
=======
import OtherInfoForm from 'Components/Postulant/OtherInfoForm';
import Profile from 'Components/Postulant/Profile';
import Courses from 'Components/Postulant/Courses';
>>>>>>> development

const PostulantRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={[{ name: 'Go to admin app', path: '/admin' }]} styleType="postulant">
      <Switch>
        <Route path={`${url}/sign`} component={Sign} />
<<<<<<< HEAD
        <Route path={`${url}/personal-info`} component={PersonalInfo} />
=======
        <Route path={`${url}/profile`} component={Profile} />
        <Route path={`${url}/courses`} component={Courses} />
>>>>>>> development
        <Route path={`${url}/`} exact component={Home} />
        <Route path={`${url}/other-info-form`} component={OtherInfoForm} />
      </Switch>
    </Layout>
  );
};

export default PostulantRoutes;
