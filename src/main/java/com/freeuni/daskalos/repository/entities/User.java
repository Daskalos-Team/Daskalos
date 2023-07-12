package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import reactor.util.annotation.NonNull;

import java.io.Serializable;

@NoArgsConstructor
@Entity
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

    private UserAddress address;

    private Boolean onPlace;

    private String title;

    private String description;

    private String fbUrl;

    private String twitterUrl;

    private String instaUrl;

    private String linkedinUrl;

    private String profileImage;

    public User(Long ID,
                @NonNull String name,
                @NonNull String surname,
                @NonNull String password,
                @NonNull String email,
                @NonNull UserType userType,
                String phoneNumber,
                UserAddress address,
                Boolean onPlace,
                String title,
                String description,
                String fbUrl,
                String twitterUrl,
                String instaUrl,
                String linkedinUrl,
                String profileImage) {
        this.ID = ID;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.userType = userType;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.onPlace = onPlace;
        this.title = title;
        this.description = description;
        this.fbUrl = fbUrl;
        this.twitterUrl = twitterUrl;
        this.instaUrl = instaUrl;
        this.linkedinUrl = linkedinUrl;
        this.profileImage = profileImage;
    }

    public User(@NonNull String email,
                @NonNull String password,
                @NonNull String name,
                @NonNull String surname,
                UserAddress address,
                @NonNull UserType userType,
                Boolean onPlace,
                String title,
                String description,
                String fbUrl,
                String twitterUrl,
                String instaUrl,
                String linkedinUrl) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.userType = userType;
        this.onPlace = onPlace;
        this.title = title;
        this.description = description;
        this.fbUrl = fbUrl;
        this.twitterUrl = twitterUrl;
        this.instaUrl = instaUrl;
        this.linkedinUrl = linkedinUrl;
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

    @Embedded
    public UserAddress getAddress() {
        return address;
    }

    public void setAddress(UserAddress address) {
        this.address = address;
    }

    public void setOnPlace(Boolean onPlace) {
        this.onPlace = onPlace;
    }

    public Boolean getOnPlace() {
        return this.onPlace;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFbUrl() {
        return fbUrl;
    }

    public void setFbUrl(String fbUrl) {
        this.fbUrl = fbUrl;
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }

    public void setTwitterUrl(String twitterUrl) {
        this.twitterUrl = twitterUrl;
    }

    public String getInstaUrl() {
        return instaUrl;
    }

    public void setInstaUrl(String instaUrl) {
        this.instaUrl = instaUrl;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    @Column(columnDefinition = "LONGTEXT")
    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
