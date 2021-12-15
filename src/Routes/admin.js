import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
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
    <Layout routes={adminsRoutes}>
      <Switch>
        <Route path={`${url}/admins`} component={Admins} />
        <Route path={`${url}/applications`} component={Applications} />
        <Route path={`${url}/clients`} component={Clients} />
        <Route path={`${url}/interviews`} component={Interviews} />
        <Route path={`${url}/positions`} component={Positions} />
        <Route path={`${url}/postulants`} component={Postulants} />
        <Route path={`${url}/profiles`} component={Profiles} />
        <Route path={`${url}/psychologists`} component={Psychologists} />
        <Route path={`${url}/sessions`} component={Sessions} />
        <Redirect to={`${url}/admins`} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
