import React from 'react';
import { Mutation } from 'react-apollo';
import { REGISTER_USER } from '../../graphql/mutations';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      message: ''
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  updateCache(cache, { data }) {
    console.log(data);
    cache.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  handleSubmit = (e, registerUser) => {
    e.preventDefault();
    registerUser({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          console.log(data)
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
        }}
        onError={err => this.setState({ message: err.message })}
        update={(cache, data) => this.updateCache(cache, data)}
      >
        {registerUser => { 
          return (
            <div className="auth-div">
              <div className="placeholder-logo">EXO</div>

              <form 
                className="auth-form"
                onSubmit={ e => this.handleSubmit(e, registerUser) }
              >
                <input 
                  type="text" 
                  value={this.state.name} 
                  onChange={this.update("name")}
                  placeholder="Name"
                  className="auth-input"
                />

                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.update("email")}
                  placeholder="Email"
                  className="auth-input"
                />

                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  placeholder="Password"
                  className="auth-input"
                />

                <button className="auth-button">Sign Up</button>
              </form>
               <p>{this.state.message}</p>
            </div>
          )
        }}
      </Mutation>
    );
  }
}