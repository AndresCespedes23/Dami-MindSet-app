import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admins" component={Admins} />
          <Route path="/applications" component={Applications} />
          <Route path="/clients" component={Clients} />
          <Route path="/interviews" component={Interviews} />
          <Route path="/positions" component={Positions} />
          <Route path="/postulants" component={Postulants} />
          <Route path="/profiles" component={Profiles} />
          <Route path="/psychologists" component={Psychologists} />
          <Route path="/sessions" component={Sessions} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default Layout;
