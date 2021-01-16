import React, { Fragment, Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

// class based component
class App extends React.Component {

  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
    
  }

  // search github users
  searchUsers = async text => {
    this.setState({ loading: true });
    console.log(text);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  }


  // Get single Github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false });
  }

  // Get user's repos
  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: res.data, loading: false });
  }

  // clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  // empty form field alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000)
  };

  render() {
    const { users, user, repos, loading } = this.state;

      return (
        <HashRouter basename='/'>
      <nav className="App">
        {/* referencing the nav class-based component */}
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={ props => (
            <Fragment>
              <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert}/>

            </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} 
              getUser={this.getUser} 
              getUserRepos={this.getUserRepos}
              user={user}
              repos={repos} 
              loading={loading}
              />
            )}/>
          </Switch>
          <Users loading={loading} users={users} />
        </div>
      </nav>
      </HashRouter>
    );
  }
  
}

export default App;
