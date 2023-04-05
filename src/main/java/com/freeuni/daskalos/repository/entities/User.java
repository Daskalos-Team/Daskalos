package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import reactor.util.annotation.NonNull;

import java.io.Serializable;

@Entity
public abstract class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    private String name;

    private String lastName;

    private String password;

    private String mail;

    private UserType userType;

    private String phoneNumber;

    private String address;

    private int priceMin;

    private int priceMax;

    public User(Long ID,
                @NonNull String name,
                @NonNull String lastName,
                @NonNull String password,
                @NonNull String mail,
                @NonNull UserType userType,
                @NonNull String phoneNumber,
                @NonNull String address,
                int priceMin,
                int priceMax) {
        this.ID = ID;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.mail = mail;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
    }

    public User(@NonNull String mail, @NonNull String password) {
        this.mail = mail;
        this.password = password;
    }

    public User() {

    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPriceMin() {
        return priceMin;
    }

    public void setPriceMin(int priceMin) {
        this.priceMin = priceMin;
    }

    public int getPriceMax() {
        return priceMax;
    }

    public void setPriceMax(int priceMax) {
        this.priceMax = priceMax;
    }
}
