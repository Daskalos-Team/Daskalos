package com.freeuni.daskalos.repository.entities;

import reactor.util.annotation.NonNull;

import java.util.List;

public abstract class UserBuilder {
    private final int ID;
    private String name;
    private String secondName;
    private String password;
    private String mail;
    private UserType userType;
    private String phoneNumber;
    private int priceMin;
    private int priceMax;
    private String address;
    private List<String> socialNetworkUrls;

    public UserBuilder(@NonNull User user) {
        this.ID = user.getID();
        this.name = user.getName();
        this.secondName = user.getSecondName();
        this.password = user.getPassword();
        this.mail = user.getMail();
        this.userType = user.getUserType();
        this.phoneNumber = user.getPhoneNumber();
        this.priceMin = user.getPriceMin();
        this.priceMax = user.getPriceMax();
        this.address = user.getAddress();
        this.socialNetworkUrls = user.getSocialNetworkUrls();
    }

    public UserBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public UserBuilder setSecondName(String secondName) {
        this.secondName = secondName;
        return this;
    }

    public String getSecondName() {
        return this.secondName;
    }

    public UserBuilder setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getPassword() {
        return this.password;
    }

    public UserBuilder setMail(String mail) {
        this.mail = mail;
        return this;
    }

    public String getMail() {
        return this.mail;
    }

    public UserBuilder setUserType(UserType userType) {
        this.userType = userType;
        return this;
    }

    public UserType getUserType(UserType userType) {
        return this.userType;
    }

    public UserBuilder setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public UserBuilder setPriceMin(int priceMin) {
        this.priceMin = priceMin;
        return this;
    }

    public int getPriceMin() {
        return this.priceMin;
    }

    public UserBuilder setPriceMax(int priceMax) {
        this.priceMax = priceMax;
        return this;
    }

    public int getPriceMax() {
        return this.priceMax;
    }

    public UserBuilder setAddress(String address) {
        this.address = address;
        return this;
    }

    public String getAddress() {
        return this.address;
    }

    public UserBuilder setSocialNetworkUrls(List<String> socialNetworkUrls) {
        this.socialNetworkUrls = List.copyOf(socialNetworkUrls);
        return this;
    }

    public UserBuilder addSocialNetworkUrl(String socialNetwork) {
        this.socialNetworkUrls.add(socialNetwork);
        return this;
    }

    public List<String> getSocialNetworkUrls() {
        return this.socialNetworkUrls;
    }

    public UserBuilder addSocialNetworkUrls(String... socialNetworkUrls) {
        this.socialNetworkUrls.addAll(List.of(socialNetworkUrls));
        return this;
    }

}
