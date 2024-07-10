import React from 'react';
import axios from 'axios';

const SkillList = ({ skills, setSkills }) => {
  const handleDeleteSkill = async (id) => {
    try {
      await axios.delete(`/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSkills(skills.filter(skill => skill.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditSkill = async (id, newLevel) => {
    try {
      const response = await axios.put(
        `/api/skills/${id}`,
        { level: newLevel },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSkills(skills.map(skill => (skill.id === id ? response.data : skill)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul>
      {skills.map(skill => (
        <li key={skill.id}>
          <img src={skill.imageUrl} alt={skill.name} />
          <span>{skill.name}</span>
          <input
            type="text"
            value={skill.level}
            onChange={(e) => handleEditSkill(skill.id, e.target.value)}
          />
          <button onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default SkillList;
