import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import Banner from '../../../components/Banner/';
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

class MostChoosen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          goleiro: [],
          linha: [],
          round: ""
        };
        this.getMostChoosen = this.getMostChoosen.bind(this);
        this.getMarket = this.getMarket.bind(this);
    }

    componentDidMount(){
      this.getMostChoosen();
      this.getMarket();
    }

    getMarket(){
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'get',
          url: '/feminino/market/'
      })
      .then((response) => {
        let market = response.data;
        this.setState({'round':market.round});
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    }

    getMostChoosen(){
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'get',
          url: '/feminino/players/most-choosen'
      })
      .then((response) => {
        let choosen = response.data;
        this.setState({'goleiro':choosen.Goleiro});
        this.setState({'linha':choosen.Linha});
        console.log(choosen);
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    }

  render() {
    return (
      <div className="animated fadeIn" style={{fontFamily: 'Lato', paddingTop: '10px'}}>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Banner title="JOGADORES MAIS ESCALADOS" fontWeight="bold" backgroundColor="primary"/>
          </Col>
          <Col xs="12" sm="12" lg="12">
            {
              this.state.goleiro.map((p)=>(
                <Card key={p.id}>
                  <CardHeader>
                    <i className="fa fa-user"></i>{p.name+" - ESCALADO EM "+p.n_teams+" TIMES"}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6" sm="6" lg="6">
                        <b>República: </b>{p.republic.name}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Posição: </b>{p.position}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Preço: </b>{p.value}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Média: </b>{p.average}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))
            }
            {
              this.state.linha.map((p)=>(
                <Card key={p.id}>
                  <CardHeader>
                    <i className="fa fa-user"></i>{p.name+" - ESCALADO EM "+p.n_teams+" TIMES"}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6" sm="6" lg="6">
                        <b>República: </b>{p.republic.name}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Posição: </b>{p.position}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Preço: </b>{p.value}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Média: </b>{p.average}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default MostChoosen;
