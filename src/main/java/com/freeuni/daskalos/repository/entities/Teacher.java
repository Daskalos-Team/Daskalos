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
                   @NonNull UserAddress address,
                   Boolean onPlace) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, onPlace);
    }

    public Teacher(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserAddress address,
                   @NonNull UserType userType,
                   @NonNull Boolean onPlace) {
        super(mail, password, name, surname, address, userType, onPlace);
    }

    public Teacher() {
        super();
    }
}
