package com.example.skillmanagement.service;

import com.example.skillmanagement.model.Skill;
import com.example.skillmanagement.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillService {
    @Autowired
    private SkillRepository skillRepository;

    public Skill save(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill findById(Long id) {
        return skillRepository.findById(id).orElse(null);
    }
}
