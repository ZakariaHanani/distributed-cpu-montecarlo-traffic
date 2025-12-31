package com.trafficjam1.authservice.admin;

import com.trafficjam1.authservice.user.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        try {
            return ResponseEntity.ok(adminService.getMe());
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(error("Unauthorized"));
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateMe(@RequestBody UpdateAdminMeRequest request) {
        try {
            return ResponseEntity.ok(adminService.updateMe(request));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(error(ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(error("Unauthorized"));
        }
    }

    @PostMapping("/me/password")
    public ResponseEntity<?> changePassword(@RequestBody ChangeAdminPasswordRequest request) {
        try {
            adminService.changePassword(request);
            return ResponseEntity.ok(Map.of("message", "Password updated"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(error(ex.getMessage()));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(error("Unauthorized"));
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> listUsers(@RequestParam(name = "role", required = false) Role role) {
        if (role != Role.ADMIN) {
            return ResponseEntity.badRequest().body(error("Invalid request"));
        }
        try {
            return ResponseEntity.ok(adminService.listAdmins());
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(error("Unauthorized"));
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateAdminUserRequest request) {
        try {
            return ResponseEntity.ok(adminService.createAdmin(request));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(error("Invalid request"));
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(error("Couldn’t create admin"));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(error("Unauthorized"));
        }
    }

    private Map<String, String> error(String message) {
        Map<String, String> map = new HashMap<>();
        map.put("error", message);
        return map;
    }
}

