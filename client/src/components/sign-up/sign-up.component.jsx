import { Component } from "react";
import { Link } from "react-router-dom";

import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import usersApi from "../../api/user";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      });
    } catch (error) {
      console.log("Failed to sign up, ", error.message);
      return;
    }
  };

  register = () => {
    usersApi.register(username, password).then(() => {
      alert("Successfully registered");
    });
  };

  render() {
    return (
      <div className="sign-in">
        <Link to="/" className="back-to-home">
          <strong>&#8592;</strong>BACK TO HOME
        </Link>
        <p className="title">
          <strong>Register</strong> below
        </p>
        <p className="subtitle">
          Already have an account? <Link to="/signin">Login</Link>
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
            type="email"
            label="EMAIL"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            label="PASSWORD"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            label="CONFIRM PASSWORD"
            name="confirmPassword"
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
          />
          <div className="buttons" onclick={register}>
            <CustomButton type="submit">SIGN UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
