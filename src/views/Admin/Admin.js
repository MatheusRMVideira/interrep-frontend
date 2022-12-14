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
  Table,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

const hidden = {
  display: 'none'
}

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
          showingPlayersTable: true,
          showingRepublicsTable: true,
          showingGamesTable: true,
          showingNewPlayer: false,
          showingNewGame: false,
          players: [],
          republics: [],
          games: [],
          newPlayerName: "",
          newPlayerRepublicId: 0,
          newPlayerPosition: "Goleiro",
          newPlayerValue: "",
          newPlayerBenched: "False",
          newGameRepublicHomeId: 0,
          newGameRepublicAwayId: 0,
          newGameTime: "",
          newGamePlace: "",
          marketOpen: false,
          marketDeadline: 0,
          marketNewDeadline: ""
        };

        this.getPlayers = this.getPlayers.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitNewPlayer = this.handleSubmitNewPlayer.bind(this);
        this.handleSubmitNewGame = this.handleSubmitNewGame.bind(this);
        this.getMarket = this.getMarket.bind(this);
        this.toogleMarket = this.toogleMarket.bind(this);
        this.updateMarketDeadline = this.updateMarketDeadline.bind(this);
    }

  componentDidMount(){
    this.getGames();
    this.getMarket();
  }

  handleSubmitNewPlayer(event){
    event.preventDefault();
    let data = new FormData();
    data.append('name', this.state.newPlayerName);
    data.append('republic_id', this.state.newPlayerRepublicId);
    data.append('position', this.state.newPlayerPosition);
    data.append('value', this.state.newPlayerValue);
    data.append('benched', this.state.newPlayerBenched);
    axios({
        headers: {
            authorization: "Bearer "+localStorage.getItem("token")
        },
        method: 'post',
        url: '/players/',
        data: data
    })
    .then(function(response) {
        swal("Sucesso!", "Voc?? criou um novo jogador com sucesso!", "success")
        .then((value) => {
          window.location.reload();
        });
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  handleSubmitNewGame(event){
    event.preventDefault();
    let data = new FormData();
    data.append('republic_home_id', this.state.newGameRepublicHomeId);
    data.append('republic_away_id', this.state.newGameRepublicAwayId);
    data.append('time', this.state.newGameTime);
    data.append('place', this.state.newGamePlace);
    axios({
        headers: {
            authorization: "Bearer "+localStorage.getItem("token")
        },
        method: 'post',
        url: '/games/',
        data: data
    })
    .then(function(response) {
        swal("Sucesso!", "Voc?? criou uma nova partida com sucesso!", "success")
        .then((value) => {
          window.location.reload();
        });
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  handleChange(e) {
    //console.log(this.state);
    // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name] = e.target.value }
    var change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  createRepublic(){
    swal({
      text: 'Digite o nome da rep??blica',
      content: "input",
      button: {
        text: "Criar!",
        closeModal: false,
      },
    })
    .then(name => {
      if(!name){
        swal.close();
        return;
      }
      let data = new FormData();
      data.append('name', name);
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'post',
          url: '/republics/',
          data: data
      })
      .then(function(response) {
          swal("Sucesso!", "Voc?? criou uma nova rep??blica com sucesso!", "success")
            .then((value) => {
              window.location.reload();
            });
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    });
  }

  modifyRepublic(republic_id){
    swal({
      text: 'Digite o nome da rep??blica',
      content: "input",
      button: {
        text: "Novo nome!",
        closeModal: false,
      },
    })
    .then(name => {
      if(!name){
        swal.close();
        return;
      }
      let data = new FormData();
      data.append('name', name);
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'put',
          url: '/republics/'+republic_id,
          data: data
      })
      .then(function(response) {
          swal("Sucesso!", "Voc?? alterou o nome da rep??blica com sucesso!", "success")
            .then((value) => {
              window.location.reload();
            });
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    });
  }

  setGameScore(game_id){
    swal({
      text: 'Digite o placar do time da casa',
      content: "input",
      button: {
        text: "Confirmar",
        closeModal: false,
      },
    })
    .then(score_home => {
      if(!score_home){
        swal.close();
        return;
      }


      swal({
        text: 'Digite o placar do time visitante',
        content: "input",
        button: {
          text: "Confirmar",
          closeModal: false,
        },
      })
      .then(score_away => {
        if(!score_away){
          swal.close();
          return;
        }


        let data = new FormData();
        data.append('score_home', score_home);
        data.append('score_away', score_away);
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'put',
            url: '/games/'+game_id,
            data: data
        })
        .then(function(response) {
            swal("Sucesso!", "Voc?? alterou o placar com sucesso!", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })


      });







    });
  }

  scorePlayer(player_id){
    swal({
      text: 'Digite a pontua????o do jogador',
      content: "input",
      button: {
        text: "Atribuir pontua????o!",
        closeModal: false,
      },
    })
    .then(score => {
      if(!score){
        swal.close();
        return;
      }
      let data = new FormData();
      data.append('points', score);
      data.append('players', player_id);
      axios({
          headers: {
              authorization: "Bearer "+localStorage.getItem("token")
          },
          method: 'put',
          url: '/players/scores',
          data: data
      })
      .then(function(response) {
          swal("Sucesso!", "Voc?? atribuiu uma pontua????o a esse jogador!", "success")
            .then((value) => {
              window.location.reload();
            });
      })
      .catch(function(error) {
          swal("Oops!", error.response.data.error, "error");
      })
    });
  }

  benchPlayer(player_id){
    axios({
        headers: {
            authorization: "Bearer "+localStorage.getItem("token")
        },
        method: 'put',
        url: '/players/'+player_id+'/bench'
    })
    .then((response) => {
      swal("Sucesso!", "O jogador foi modificado com sucesso!", "success")
        .then((value) => {
          window.location.reload();
        });
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
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
      let market = response.data;
      this.setState({'marketOpen':market.open});
      this.setState({'marketDeadline':market.deadline});
      console.log(market);
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  getPlayers(republic_id){
    axios({
        headers: {
            authorization: "Bearer "+localStorage.getItem("token")
        },
        method: 'get',
        url: '/republics/'+republic_id
    })
    .then((response) => {
      let players = response.data.players;
      players = players.map((p)=>{
        p.benched ? p.benched = "N??o" : p.benched = "Sim";
        return p;
      });
      this.setState({'players':players});
      console.log(players);
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  getGames(){
    axios({
        headers: {
            authorization: "Bearer "+localStorage.getItem("token")
        },
        method: 'get',
        url: '/games/'
    })
    .then((response) => {
      let games = response.data;
      games = games.map((g)=>{
        g.republic_home = g.republic_home.name;
        g.republic_away = g.republic_away.name;
        return g;
      });
      this.setState({'games':games});
      console.log(games);
    })
    .catch(function(error) {
        swal("Oops!", error.response.data.error, "error");
    })
  }

  deletePlayer(id){
    swal({
      title: "Aten????o",
      text: "Apagar um jogador afetar?? todos os times em que ele est?? escalado! N??O APAGUE O JOGADOR SE O SISTEMA J?? TIVER OUTROS USU??RIOS!!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        console.log(id);
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'delete',
            url: '/players/'+id
        })
        .then(function(response) {
            swal("Sucesso!", "O jogador foi exclu??do com sucesso!", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }
    });
  }

  updateMarketDeadline(){
    swal({
      title: "Aten????o",
      text: "Voc?? deseja alterar a data de fechamento do mercado?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        let data = new FormData();
        data.append('deadline', Date.parse(this.state.marketNewDeadline)/1000);
        axios({
            data: data,
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'put',
            url: '/market/deadline'
        })
        .then(function(response) {
            swal("Sucesso!", "Data alterada com sucesso", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }
    });
  }

  toogleMarket(){
    swal({
      title: "Aten????o",
      text: "Voc?? deseja alterar o estado do mercado?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'put',
            url: '/market/'
        })
        .then(function(response) {
            swal("Sucesso!", "Estado alterado com sucesso", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }
    });
  }

  deleteGame(id){
    swal({
      title: "Aten????o",
      text: "Voc?? deseja apagar essa partida?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        console.log(id);
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'delete',
            url: '/games/'+id
        })
        .then(function(response) {
            swal("Sucesso!", "Partida apagada com sucesso!", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }
    });
  }

  deleteRepublic(id){
    swal({
      title: "Aten????o",
      text: "Apagar uma rep??blica apagar?? tamb??m todos seus jogadores! N??O APAGUE A REP??BLICA SE O SISTEMA J?? TIVER OUTROS USU??RIOS!!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        console.log(id);
        axios({
            headers: {
                authorization: "Bearer "+localStorage.getItem("token")
            },
            method: 'delete',
            url: '/republics/'+id
        })
        .then(function(response) {
            swal("Sucesso!", "A rep??blica foi exclu??da com sucesso!", "success")
              .then((value) => {
                window.location.reload();
              });
        })
        .catch(function(error) {
            swal("Oops!", error.response.data.error, "error");
        })
      }
    });
  }

  render() {
    return (
      <div className="animated fadeIn" style={{fontFamily: 'Lato', paddingTop: '10px'}}>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <h2>Painel de Administra????o</h2>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="12" lg="12">
            {
              this.state.marketDeadline > 0 ?
                this.state.marketOpen
                  ? <Button color="danger" style={{marginBottom: '5px'}} size="lg" onClick={()=>{this.toogleMarket()}} block>Fechar mercado</Button>
                  : <Button color="success" style={{marginBottom: '5px'}} size="lg" onClick={()=>{this.toogleMarket()}} block>Abrir mercado</Button>
              : <span></span>
            }
          </Col>
        </Row>
        <Row>
            <Col xs="4" sm="4" lg="4">
                <Input type="datetime-local" onClick={()=>{console.log(this.state.marketNewDeadline)}} size="lg" style={{marginBottom: '5px'}}  name="marketNewDeadline" onChange={this.handleChange.bind(this)} value={this.state.marketNewDeadline}/>
            </Col>
            <Col xs="8" sm="8" lg="8">
                <Button color="success" size="lg" type="submit" className="px-4 pull-left" style={{width:'100%'}} onClick={()=>{this.updateMarketDeadline()}} outline>Atualizar data de fechamento do mercado</Button>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm="12" lg="12" className="text-center">
            <Button color="success" style={{marginBottom: '5px'}} onClick={()=>{this.createRepublic()}} size="lg" block>Adicionar Rep??blica</Button>
            <Banner title="Rep??blicas" onClick={()=>{this.setState({'showingRepublicsTable':!this.state.showingRepublicsTable})}}/>
            <div className="animated fadeIn fadeOut" style={this.state.showingRepublicsTable ? null : hidden}>
                <ReactTable
                  getTdProps={(state, row, col, instance) => ({
                    onClick: (event, cb) => {
                      this.getPlayers(row.original.id);
                      }
                  })}
                  style={{marginBottom: '10px'}}
                  data={this.state.republics}
                  columns={[
                      {
                          Header: 'Nome',
                          accessor: 'name'
                      },
                      {
                          Header: 'Jogadores',
                          accessor: 'playercount'
                      },
                      {
                          Header: 'A????o',
                          accessor: 'id',
                          minWidth: 190,
                          Cell: row => (
                            <div>
                            <button className="btn btn-warning" onClick={()=>{this.modifyRepublic(row.value)}} style={{marginRight: '5px'}}>
                              <i className="icon-pencil"></i> Editar
                            </button>
                              <button className="btn btn-danger" onClick={()=>{this.deleteRepublic(row.value)}}>
                                <i className="icon-trash"></i> Excluir
                              </button>
                            </div>
                              )
                      }
                  ]}
                  filterable
                  defaultPageSize={10}
                  defaultFilterMethod={(filter, row) => String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase())}
                  onFetchData={(state, instance) => {
                      axios({
                          method: 'get',
                          url: '/republics/',
                          headers:{
                              'authorization':"Bearer "+localStorage.getItem("token")
                          }
                      })
                      .then(response => {
                          console.log(response.data);
                          let newData = [];
                          for(let republic of response.data){
                              newData.push({
                                  'id': republic.id,
                                  'name': republic.name,
                                  'playercount': republic.players.length
                                });
                              //this.state.tableData.push(newData);
                          }
                          this.setState({
                              republics: newData
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
              </div>
            </Col>
            <Col xs="12" sm="12" lg="12" className="text-center">
                <Button color="success" style={{marginBottom: '5px'}} onClick={()=>{this.setState({'showingNewPlayer':!this.state.showingNewPlayer})}} size="lg"  block>Adicionar Jogador</Button>
                <div className="animated fadeIn fadeOut" style={this.state.showingNewPlayer ? null : hidden}>
                  <form method="post" onSubmit={this.handleSubmitNewPlayer} style={{marginBottom: '10px', paddingTop: '10px'}}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="newPlayerName" value={this.state.newPlayerName} onChange={this.handleChange.bind(this)} placeholder="Nome do jogador"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-home"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select name="newPlayerRepublicId" className="form-control" value={this.state.newPlayerRepublicId} onChange={this.handleChange.bind(this)}>
                        <option value="0">Selecione uma rep??blica</option>
                        {
                          this.state.republics.map((r)=>(
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))
                        }
                      </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-compass"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select name="newPlayerPosition" className="form-control" value={this.state.newPlayerPosition} onChange={this.handleChange.bind(this)}>
                        <option value="Goleiro">Goleiro</option>
                        <option value="Linha">Linha</option>
                      </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-star"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="newPlayerValue" value={this.state.newPlayerValue} onChange={this.handleChange.bind(this)} placeholder="Valor"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select name="newPlayerBenched" className="form-control" value={this.state.newPlayerBenched} onChange={this.handleChange.bind(this)}>
                        <option value="False">Ativo</option>
                        <option value="True">No Banco</option>
                      </select>
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button color="primary" type="submit" block>Criar</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
                <Banner title="Jogadores" onClick={()=>{this.setState({'showingPlayersTable':!this.state.showingPlayersTable})}}/>
                <div className="animated fadeIn fadeOut" style={this.state.showingPlayersTable ? null : hidden}>
                  <ReactTable
                    style={{marginBottom: '10px'}}
                    data={this.state.players}
                    columns={[
                        {
                            Header: 'Nome',
                            accessor: 'name'
                        },
                        {
                            Header: 'Posi????o',
                            accessor: 'position'
                        },
                        {
                            Header: 'Ativo',
                            accessor: 'benched'
                        },
                        {
                            Header: 'Valor',
                            accessor: 'value'
                        },
                        {
                            Header: '??ltima',
                            accessor: 'last'
                        },
                        {
                            Header: 'M??dia',
                            accessor: 'average'
                        },
                        {
                            Header: 'N?? de pontua????es',
                            accessor: 'points.length'
                        },
                        {
                            Header: 'A????o',
                            accessor: 'id',
                            minWidth: 360,
                            Cell: row => (
                              <div>
                              <button className={row.original.benched=="Sim" ? "btn btn-danger" : "btn btn-success"} style={{marginRight: '5px'}} onClick={()=>{console.log(row);this.benchPlayer(row.value)}}>
                                <i className="icon-pencil"></i> {row.original.benched=="Sim" ? "Desativar" : "Ativar"}
                              </button>
                              <button className="btn btn-danger" style={{marginRight: '5px'}} onClick={()=>{this.deletePlayer(row.value)}}>
                                <i className="icon-trash"></i> Excluir
                              </button>
                              <button className="btn btn-info" onClick={()=>{this.scorePlayer(row.value)}}>
                                <i className="icon-energy"></i> Nova pontua????o
                              </button>
                              </div>
                                )
                        }
                    ]}
                    filterable
                    defaultPageSize={10}
                    defaultFilterMethod={(filter, row) => String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase())}
                  />
                </div>

            </Col>



            <Col xs="12" sm="12" lg="12" className="text-center">
                <Button color="success" style={{marginBottom: '5px'}} onClick={()=>{this.setState({'showingNewGame':!this.state.showingNewGame})}} size="lg"  block>Adicionar Partida</Button>
                <div className="animated fadeIn fadeOut" style={this.state.showingNewGame ? null : hidden}>
                  <form method="post" onSubmit={this.handleSubmitNewGame} style={{marginBottom: '10px', paddingTop: '10px'}}>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select name="newGameRepublicHomeId" className="form-control" value={this.state.newGameRepublicHomeId} onChange={this.handleChange.bind(this)}>
                        <option value="0">Selecione uma rep??blica (time da casa)</option>
                        {
                          this.state.republics.map((r)=>(
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))
                        }
                      </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-home"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <select name="newGameRepublicAwayId" className="form-control" value={this.state.newGameRepublicAwayId} onChange={this.handleChange.bind(this)}>
                        <option value="0">Selecione uma rep??blica (time visitante)</option>
                        {
                          this.state.republics.map((r)=>(
                            <option key={r.id} value={r.id}>{r.name}</option>
                          ))
                        }
                      </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-star"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="newGameTime" value={this.state.newGameTime} onChange={this.handleChange.bind(this)} placeholder="Dia/Hor??rio do jogo (Ex: 02/06/2018 - 18:00)"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="newGamePlace" value={this.state.newGamePlace} onChange={this.handleChange.bind(this)} placeholder="Local do jogo (Ex: Gin??sio Municipal)"/>
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button color="primary" type="submit" block>Criar</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
                <Banner title="Partidas" onClick={()=>{this.setState({'showingGamesTable':!this.state.showingGamesTable})}}/>
                <div className="animated fadeIn fadeOut" style={this.state.showingGamesTable ? null : hidden}>
                  <ReactTable
                    style={{marginBottom: '10px'}}
                    data={this.state.games}
                    columns={[
                        {
                            Header: 'Time da casa',
                            accessor: 'republic_home'
                        },
                        {
                            Header: 'Time visitante',
                            accessor: 'republic_away'
                        },
                        {
                            Header: 'Gols (Casa)',
                            accessor: 'score_home'
                        },
                        {
                            Header: 'Gols (Visitante)',
                            accessor: 'score_away'
                        },
                        {
                            Header: 'Dia/Hor??rio',
                            accessor: 'time'
                        },
                        {
                            Header: 'Local',
                            accessor: 'place'
                        },
                        {
                            Header: 'A????o',
                            accessor: 'id',
                            minWidth: 330,
                            Cell: row => (
                              <div>
                                <button className="btn btn-danger" style={{marginRight: '5px'}} onClick={()=>{this.deleteGame(row.value)}}>
                                  <i className="icon-trash"></i> Excluir
                                </button>
                                <button className="btn btn-info" style={{marginRight: '5px'}} onClick={()=>{this.setGameScore(row.value)}}>
                                  <i className="icon-energy"></i> Alterar placar
                                </button>
                              </div>
                                )
                        }
                    ]}
                    filterable
                    defaultPageSize={10}
                    defaultFilterMethod={(filter, row) => String(row[filter.id].toLowerCase()).includes(filter.value.toLowerCase())}
                  />
                </div>

            </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
