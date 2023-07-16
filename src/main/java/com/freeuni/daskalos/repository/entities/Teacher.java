package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import lombok.*;
import reactor.util.annotation.NonNull;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class Teacher extends User {

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Experience> teachersExperience;

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
                   String profileImage,
                   List<Experience> teachersExperience) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl, profileImage);
        this.teachersExperience = teachersExperience;
    }

    public Teacher(@NonNull String mail,
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
                   String linkedinUrl) {
        super(mail, password, name, surname, address, userType, onPlace, title, description, fbUrl, twitterUrl, instaUrl, linkedinUrl);
    }

    public Teacher() {
        super();
    }
}
