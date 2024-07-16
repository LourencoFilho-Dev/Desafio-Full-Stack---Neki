import React, { useState } from 'react';
import api from '../api';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
    try {
      await api.post('/register', { login, password });
      setMessage('Cadastro realizado com sucesso');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMessage('Erro ao realizar cadastro');
    }
  };

  return (
    <div>
      <h2>Cadastrar-se</h2>
      <div>
        <label>Login:</label>
        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Ocultar' : 'Mostrar'} Senha
        </button>
      </div>
      <div>
        <label>Confirmar Senha:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Salvar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
