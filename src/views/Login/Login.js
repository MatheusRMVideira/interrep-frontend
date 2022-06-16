import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Footer from '../../components/Footer/';
import LoginForm from '../../components/LoginForm/';
import RegisterForm from '../../components/RegisterForm/';

const backgroundStyle={
  backgroundImage: `url('../img/background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

const logoCard={
  background: 'transparent',
  borderStyle: 'none',
}

const logo={
  height: '180px',
  marginBottom: '30px'
}

const footerStyle={
  width: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  color: '#A6A6A7',
  padding: '5px',
  fontFamily: 'Lato'
}

class LoginFooter extends Component {
  render() {
    return (
      <div style={footerStyle}>
        <span>InterREP Manager 2022. </span>
        <span>Organizado por <u><a target="_blank" href="http://republicademoro.com/" style={{color: 'rgb(166, 166, 167)'}}>República Demorô</a></u>.</span>
      </div>
      );
    }
  }

class Login extends Component {
  render() {
    return (
      <div className="app" style={backgroundStyle}>
        <div className="app-body">
          <Container>
            <Row className="justify-content-center">
              <img src="img/logo_index.png" style={logo}/>
            </Row>
            <Row className="justify-content-center">
              <Col lg="6" md="8" sm="8" style={{padding: '0px',marginBottom:'20px'}}>
                <CardGroup>
                  <Card className="p-4" style={{height: '350px'}}>
                    <CardBody>
                      <h1>Login</h1>
                      <p className="text-muted">Faça login na sua conta</p>
                      <LoginForm/>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
              <Col lg="6" md="8" sm="8" style={{padding: '0px'}}>
                <CardGroup>
                  <Card className="text-white bg-primary" style={{height: '350px'}}>
                    <CardBody className="text-center">
                      <div>
                        <h2>Registre-se</h2>
                        <RegisterForm/>
                      </div>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12" md="12" sm="12" className="text-center" style={{padding: '0px', color: "white", fontFamily: "Lato"}}>
                <b>Patrocínio</b>
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="6" sm="12" className="text-center" style={{padding: '0px'}}>
                <img src="img/logo_topmeat.png" style={{maxHeight: '200px', maxWidth: '100%'}}/>
              </Col>
              <Col lg="2" md="2" sm="12" className="text-center" style={{padding: '0px'}}>
                <img src="img/logo_caster.png" style={{marginTop: '30px', maxHeight: '150px', maxWidth: '100%'}}/>
              </Col>
              <Col lg="2" md="2" sm="12" className="text-center" style={{padding: '0px'}}>
                <img src="img/logo_multsport.png" style={{maxHeight: '150px', maxWidth: '100%'}}/>
              </Col>
              <Col lg="2" md="2" sm="12" className="text-center" style={{padding: '0px'}}>
                <img src="img/logo_sorvetecremoso.png" style={{maxHeight: '150px', maxWidth: '100%'}}/>
              </Col>
            </Row>
          </Container>
        </div>
        <LoginFooter/>
      </div>
    );
  }
}

export default Login;
