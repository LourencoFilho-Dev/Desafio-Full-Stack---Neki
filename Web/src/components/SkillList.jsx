import React from 'react';
import skillService from '../services/skillService';

const SkillList = ({ skills, setSkills }) => {
  const handleLevelChange = async (id, newLevel) => {
    await skillService.updateSkillLevel(id, newLevel);
    setSkills((prevSkills) =>
      prevSkills.map((skill) => (skill.id === id ? { ...skill, level: newLevel } : skill))
    );
  };

  const handleDelete = async (id) => {
    await skillService.deleteSkill(id);
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <div key={skill.id} className="skill-item">
          <img src={skill.image} alt={skill.name} />
          <h3>{skill.name}</h3>
          <p>{skill.description}</p>
          <input
            type="text"
            value={skill.level}
            onChange={(e) => handleLevelChange(skill.id, e.target.value)}
          />
          <button onClick={() => handleDelete(skill.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default SkillList;
