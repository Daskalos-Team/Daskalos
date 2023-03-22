package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.Utils.UserUtils;
import reactor.util.annotation.NonNull;
import reactor.util.annotation.Nullable;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public abstract class User implements Serializable {

    private int ID;

    @NonNull
    private String name;

    @NonNull
    private String secondName;

    @NonNull
    private String password;

    @NonNull
    private String mail;

    @NonNull
    private UserType userType;

    @NonNull
    private String phoneNumber;

    private int priceMin;

    private int priceMax;

    @NonNull
    private String address;

    @NonNull
    private List<String> socialNetworkUrls;

    public User(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password, @NonNull String mail, @NonNull UserType userType,
                @NonNull String phoneNumber, int priceMin, int priceMax, @NonNull String address, @Nullable List<String> socialNetworkUrls) {
        this.ID = ID;
        this.name = name;
        this.secondName = secondName;
        this.password = password;
        this.mail = mail;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.address = address;
        this.socialNetworkUrls = !Objects.isNull(socialNetworkUrls) ? socialNetworkUrls : List.of();
    }

    public User(int ID, @NonNull String name, @NonNull String secondName, @NonNull String password, @NonNull String mail, @NonNull UserType userType,
                @NonNull String phoneNumber, int priceMin, int priceMax, @NonNull String address, @Nullable String socialNetworkUrls) {
        this.ID = ID;
        this.name = name;
        this.secondName = secondName;
        this.password = password;
        this.mail = mail;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.priceMin = priceMin;
        this.priceMax = priceMax;
        this.address = address;
        this.socialNetworkUrls = !Objects.isNull(socialNetworkUrls) ? UserUtils.getNetworkUrls(socialNetworkUrls) : List.of();
    }

    public int getID() {
        return this.ID;
    }

    @NonNull
    public String getName() {
        return this.name;
    }

    @NonNull
    public String getSecondName() {
        return this.secondName;
    }

    @NonNull
    public String getPassword() {
        return this.password;
    }

    @NonNull
    public String getMail() {
        return this.mail;
    }

    @NonNull
    public UserType getUserType() {
        return this.userType;
    }

    @NonNull
    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public int getPriceMin() {
        return this.priceMin;
    }

    public int getPriceMax() {
        return this.priceMax;
    }

    @NonNull
    public String getAddress() {
        return this.address;
    }

    @NonNull
    public List<String> getSocialNetworkUrls() {
        return this.socialNetworkUrls;
    }
}