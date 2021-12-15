import { Switch, Route, Redirect } from 'react-router-dom';
import Header from 'Components/Shared/Header/index';
import Footer from 'Components/Shared/Footer/index';
import Admins from 'Components/Admin/Admins/index';
import Applications from 'Components/Admin/Applications/index';
import Clients from 'Components/Admin/Clients/index';
import Interviews from 'Components/Admin/Interviews/index';
import Positions from 'Components/Admin/Positions/index';
import Postulants from 'Components/Admin/Postulants/index';
import Profiles from 'Components/Admin/Profiles/index';
import Psychologists from 'Components/Admin/Psychologists/index';
import Sessions from 'Components/Admin/Sessions/index';
import Home from 'Components/Admin/Home/index';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path="/admins" component={Admins} />
        <Route path="/applications" component={Applications} />
        <Route path="/clients" component={Clients} />
        <Route path="/interviews" component={Interviews} />
        <Route path="/positions" component={Positions} />
        <Route path="/postulants" component={Postulants} />
        <Route path="/profiles" component={Profiles} />
        <Route path="/psychologists" component={Psychologists} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
export default Layout;
