import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Shared/Header/index';
import Footer from '../Shared/Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import Clients from '../Clients/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Router>
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
      </Router>
      <Footer />
    </div>
  );
}
export default Layout;
