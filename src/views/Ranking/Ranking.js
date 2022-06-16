import React, { Component } from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import Banner from '../../components/Banner/';
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

class Ranking extends Component {

    constructor(props) {
        super(props);
        this.state = {
          teams: [],
          ownPosition: ""
        };
        this.getTeams = this.getTeams.bind(this);
        this.getOwnTeam = this.getOwnTeam.bind(this);
    }

    componentDidMount(){
      this.getTeams();
      this.getOwnTeam();
    }

    getOwnTeam(){
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'get',
          url: '/teams/me'
      })
      .then((response) => {
        let team = response.data;
        this.setState({'ownPosition':team.position});
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    }

    getTeams(){
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'get',
          url: '/teams/'
      })
      .then((response) => {
        let teams = response.data;
        for(let i = 0;i<teams.length;i++){
          teams[i].position = i+1;
        }
        this.setState({'teams':teams});
        console.log(teams);
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
                <Banner title="RANKING DE TIMES" fontWeight="bold" backgroundColor="primary"/>
                <ReactTable
                  style={{marginBottom: '10px'}}
                  data={this.state.teams}
                  columns={[
                        {
                            Header: 'Posição',
                            accessor: 'position'
                        },
                        {
                            Header: 'Time',
                            accessor: 'name'
                        },
                        {
                            Header: 'Pontuação total',
                            accessor: 'points'
                        },
                        {
                            Header: 'Última pontuação',
                            accessor: 'last'
                        },
                        {
                            Header: 'Usuário',
                            accessor: 'user.name'
                        }
                  ]}
                  filterable
                  defaultPageSize={10}
                  defaultFilterMethod={(filter, row) => String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase())}
                  //className="-striped -highlight"
                />
                <Banner title="SUA POSIÇÃO: " fontSize="large" boldTitle={this.state.ownPosition+"º"} fontWeight="normal" backgroundColor="primary"/>
            </Col>
        </Row>
      </div>
    )
  }
}

export default Ranking;
