import { Component } from "react";
import { Link } from "react-router-dom";
import userApi from "../../api/user";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      user: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    userApi.login(this.state).then((user) => {
      if (user) {
        this.setState({
          username: "",
          email: "",
          password: "",
          user,
        });

        // set user
        alert("SUCCESS");
      } else {
        alert("FAIL");
      }
    });
  };

  handleLogout = (event) => {
    event.preventDefault();

    userApi.logout().then((success) => {
      if (success) {
        this.setState({
          username: "",
          email: "",
          password: "",
          user: null,
        });

        alert("LOGGED OUT");
      } else {
        alert("Fail to log out");
      }
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
          <div className="buttons">
            <CustomButton type="submit">SIGN IN</CustomButton>
          </div>
        </form>
        {this.state.user ? (
          <div className="buttons">
            <CustomButton onClick={this.handleLogout}>SIGN OUT</CustomButton>
          </div>
        ) : null}
      </div>
    );
  }
}
