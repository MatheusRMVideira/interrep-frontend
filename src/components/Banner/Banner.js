import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

class Banner extends Component {

    constructor () {
            super();
            this.state = {
                backgroundColor: '#2B4777',
                borderColor: '#2a4778',
                fontWeight: 'normal',
                color: '#FFFFFF',
                fontSize: 'x-large'
                }
        }

    componentDidMount(){
        if(this.props.backgroundColor){
            this.state.backgroundColor = this.props.backgroundColor;
        }
        if(this.props.backgroundColor=="primary"){
            this.state.backgroundColor = "#20A8D8";
            this.state.borderColor = "#1e9ecb";
        }
        if(this.props.backgroundColor=="success"){
            this.state.backgroundColor = "#00C06D";
            this.state.borderColor = "#3a9d5d";
        }
        if(this.props.backgroundColor=="danger"){
            this.state.backgroundColor = "#f64846";
            this.state.borderColor = "#f63c3a";
        }
        if(this.props.backgroundColor=="info"){
            this.state.backgroundColor = "#63c2de";
            this.state.borderColor = "#63c2de";
            this.state.color = "#000000";
        }
        if(this.props.fontSize){
            this.state.fontSize = this.props.fontSize;
        }
    }

  render(){
    return (
      <h4 onClick={this.props.onClick} className="text-center" style={{fontSize: this.state.fontSize, color: this.state.color,width: '100%',fontWeight: this.state.fontWeight, fontFamily: 'Lato',backgroundColor: this.state.backgroundColor, padding: '8px', borderStyle: 'solid', borderWidth: '1px', borderColor: this.state.borderColor}}>{this.props.title}<b>{this.props.boldTitle}</b></h4>
    );
  }
}

export default Banner;
