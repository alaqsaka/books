import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data2";
import PropTypes from "prop-types";

const Login = ({ loginSuccess }) => {
  const [error, seterror] = useState();
  const navigate = useNavigate();
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data.token);
      navigate("/");
    } else {
      seterror(data.message);
    }
  }

  return (
    <div>
      <h2>Masuk</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar terlebih dahulu.</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  loginSuccess: PropTypes.func,
};

export default Login;
