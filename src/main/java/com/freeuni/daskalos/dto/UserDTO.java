package com.freeuni.daskalos.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import reactor.util.annotation.NonNull;

import java.io.Serializable;

@JsonAutoDetect
public class UserDTO implements Serializable {

    private boolean usingGoogle;

    private String mail;

    private String password;

    private String userType;

    public UserDTO(String mail, String password, @NonNull String userType) {
        this.mail = mail;
        this.password = password;
        this.userType = userType;
    }

    public boolean isUsingGoogle() {
        return usingGoogle;
    }

    public void setUsingGoogle(boolean usingGoogle) {
        this.usingGoogle = usingGoogle;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
