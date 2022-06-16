import React, { Component } from 'react';
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from 'reactstrap';

class Home extends Component {

    constructor(props) {
        super(props);
    }

  render() {
    return (
      <div className="animated fadeIn" style={{fontFamily: 'Lato', paddingTop: '10px'}}>
        <Row>
          <Col xs="12" sm="12" lg="12" className="text-center">
            <img src="img/logo_index.png" style={{marginTop: '100px',marginBottom: '50px',width: '90%',maxWidth: '692px'}}/>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="12" className="text-center">
            <b style={{color:'#000'}}>Patrocínio:</b>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="12" className="text-center">
            <img src="img/logo_topmeat.png" style={{width: '90%',maxWidth: '467px'}}/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
