package com.neki.skillmanagement.service;

import com.neki.skillmanagement.model.UserSkill;
import com.neki.skillmanagement.repository.UserSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSkillService {

    @Autowired
    private UserSkillRepository userSkillRepository;

    public List<UserSkill> getUserSkills(Long userId) {
        return userSkillRepository.findByUserId(userId);
    }

    public UserSkill addUserSkill(UserSkill userSkill) {
        return userSkillRepository.save(userSkill);
    }

    public UserSkill updateUserSkill(Long id, UserSkill userSkillDetails) {
        UserSkill userSkill = userSkillRepository.findById(id).orElseThrow(() -> new RuntimeException("UserSkill not found"));
        userSkill.setLevel(userSkillDetails.getLevel());
        return userSkillRepository.save(userSkill);
    }

    public void deleteUserSkill(Long id) {
        UserSkill userSkill = userSkillRepository.findById(id).orElseThrow(() -> new RuntimeException("UserSkill not found"));
        userSkillRepository.delete(userSkill);
    }
}

