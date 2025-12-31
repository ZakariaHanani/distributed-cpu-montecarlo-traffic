package com.trafficjam1.authservice.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;

public class UpdateMeRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String city;

    @Email
    private String email;

    public UpdateMeRequest() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
