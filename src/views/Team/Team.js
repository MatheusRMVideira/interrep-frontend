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
  Table,
  Input
} from 'reactstrap';

const columns = [
    {
        Header: 'Nome',
        accessor: 'name'
    },
    {
        Header: 'República',
        accessor: 'rep'
    },
    {
        Header: 'Posição',
        accessor: 'position'
    },
    {
        Header: 'Preço',
        accessor: 'value'
    },
    {
        Header: 'Média',
        accessor: 'average'
    },
    {
        Header: 'Última',
        accessor: 'last'
    }
];

const fieldStyle={
    backgroundImage: `url('img/field.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    marginBottom: '10px'
}

class Team extends Component {

    componentDidMount(){
        this.getOwnTeam();
        this.getMarket();
        this.getOwnData();
    }

    getMarket(){
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'get',
            url: '/market/'
        })
        .then((response) => {
            const dateTime = Date.now();
            const timestamp = Math.floor(dateTime / 1000);
            const minuto = 60;
            const hora = minuto*60;
            const dia = hora*24;
            this.state.marketOpen = response.data.open;
            this.state.marketDeadline = response.data.deadline;
            if(this.state.marketOpen){
                const remainingTime = this.state.marketDeadline - timestamp;
                console.log(remainingTime);
                if(remainingTime>0){
                  this.setState({'marketTitle': "Mercado fecha em: " + Math.floor(remainingTime/(dia)) + " dias " + Math.floor((remainingTime%(dia))/hora) + " horas e " + Math.floor((remainingTime%(hora))/minuto) + " minutos"});
                }else{
                  this.setState({'marketTitle': "O Mercado fechará a qualquer momento!"});
                }

            }
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
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
            this.setState({'teamName':response.data.name});
            console.log(response.data);
            this.setState({'lastPoints':response.data.last});
            this.setState({'totalPoints':response.data.points});
            let players = []
            let goalkeeper = {
                id: null,
                name: null,
                value: 0
            }
            let teamValue = 0;
            for(let p in response.data.players){
                if(response.data.players[p].position=="Goleiro"){
                    goalkeeper = {
                        id: response.data.players[p].id,
                        name: response.data.players[p].name,
                        value: response.data.players[p].value
                    }
                    teamValue += response.data.players[p].value;
                }else{
                    players.push({
                            id: response.data.players[p].id,
                            name: response.data.players[p].name,
                            value: response.data.players[p].value
                        });
                    teamValue += response.data.players[p].value;
                }
            }
            while(players.length<4){
                players.push({
                        id: null,
                        name: null,
                        value: 0
                    })
            }
            this.setState({'goalkeeper':goalkeeper,'players':players,'teamValue':teamValue});
        })
        .catch(function(error) {
            console.log(error);
            swal("Oops!", error.response.data.error, "error");
        })
    }

    getOwnData(){
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'get',
            url: '/users/me'
        })
        .then((response) => {
            this.setState({'coins':response.data.coins});
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
    }

    constructor () {
            super();
            this.state = {
                marketOpen: false,
                marketTitle: 'Mercado Fechado',
                marketDeadline: 0,
                teamName: '',
                teamValue: 0,
                tableData: [],
                lastPoints: "",
                totalPoints: "",
                coins: 0,
                players: [
                            {
                                id: null,
                                name: null,
                                value: 0
                            },
                            {
                                id: null,
                                name: null,
                                value: 0
                            },
                            {
                                id: null,
                                name: null,
                                value: 0
                            },
                            {
                                id: null,
                                name: null,
                                value: 0
                            },
                        ],
                goalkeeper:
                    {
                        id: null,
                        name: null,
                        value: 0
                    }
            };
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.getOwnTeam = this.getOwnTeam.bind(this);
            this.getMarket = this.getMarket.bind(this);
            this.getOwnData = this.getOwnData.bind(this);
            this.sellGK = this.sellGK.bind(this);
            this.sellPlayer = this.sellPlayer.bind(this);
            this.saveTeam = this.saveTeam.bind(this);
            this.sellAll = this.sellAll.bind(this);
        }

      sellAll(){
          let oldValue = this.state.teamValue;
          let ownCoins = this.state.coins;
          ownCoins += oldValue;
          this.setState({'coins':ownCoins});
          this.setState({'goalkeeper':{id: null,name: null,value: 0}});
          this.setState({'teamValue':0});
          let players = [];
          for(let i =0;i<4;i++){
              players.push({
                  id: null,
                  name: null,
                  value: 0
                });
          }
          this.setState({'players':players});
      }

      saveTeam(){
          const data = new FormData();
          data.append('players', this.state.goalkeeper.id);
          for(let p in this.state.players){
              data.append('players', this.state.players[p].id);
          }
          axios({
              headers: {
                  authorization: "Bearer "+localStorage.getItem("token")
              },
              method: 'put',
              url: '/teams/me',
              data: data
          })
          .then(function(response) {
              swal("Sucesso!", "Você alterou a escalação do seu time com sucesso!", "success")
              .then((value) => {
                window.location.reload();
              });
          })
          .catch(function(error) {
              swal("Oops!", error.response.data.error, "error");
          })
      }

      handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
        var change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
      }

      sellPlayer(index){
          let newValue = this.state.teamValue;
          let ownCoins = this.state.coins;
          newValue -= this.state.players[index].value;
          ownCoins += this.state.players[index].value;
          let players = this.state.players;
          players[index] = {id: null,name: null,value: 0};
          this.setState({'players':players});
          this.setState({'teamValue':newValue});
          this.setState({'coins':ownCoins});
      }

      sellGK(){
          let newValue = this.state.teamValue;
          let ownCoins = this.state.coins;
          newValue -= this.state.goalkeeper.value;
          ownCoins += this.state.goalkeeper.value;
          this.setState({'goalkeeper':{id: null,name: null,value: 0}});
          this.setState({'teamValue':newValue});
          this.setState({'coins':ownCoins});
      }

      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('name', this.state.teamName);
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'put',
            url: '/teams/me/name',
            data: data
        })
        .then(function(response) {
            swal("Sucesso!", "Você alterou o nome do seu time com sucesso!", "success");
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }

    render() {
        const players = this.state.players;
        const goalkeeper = this.state.goalkeeper;
        return (
            <div className="animated fadeIn" style={{fontFamily: 'Lato', paddingTop: '10px'}}>
                <Row>
                    <Col xs="12" sm="12" lg="12" className="text-center">
                        <Banner title={this.state.marketTitle}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="12" className="text-center" style={{marginTop: '15px', marginBottom: '15px'}}>
                        <form method="post" onSubmit={this.handleSubmit}>
                            <Row>
                                <Col xs="8" sm="8" lg="8">
                                    <Input type="text" size="lg"  name="teamName" onChange={this.handleChange.bind(this)} value={this.state.teamName} placeholder="Nome do seu time"/>
                                </Col>
                                <Col xs="4" sm="4" lg="4">
                                    <Button color="success" size="lg" type="submit" className="px-4 pull-left" style={{width:'100%'}} outline>Alterar</Button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" lg="8">
                        <Banner title="ESCALE SEU TIME" fontWeight="bold" backgroundColor="primary"/>
                        <ReactTable
                        getTdProps={(state, row, col, instance) => ({
                          onClick: (event, cb) => {
                              if(row.original.position=="Goleiro" && !this.state.goalkeeper.id){
                                  let newValue = this.state.teamValue;
                                  let ownCoins = this.state.coins;
                                  newValue += row.original.value;
                                  ownCoins -= row.original.value;
                                  this.setState({"goalkeeper":{'id':row.original.id,'name':row.original.name,'value':row.original.value}});
                                  this.setState({'teamValue':newValue});
                                  this.setState({'coins':ownCoins});
                              }
                              if(row.original.position=="Linha"){
                                  let index = -1;
                                  let unique = true;
                                  for(let p in this.state.players){
                                      if(!this.state.players[p].id){
                                          index = p;
                                          break;
                                      }
                                  }
                                  for(let p in this.state.players){
                                      if(this.state.players[p].id==row.original.id){
                                          unique = false;
                                      }
                                  }
                                  if(index>=0&&unique){
                                      let newValue = this.state.teamValue;
                                      let ownCoins = this.state.coins;
                                      newValue += row.original.value;
                                      ownCoins -= row.original.value;
                                      let players = this.state.players;
                                      players[index] = {
                                          id: row.original.id,
                                          name: row.original.name,
                                          value: row.original.value
                                      }
                                      this.setState({"players":players});
                                      this.setState({'teamValue':newValue});
                                      this.setState({'coins':ownCoins});
                                  }
                              }
                          }
                        })}
                          style={{marginBottom: '10px'}}
                          data={this.state.tableData}
                          columns={columns}
                          filterable
                          defaultPageSize={10}
                          defaultFilterMethod={(filter, row) => String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase())}
                          onFetchData={(state, instance) => {
                              axios({
                                  method: 'get',
                                  url: '/players/active',
                                  headers:{
                                      'authorization':"Bearer "+localStorage.getItem("token")
                                  }
                              })
                              .then(response => {
                                  console.log(response.data);
                                  let newData = [];
                                  for(let player of response.data){
                                      newData.push({
                                          'id': player.id,
                                          'name': player.name,
                                          'rep': player.republic.name,
                                          'position': player.position,
                                          'value': player.value,
                                          'average': player.average,
                                          'last': player.last
                                        });
                                      //this.state.tableData.push(newData);
                                  }
                                  this.setState({
                                      tableData: newData
                                  })
                              })
                              .catch(function(error) {
                                  console.log(error);
                                  if (error.response.status === 401) {
                                      console.log('unauthorized, logging out ...');
                                      //localStorage.removeItem("token");
                                      //window.location.replace('/#/home');
                                      return;
                                  }
                                  swal("Oops!", error.response.data.error, "error");
                              });
                          }}
                          //className="-striped -highlight"
                        />
                        <Banner title="PONTUAÇÃO NA TEMPORADA: " fontSize="large" boldTitle={this.state.totalPoints} fontWeight="normal" backgroundColor="primary"/>
                        <Banner title="ÚLTIMA PONTUAÇÃO: " fontSize="large" boldTitle={this.state.lastPoints} fontWeight="normal" backgroundColor="primary"/>
                        <Banner title="PATRIMÔNIO: " fontSize="large" boldTitle={"D$"+this.state.coins.toFixed(2)} fontWeight="normal" backgroundColor="primary"/>
                    </Col>
                    <Col xs="12" sm="12" lg="4">
                        <Row style={{paddingLeft: '15px',paddingRight: '15px'}}>
                            <Banner title="SEU TIME" fontWeight="bold" backgroundColor="primary"/>
                            <Col xs="12" sm="12" lg="12" style={fieldStyle}>
                                <Row className="text-center" style={{color:"#FFF",marginBottom:'45px',marginTop:'30px', minHeight: '48px'}}>
                                    <Col xs="12" sm="12" lg="12">
                                        <b>{players[3].name}</b>
                                        <br/>
                                        {
                                            players[3].id
                                            ? <button className="btn btn-danger" onClick={()=>{this.sellPlayer(3)}} style={{padding: '0px 12px'}}>Vender</button>
                                            : null
                                        }
                                    </Col>
                                </Row>
                                <Row className="text-center" style={{color:"#FFF",marginBottom:'45px', minHeight: '48px'}}>
                                    <Col xs="12" sm="12" lg="12">
                                        <b>{players[2].name}</b>
                                        <br/>
                                        {
                                            players[2].id
                                            ? <button className="btn btn-danger" onClick={()=>{this.sellPlayer(2)}} style={{padding: '0px 12px'}}>Vender</button>
                                            : null
                                        }
                                    </Col>
                                </Row>
                                <Row className="text-center" style={{color:"#FFF",marginBottom:'45px', minHeight: '48px'}}>
                                    <Col xs="12" sm="12" lg="12">
                                        <b>{players[1].name}</b>
                                        <br/>
                                        {
                                            players[1].id
                                            ? <button className="btn btn-danger" onClick={()=>{this.sellPlayer(1)}} style={{padding: '0px 12px'}}>Vender</button>
                                            : null
                                        }
                                    </Col>
                                </Row>
                                <Row className="text-center" style={{color:"#FFF",marginBottom:'45px', minHeight: '48px'}}>
                                    <Col xs="12" sm="12" lg="12">
                                        <b>{players[0].name}</b>
                                        <br/>
                                        {
                                            players[0].id
                                            ? <button className="btn btn-danger" onClick={()=>{this.sellPlayer(0)}} style={{padding: '0px 12px'}}>Vender</button>
                                            : null
                                        }
                                    </Col>
                                </Row>
                                <Row className="text-center" style={{color:"#FFF",marginBottom:'25px', minHeight: '48px'}}>
                                    <Col xs="12" sm="12" lg="12">
                                        <b>{goalkeeper.name}</b>
                                        <br/>
                                        {
                                            goalkeeper.id
                                            ? <button className="btn btn-danger" onClick={this.sellGK} style={{padding: '0px 12px'}}>Vender</button>
                                            : null
                                        }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Banner title="PREÇO DO TIME: " fontSize="large" boldTitle={"D$"+this.state.teamValue.toFixed(2)} fontWeight="normal" backgroundColor="info"/>
                        <Row>
                            <Col xs="6" sm="6" lg="6" style={{paddingRight:'5px'}}>
                                <button style={{padding: '10px'}} onClick={this.saveTeam} className="btn btn-block btn-success">Salvar</button>
                            </Col>
                            <Col xs="6" sm="6" lg="6" style={{paddingLeft:'5px'}}>
                                <button style={{padding: '10px'}} onClick={this.sellAll} className="btn btn-block btn-danger">Vender Todos</button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Team;
