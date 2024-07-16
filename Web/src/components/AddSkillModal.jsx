import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddSkillModal = ({ closeModal }) => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await api.get('/available-skills');
      setSkills(response.data);
    };
    fetchSkills();
  }, []);

  const handleSave = async () => {
    await api.post('/skills', { skill: selectedSkill, level });
    closeModal();
  };

  return (
    <div>
      <select onChange={(e) => setSelectedSkill(e.target.value)}>
        {skills.map(skill => (
          <option key={skill.id} value={skill.id}>{skill.name}</option>
        ))}
      </select>
      <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level" />
      <button onClick={handleSave}>Salvar</button>
      <button onClick={closeModal}>Cancelar</button>
    </div>
  );
};

export default AddSkillModal;
