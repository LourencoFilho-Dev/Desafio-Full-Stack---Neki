package com.example.skillmanagement.service;

import com.example.skillmanagement.model.User;
import com.example.skillmanagement.model.Skill;
import com.example.skillmanagement.model.UserSkill;
import com.example.skillmanagement.repository.UserRepository;
import com.example.skillmanagement.repository.SkillRepository;
import com.example.skillmanagement.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserSkillService {
    @Autowired
    private UserSkillRepository userSkillRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    public List<UserSkill> findByUserId(Long userId) {
        return userSkillRepository.findByUserId(userId);
    }

    public UserSkill save(UserSkill userSkill) {
        return userSkillRepository.save(userSkill);
    }

    public void delete(Long id) {
        userSkillRepository.deleteById(id);
    }

    public UserSkill findById(Long id) {
        return userSkillRepository.findById(id).orElse(null);
    }

    public UserSkill associateSkillToUser(Long userId, Long skillId, String level) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new RuntimeException("Skill not found"));

        UserSkill userSkill = new UserSkill();
        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setLevel(level);

        return userSkillRepository.save(userSkill);
    }

    public UserSkill updateSkillLevel(Long userSkillId, String level) {
        UserSkill userSkill = userSkillRepository.findById(userSkillId).orElseThrow(() -> new RuntimeException("UserSkill not found"));
        userSkill.setLevel(level);
        return userSkillRepository.save(userSkill);
    }
}
