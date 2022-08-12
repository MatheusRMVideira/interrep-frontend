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

class MostPoints extends Component {

    constructor(props) {
        super(props);
        this.state = {
          goleiro: [],
          linha: [],
          round: ""
        };
        this.getMostPoints = this.getMostPoints.bind(this);
        this.getMarket = this.getMarket.bind(this);
    }

    componentDidMount(){
      this.getMostPoints();
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

    getMostPoints(){
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'get',
          url: '/feminino/players/most-points'
      })
      .then((response) => {
        let points = response.data;
        this.setState({'goleiro':points.Goleiro});
        this.setState({'linha':points.Linha});
        console.log(points);
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
            <Banner title="SELEÇÃO DA RODADA " boldTitle={this.state.round} fontWeight="bold" backgroundColor="primary"/>
          </Col>
          <Col xs="12" sm="12" lg="12">
            {
              this.state.goleiro.map((p)=>(
                <Card key={p.player.id}>
                  <CardHeader>
                    <i className="fa fa-user"></i>{p.player.name+" - "+p.points+" PONTOS"}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6" sm="6" lg="6">
                        <b>República: </b>{p.player.republic.name}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Posição: </b>{p.player.position}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Preço: </b>{p.player.value}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Média: </b>{p.player.average}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))
            }
            {
              this.state.linha.map((p)=>(
                <Card key={p.player.id}>
                  <CardHeader>
                    <i className="fa fa-user"></i>{p.player.name+" - "+p.points+" PONTOS"}
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="6" sm="6" lg="6">
                        <b>República: </b>{p.player.republic.name}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Posição: </b>{p.player.position}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Preço: </b>{p.player.value}
                      </Col>
                      <Col xs="6" sm="6" lg="6">
                        <b>Média: </b>{p.player.average}
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

export default MostPoints;
