package com.trafficjam1.authservice.admin;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admins")
public class AdminManagementController {

    private final AdminService adminService;

    public AdminManagementController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping
    public ResponseEntity<?> listAdmins() {
        return ResponseEntity.ok(adminService.listAdminRows());
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@Valid @RequestBody AdminCreateRequest request) {
        return ResponseEntity.ok(adminService.createAdminWithTemporaryPassword(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable Long id, @Valid @RequestBody AdminUpdateRequest request) {
        return ResponseEntity.ok(adminService.updateAdmin(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok(Map.of("message", "Admin deleted"));
    }
}

