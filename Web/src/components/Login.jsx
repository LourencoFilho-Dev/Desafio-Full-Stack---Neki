import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [gravarSenha, setGravarSenha] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handleSenhaChange = (e) => setSenha(e.target.value);
  const toggleMostrarSenha = () => setMostrarSenha(!mostrarSenha);
  const handleGravarSenhaChange = (e) => {
    setGravarSenha(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('login', login);
      localStorage.setItem('senha', senha);
    } else {
      localStorage.removeItem('login');
      localStorage.removeItem('senha');
    }
  };

  const handleEntrar = async () => {
    try {
      const response = await api.post('/login', { login, senha });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Login ou senha inválidos');
    }
  };

  const handleCadastrar = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Login:</label>
        <input type="text" value={login} onChange={handleLoginChange} />
      </div>
      <div>
        <label>Senha:</label>
        <input type={mostrarSenha ? 'text' : 'password'} value={senha} onChange={handleSenhaChange} />
        <button onClick={toggleMostrarSenha}>{mostrarSenha ? 'Ocultar' : 'Mostrar'} Senha</button>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={gravarSenha} onChange={handleGravarSenhaChange} />
          Gravar Senha
        </label>
      </div>
      <button onClick={handleEntrar}>Entrar</button>
      <button onClick={handleCadastrar}>Cadastrar-se</button>
    </div>
  );
};

export default Login;
