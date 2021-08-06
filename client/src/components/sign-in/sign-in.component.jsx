import { Component } from "react";
import { Link } from "react-router-dom";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import usersApi from "../../api/user";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  login = () => {
    usersApi.login(username, password).then(() => {
      alert("Successfully login");
    });
  };

  render() {
    return (
      <div className="sign-in">
        <Link to="/" className="back-to-home">
          <strong>&#8592;</strong>BACK TO HOME
        </Link>
        <p className="title">
          <strong>Login</strong> below
        </p>
        <p className="subtitle">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="USERNAME"
            name="username"
            value={this.state.username}
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            label="PASSWORD"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <div className="buttons" onclick={login}>
            <CustomButton type="submit">SIGN IN</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
