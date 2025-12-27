package com.trafficjam1.authservice.user;

import jakarta.validation.constraints.NotBlank;

public class UpdateMeRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String city;

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
}

