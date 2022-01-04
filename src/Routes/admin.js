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
import Layout from 'Components/Layout';
import PrivateRouteAdmin from 'Routes/PrivateRouteAdmin';
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
        <PrivateRouteAdmin path={`${url}/admins`} component={Admins} />
        <PrivateRouteAdmin path={`${url}/applications`} component={Applications} />
        <PrivateRouteAdmin path={`${url}/clients`} component={Clients} />
        <PrivateRouteAdmin path={`${url}/interviews`} component={Interviews} />
        <PrivateRouteAdmin path={`${url}/positions`} component={Positions} />
        <PrivateRouteAdmin path={`${url}/postulants`} component={Postulants} />
        <PrivateRouteAdmin path={`${url}/profiles`} component={Profiles} />
        <PrivateRouteAdmin path={`${url}/psychologists`} component={Psychologists} />
        <PrivateRouteAdmin path={`${url}/sessions`} component={Sessions} />
        <PrivateRouteAdmin to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
