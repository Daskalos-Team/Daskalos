package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.Entity;
import reactor.util.annotation.NonNull;

@Entity
public class Student extends User {

    public Student(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   @NonNull UserAddress address,
                   Boolean onPlace,
                   String title,
                   String description,
                   String fbUrl,
                   String twitterUrl,
                   String instaUrl,
                   String linkedinUrl,
                   byte[] imageData) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl, imageData);
    }

    public Student(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserAddress address,
                   @NonNull UserType userType,
                   Boolean onPlace,
                   String title,
                   String description,
                   String fbUrl,
                   String twitterUrl,
                   String instaUrl,
                   String linkedinUrl,
                   byte[] imageData) {
        super(mail, password, name, surname, address, userType, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl, imageData);
    }

    public Student() {

    }
}
