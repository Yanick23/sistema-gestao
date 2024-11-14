import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import logo from "../../../public/logoisutc-1.png";

import { useAuth } from "../../context/AuthContextTYpe";

const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  navigate: (path: string) => void,
  setError: (error: string) => void,
  login: (token: string) => void // Função para realizar o login
) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8080/usuarios/login", {
      email,
      password,
    });

    const { token } = response.data;
    login(token); // Armazena o token e as informações do usuário no contexto
    navigate("/admin"); // Redireciona para a página de administração
  } catch (err) {
    setError("Credenciais inválidas. Tente novamente.");
  }
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtendo a função de login do contexto

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleLogin(e, email, password, navigate, setError, login);
  };

  return (
    <div className="tela-login">
      <div className="base-card login-card">
        <div className="login-logo">
          <img src={logo} alt="Logo Laboratório Virtual" className="logo-img" />
        </div>
        <div className="login-info">
          <h6>Laboratotio Virtual</h6>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="form-control base-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control base-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="login-submit">
            <button type="submit" className="button-custom">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
