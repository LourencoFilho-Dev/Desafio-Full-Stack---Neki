import React, { useState, useEffect } from 'react';
import skillService from '../services/skillService';

const SkillModal = ({ onClose, setSkills }) => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      const options = await skillService.getSkillOptions();
      setSkillOptions(options);
    };
    fetchSkills();
  }, []);

  const handleSave = async () => {
    const newSkill = await skillService.addSkill({ skill: selectedSkill, level });
    setSkills((prevSkills) => [...prevSkills, newSkill]);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Skill</h2>
      <select onChange={(e) => setSelectedSkill(e.target.value)}>
        {skillOptions.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SkillModal;
