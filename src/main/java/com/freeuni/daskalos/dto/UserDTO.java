package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.freeuni.daskalos.repository.embeddables.UserAddress;

import java.io.Serializable;

@JsonAutoDetect
public class UserDTO implements Serializable {

    private String email;

    private String password;

    private String name;

    private String surname;

    private UserAddress address;

    private String userType;

    private boolean usingGoogle;

    public UserDTO(String email, String password, String name, String surname, UserAddress address, String userType) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.userType = userType;
    }

    public UserDTO() {

    }

    public String getEmail() {
        return email;
    }

    public UserDTO setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDTO setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getSurname() {
        return surname;
    }

    public UserDTO setSurname(String surname) {
        this.surname = surname;
        return this;
    }

    public UserAddress getAddress() {
        return address;
    }

    public void setAddress(UserAddress address) {
        this.address = address;
    }

    public String getUserType() {
        return userType;
    }

    public UserDTO setUserType(String userType) {
        this.userType = userType;
        return this;
    }

    public boolean isUsingGoogle() {
        return usingGoogle;
    }

    public UserDTO setUsingGoogle(boolean usingGoogle) {
        this.usingGoogle = usingGoogle;
        return this;
    }
}
