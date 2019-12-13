import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { LOGIN_USER } from '../../graphql/mutations';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "admin@gg.com",
      password: "123456",
      message: ""
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
        {(loginUser, { loading, error }) => {
          return (<div className="container">
            <form onSubmit={e => {
              e.preventDefault();
              loginUser({
                variables: {
                  email: this.state.email,
                  password: this.state.password
                }
              });
            }}
            >
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
            </form>
            {loading && <p>Loading...</p>}
            <p>{this.state.message}</p>
          </div>)
        }}
      </Mutation>
    );
  }
}

export default Login;