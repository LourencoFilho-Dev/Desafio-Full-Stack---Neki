package com.neki.skillmanagement.controller;

import com.neki.skillmanagement.model.UserSkill;
import com.neki.skillmanagement.service.UserSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-skills")
public class UserSkillController {

    @Autowired
    private UserSkillService userSkillService;

    @GetMapping("/{userId}")
    public List<UserSkill> getUserSkills(@PathVariable Long userId) {
        return userSkillService.getUserSkills(userId);
    }

    @PostMapping
    public ResponseEntity<UserSkill> addUserSkill(@RequestBody UserSkill userSkill) {
        UserSkill newUserSkill = userSkillService.addUserSkill(userSkill);
        return ResponseEntity.ok(newUserSkill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSkill> updateUserSkill(@PathVariable Long id, @RequestBody UserSkill userSkillDetails) {
        UserSkill updatedUserSkill = userSkillService.updateUserSkill(id, userSkillDetails);
        return ResponseEntity.ok(updatedUserSkill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable Long id) {
        userSkillService.deleteUserSkill(id);
        return ResponseEntity.noContent().build();
    }
}

