import { Switch, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admin/Admins';
import Applications from 'Components/Admin/Applications';
import Clients from 'Components/Admin/Clients';
import Interviews from 'Components/Admin/Interviews';
import Positions from 'Components/Admin/Positions';
import Postulants from 'Components/Admin/Postulants';
import Profiles from 'Components/Admin/Profiles';
import Psychologists from 'Components/Admin/Psychologists';
import Sessions from 'Components/Admin/Sessions';
import PsychologistsProfile from 'Components/Admin/UsersProfiles/Psychologists';
import Layout from 'Components/Layout';
import PrivateRoute from 'Routes/PrivateRoute';
import Home from 'Components/Admin/Home';

const adminsRoutes = [
  { name: 'Admins', path: '/admin/admins/' },
  { name: 'Applications', path: '/admin/applications/' },
  { name: 'clients', path: '/admin/clients/' },
  { name: 'interviews', path: '/admin/interviews/' },
  { name: 'positions', path: '/admin/positions/' },
  { name: 'postulants', path: '/admin/postulants/' },
  { name: 'profiles', path: '/admin/profiles/' },
  { name: 'psychologists', path: '/admin/psychologists/' },
  { name: 'sessions', path: '/admin/sessions/' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} styleType="admin">
      <Switch>
        <PrivateRoute path={`${url}/admins`} component={Admins} />
        <PrivateRoute path={`${url}/applications`} component={Applications} />
        <PrivateRoute path={`${url}/clients`} component={Clients} />
        <PrivateRoute path={`${url}/interviews`} component={Interviews} />
        <PrivateRoute path={`${url}/positions`} component={Positions} />
        <PrivateRoute path={`${url}/postulants`} component={Postulants} />
        <PrivateRoute path={`${url}/profiles`} component={Profiles} />
        <PrivateRoute path={`${url}/psychologists`} component={Psychologists} />
        <PrivateRoute path={`${url}/sessions`} component={Sessions} />
        <PrivateRoute path={`${url}/profile/postulant`} component={PsychologistsProfile} />
        <PrivateRoute to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
