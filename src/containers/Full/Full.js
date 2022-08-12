import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import FemSidebar from '../../components/FemSidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Home from '../../views/Home/';
import Logout from '../../views/Logout/';
import Team from '../../views/Team/';
import Admin from '../../views/Admin/';
import Ranking from '../../views/Ranking/';
import MostPoints from '../../views/MostPoints/';
import MostChoosen from '../../views/MostChoosen/';
import FemHome from '../../views/Home/';
import FemTeam from '../../views/Feminino/Team/';
import FemAdmin from '../../views/Feminino/Admin/';
import FemRanking from '../../views/Feminino/Ranking/';
import FemMostChoosen from '../../views/Feminino/MostChoosen/';
import FemMostPoints from '../../views/Feminino/MostPoints/';



class Full extends Component {

  render() {
    const location = window.location.href;
    let sidebar;
    let redirect;
    if(location.includes("feminino")){
      sidebar = <FemSidebar {...this.props}/>;
      redirect = <Redirect from="/" to="/feminino/home"/>;
    } else {
      sidebar = <Sidebar {...this.props}/>;
      redirect = <Redirect from="/" to="/home"/>;
    }
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          {sidebar}
          <main className="main">
            <Container fluid>
              <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/team" component={Team}/>
                <Route path="/admin" component={Admin}/>
                <Route path="/ranking" component={Ranking}/>
                <Route path="/most-points" component={MostPoints}/>
                <Route path="/most-choosen" component={MostChoosen}/>
                <Route path='/feminino/home' component={FemHome}/>
                <Route path="/feminino/team" component={FemTeam}/>
                <Route path="/feminino/admin" component={FemAdmin}/>
                <Route path="/feminino/ranking" component={FemRanking}/>
                <Route path="/feminino/most-choosen" component={FemMostChoosen}/>
                <Route path="/feminino/most-points" component={FemMostPoints}/>
                {redirect}
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
