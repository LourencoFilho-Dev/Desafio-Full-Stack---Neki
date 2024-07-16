import axios from 'axios';

const getSkills = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/skills', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const addSkill = async (skill) => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/skills', skill, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateSkillLevel = async (id, level) => {
  const token = localStorage.getItem('token');
  await axios.put(`/api/skills/${id}`, { level }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteSkill = async (id) => {
  const token = localStorage.getItem('token');
  await axios.delete(`/api/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getSkillOptions = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/skill-options', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const skillService = {
  getSkills,
  addSkill,
  updateSkillLevel,
  deleteSkill,
  getSkillOptions,
};

export default skillService;
