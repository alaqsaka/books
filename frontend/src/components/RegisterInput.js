import React, { Component } from "react";
import PropTypes from "prop-types";

export default class RegisterInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onPasswordConfirmationChange =
      this.onPasswordConfirmationChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onPasswordConfirmationChange(event) {
    this.setState(() => {
      return {
        passwordConfirmation: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation,
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler} className="input-register">
        <input
          type="text"
          placeholder="Nama"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input
          type="password"
          placeholder="Password Confirmation"
          autoComplete="current-password"
          value={this.state.passwordConfirmation}
          onChange={this.onPasswordConfirmationChange}
        />
        {this.state.passwordConfirmation.length > 0 && (
          <>
            {this.state.password !== this.state.passwordConfirmation && (
              <p>Password tidak match</p>
            )}
          </>
        )}
        <button>Register</button>
      </form>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};
