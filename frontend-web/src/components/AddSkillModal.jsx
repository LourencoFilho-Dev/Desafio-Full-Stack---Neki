import React, { useState } from 'react';
import axios from 'axios';

const AddSkillModal = ({ isOpen, onClose, setSkills }) => {
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('');

  const handleAddSkill = async () => {
    try {
      const response = await axios.post(
        '/api/skills',
        { skill, level },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setSkills(prevSkills => [...prevSkills, response.data]);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Skill</h2>
        <select value={skill} onChange={(e) => setSkill(e.target.value)}>
          <option value="">Select Skill</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
        </select>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Level"
        />
        <button onClick={handleAddSkill}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddSkillModal;
