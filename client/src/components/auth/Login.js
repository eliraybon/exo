import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from '../../graphql/mutations';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      message: ''
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  updateCache(client, { data }) {
    console.log(data);
    client.writeData({
      data: { isLoggedIn: data.login.loggedIn }
    });
  }

  handleSubmit = (e, loginUser) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  demoLogin = (e, loginUser) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: 'demoUser',
        password: 'lola12'
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        onCompleted={data => {
          const { token } = data.login;
          localStorage.setItem("auth-token", token);
          this.props.history.push("/");
        }}
        onError={err => this.setState({ message: err.message })}
        update={(client, data) => this.updateCache(client, data)}
      >
        {loginUser => {
          return (<div className="container">
            <div className="placeholder-logo">EXO</div>

            <form 
              className="auth-form"
              onSubmit={e => this.handleSubmit(e, loginUser) }
            >
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
                className="auth-input"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
                className="auth-input"
              />
              <button>Log In</button>
            </form>
            <p>{this.state.message}</p>
          </div>)
        }}
      </Mutation>
    );
  }
}

export default Login;