package com.example.skillmanagement.repository;

import com.example.skillmanagement.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}
