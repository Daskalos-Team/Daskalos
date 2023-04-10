package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import java.io.Serializable;

@JsonAutoDetect
public class UserDTO implements Serializable {

    private String mail;

    private String password;

    private String name;

    private String surname;

    private String userType;

    private boolean usingGoogle;

    public UserDTO(String mail, String password, String name, String surname, String userType) {
        this.mail = mail;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.userType = userType;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public boolean isUsingGoogle() {
        return usingGoogle;
    }

    public void setUsingGoogle(boolean usingGoogle) {
        this.usingGoogle = usingGoogle;
    }
}
