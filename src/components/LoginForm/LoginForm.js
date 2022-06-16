import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';
import * as CONFIG from '../../config'
import swal from 'sweetalert';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email : '',
      password : ''
      }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    axios({
        method: 'post',
        url: '/session/login',
        data: data
    })
    .then(function(response) {
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("permissions",JSON.stringify(response.data.permissions));
        window.location.replace('/#/home');
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="Email"/>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Sua senha"/>
        </InputGroup>
        <Row>
          <Col xs="6">
            <Button color="primary" type="submit" className="px-4">Login</Button>
          </Col>
          <Col xs="6" className="text-right">
          </Col>
        </Row>
      </form>
    );
  }
}

export default LoginForm;
