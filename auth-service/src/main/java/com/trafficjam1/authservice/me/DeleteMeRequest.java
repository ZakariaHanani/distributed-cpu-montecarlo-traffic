package com.trafficjam1.authservice.me;

import jakarta.validation.constraints.NotBlank;

public class DeleteMeRequest {
    @NotBlank
    private String confirmText;

    private String password;

    public String getConfirmText() {
        return confirmText;
    }

    public void setConfirmText(String confirmText) {
        this.confirmText = confirmText;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

