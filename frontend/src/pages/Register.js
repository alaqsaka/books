import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data2";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [listError, setListError] = useState([]);

  async function onRegisterHandler(user) {
    const { error, response } = await register(user);
    if (!error) {
      if (response.errors) {
        const listError = [];
        for (let err of Object.keys(response.errors)) {
          for (let errMessage of Object.values(response.errors[err])) {
            listError.push(errMessage);
          }
        }
        setListError(listError);
        setError(response.errors);
      } else {
        setError(response.message);
      }
    } else {
      setError(false);
      navigate("/login");
    }
  }

  return (
    <section>
      <h2>Buat Akun Baru</h2>
      {error?.length > 1 ? (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      ) : (
        <>
          {listError.map((errMessage) => (
            <p style={{ color: "red", textAlign: "center" }}>{errMessage}</p>
          ))}
        </>
      )}

      <RegisterInput register={onRegisterHandler} />
      <p>
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </section>
  );
};

export default Register;
