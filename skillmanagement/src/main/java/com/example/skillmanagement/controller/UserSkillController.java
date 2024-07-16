package com.example.skillmanagement.controller;

import com.example.skillmanagement.model.UserSkill;
import com.example.skillmanagement.service.UserSkillService;
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
    public ResponseEntity<List<UserSkill>> getUserSkillsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(userSkillService.findByUserId(userId));
    }

    @PostMapping("/{userId}/{skillId}")
    public ResponseEntity<UserSkill> associateSkillToUser(@PathVariable Long userId, @PathVariable Long skillId, @RequestParam String level) {
        return ResponseEntity.ok(userSkillService.associateSkillToUser(userId, skillId, level));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserSkill> updateSkillLevel(@PathVariable Long id, @RequestParam String level) {
        return ResponseEntity.ok(userSkillService.updateSkillLevel(id, level));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserSkill(@PathVariable Long id) {
        userSkillService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
