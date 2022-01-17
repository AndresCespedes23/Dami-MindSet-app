import { Switch, useRouteMatch } from 'react-router-dom';
import Admins from 'Components/Admin/Admins';
import Applications from 'Components/Admin/Applications';
import Clients from 'Components/Admin/Clients';
import ClientsStates from 'Components/Admin/ClientsStates';
import Interviews from 'Components/Admin/Interviews';
import Positions from 'Components/Admin/Positions';
import Postulants from 'Components/Admin/Postulants';
import Profiles from 'Components/Admin/Profiles';
import Psychologists from 'Components/Admin/Psychologists';
import Sessions from 'Components/Admin/Sessions';
import PostulantProfile from 'Components/Admin/UsersProfiles/Postulants';
import PsychologistsProfile from 'Components/Admin/UsersProfiles/Psychologists';
import PsychologistsStates from 'Components/Admin/PsychologistsStates';
import AdminProfile from 'Components/Admin/UsersProfiles/Admin';
import Layout from 'Components/Layout';
import PrivateRouteAdmin from 'Routes/PrivateRouteAdmin';
import Home from 'Components/Admin/Home';
import Statistics from 'Components/Admin/Statistics';
import Position from 'Components/Admin/Positions/Position';
import Client from 'Components/Admin/Clients/Client';
import Interview from 'Components/Admin/Interviews/Interview';
import Session from 'Components/Admin/Sessions/Session';

const adminsRoutes = [
  { name: 'Admins', path: '/admin/admins/' },
  { name: 'Applications', path: '/admin/applications/' },
  { name: 'clients', path: '/admin/clients/' },
  { name: 'interviews', path: '/admin/interviews/' },
  { name: 'positions', path: '/admin/positions/' },
  { name: 'postulants', path: '/admin/postulants/' },
  { name: 'profiles', path: '/admin/profiles/' },
  { name: 'psychologists', path: '/admin/psychologists/' },
  { name: 'sessions', path: '/admin/sessions/' },
  { name: 'statistics', path: '/admin/statistics/' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} styleType="admin">
      <Switch>
        <PrivateRouteAdmin path={`${url}/admins`} component={Admins} />
        <PrivateRouteAdmin path={`${url}/applications`} component={Applications} />
        <PrivateRouteAdmin path={`${url}/clients-old`} component={Clients} />
        <PrivateRouteAdmin path={`${url}/clients`} component={ClientsStates} />
        <PrivateRouteAdmin path={`${url}/client/:id`} component={Client} />
        <PrivateRouteAdmin path={`${url}/interview/:id`} component={Interview} />
        <PrivateRouteAdmin path={`${url}/interviews`} component={Interviews} />
        <PrivateRouteAdmin path={`${url}/position/:id`} component={Position} />
        <PrivateRouteAdmin path={`${url}/positions`} component={Positions} />
        <PrivateRouteAdmin path={`${url}/postulants`} component={Postulants} />
        <PrivateRouteAdmin path={`${url}/postulant/:id`} component={PostulantProfile} />
        <PrivateRouteAdmin path={`${url}/profiles`} component={Profiles} />
        {/* PANTALLA DESCONECTADA psychologist-old*/}
        <PrivateRouteAdmin path={`${url}/psychologists-old`} component={Psychologists} />{' '}
        <PrivateRouteAdmin path={`${url}/psychologists`} component={PsychologistsStates} />
        <PrivateRouteAdmin path={`${url}/psychologist/:id`} component={PsychologistsProfile} />
        <PrivateRouteAdmin path={`${url}/sessions`} component={Sessions} />
        <PrivateRouteAdmin path={`${url}/session/:id`} component={Session} />
        <PrivateRouteAdmin path={`${url}/psychologists`} component={PsychologistsStates} />
        <PrivateRouteAdmin path={`${url}/profile/administrator`} component={AdminProfile} />
        <PrivateRouteAdmin path={`${url}/statistics`} component={Statistics} />
        <PrivateRouteAdmin to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
