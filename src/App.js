import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Input from './Input';
import { connect } from 'react-redux';
import Table from './Table';



const mapStateToProps = (state) => {
  return {
    globallogin: state.login,
    globallogincredentials: state.logincredentials,
    globalemployee: state.employees,
    globalloginmessage: state.loginmessage,
    globalloading: state.loading
  }
}
const mapDispachToProps = (dispach) => {
  return {
    login: () => dispach((dispach) => {
      dispach({ type: "loading" });
     let getfile = async () => {
        let response = await fetch("./employes.json");

        if (response.ok) {
          let userData = await response.json();
          return Promise.resolve(userData);
        }
        else
          return Promise.reject("Failed to load Table");
      }
      getfile().then((resp) => {
        let data = resp.user;
          dispach({ type: "login", value: data })
      })
      .catch((m) => {
       
          dispach({ type: "login", value: m })
        
      })

    }),
    logout: () => dispach({ type: 'logout' }),
    wrongpassword: () => dispach({ type: 'wrongpassword' })
  }
}

class App extends Component {

  constructor() {
    super();
    this.coloumheader= [];
  }


  username = (e) => {
    let target = e.target;
    this.tempuser = target.value;
  }
  password = (e) => {
    let target = e.target;
    this.temppassword = target.value;
    console.log(this.temppassword);
  }
  login = () => {
    if (this.temppassword == this.props.globallogincredentials.password && this.tempuser == this.props.globallogincredentials.username) {
      this.props.login();
    }
    else {
      this.props.wrongpassword();
    }
  }
  logout = () => {
    this.props.logout();
  }

  render() {
    return (
      <Router>
        <div className="App" onLoad={this.inactive} onMouseMove={this.active}>
          <Route path="/" exact strict render={
            () => {
              return this.props.globallogin ? (<Redirect to={`/home/${this.tempuser}`} />) :
                (<div id="inactive" >
                  <div id="inner_inactive">
                    {this.props.globalloading ?
                      (<>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>loading...</h1>
                      </>) : (
                        <>
                          <label> LOG IN </label>
                          <div className="space"></div>
                          <div className="logincredential">
                            <span className="credential">Username</span>
                            <div className="space"></div>
                            <input id="username" onChange={this.username} type="text" />
                          </div>
                          <div className="space"></div>
                          <div className="logincredential">
                            <span className="credential">Password</span>
                            <div className="space"></div>
                            <input id="Password" onChange={this.password} type="password" />
                          </div>
                          <Input value="LOG IN" onclickfunction={this.login} />
                          <br />
                          <label>{this.props.globalloginmessage}</label>
                        </>)}
                  </div>
                </div>)
            }
          } />

          <Route path="/home/:username" exact strict render={
            (match) => {
              return (!this.props.globallogin) ? (<Redirect to="/" />) : (
                <header className="App-header">
                  <h1>Employee List</h1>
                  <img src={logo} className="App-logo" alt="logo" />

                  <br />
                    <Table></Table>
                  <br />
                  <Input value="Log Out" onclickfunction="logout" />

                </header>
              );

            }
          } />
        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App);
