import React, {Component} from 'react';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
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

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
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
                <Redirect from="/" to="/home"/>
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
