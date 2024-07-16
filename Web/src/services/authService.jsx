import axios from 'axios';

const login = async (username, password) => {
  const response = await axios.post('/api/login', { username, password });
  localStorage.setItem('token', response.data.token);
};

const register = async (username, password) => {
  await axios.post('/api/register', { username, password });
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
