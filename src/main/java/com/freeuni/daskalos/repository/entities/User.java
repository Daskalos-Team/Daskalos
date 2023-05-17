package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import reactor.util.annotation.NonNull;

import java.io.Serializable;

@NoArgsConstructor
@Entity
@Table(name = "USERS")
public abstract class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long ID;

    private String name;

    private String surname;

    private String password;

    private String email;

    private UserType userType;

    private String phoneNumber;

    private String address;

    private int priceMin;

    private int priceMax;

    public User(Long ID,
                @NonNull String name,
                @NonNull String surname,
                @NonNull String password,
                @NonNull String email,
                @NonNull UserType userType,
                @NonNull String phoneNumber,
                @NonNull String address,
                int priceMin,
                int priceMax) {
        this.ID = ID;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
    }

    public User(@NonNull String email,
                @NonNull String password,
                @NonNull String name,
                @NonNull String surname,
                @NonNull UserType userType) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.userType = userType;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String lastName) {
        this.surname = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String mail) {
        this.email = mail;
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
