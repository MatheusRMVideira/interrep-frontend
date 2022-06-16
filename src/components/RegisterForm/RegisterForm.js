import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import axios from 'axios';
import * as CONFIG from '../../config'
import swal from 'sweetalert';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      email : '',
      password : '',
      name: ''
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
    data.append('name', this.state.name);
    axios({
        method: 'post',
        url: '/users/',
        data: data
    })
    .then(function(response) {
        swal("Sucesso!", "Você foi registrado com sucesso, e já pode fazer login!", "success");
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} style={{padding: "15px"}}>
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="email" value={this.state.email} onChange={this.handleChange.bind(this)} placeholder="E-mail"/>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-lock"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange.bind(this)} placeholder="Sua senha"/>
        </InputGroup>
        <InputGroup className="mb-4">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="icon-user"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="name" value={this.state.user} onChange={this.handleChange.bind(this)} placeholder="Seu nome"/>
        </InputGroup>
        <Row>
          <Col xs="6">
            <Button color="light" type="submit" className="px-4 pull-left">Registre-se</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default RegisterForm;
