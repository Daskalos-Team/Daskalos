package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.Entity;
import reactor.util.annotation.NonNull;

@Entity
public class Teacher extends User {

    public Teacher(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   UserAddress address,
                   Boolean onPlace,
                   String title,
                   String description,
                   String fbUrl,
                   String twitterUrl,
                   String instaUrl,
                   String linkedinUrl,
                   String profileImage) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl, profileImage);
    }

    // TODO make address still @NonNull later
    public Teacher(@NonNull String mail,
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
        super(mail, password, name, surname, address, userType, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl);
    }

    public Teacher() {
        super();
    }
}
