import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddSkillModal from './AddSkillModal';
import SkillList from './SkillList';

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('/api/skills', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => setIsModalOpen(true)}>Add Skill</button>
      <SkillList skills={skills} setSkills={setSkills} />
      <AddSkillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setSkills={setSkills} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
