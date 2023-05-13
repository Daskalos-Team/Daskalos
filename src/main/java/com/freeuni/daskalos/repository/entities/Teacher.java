package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.*;
import reactor.util.annotation.NonNull;

@Entity
public class Teacher extends User {

    private boolean onPlace;

    public Teacher(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   @NonNull String address,
                   boolean onPlace,
                   int priceMin,
                   int priceMax) {
        super(ID, name, secondName, password, mail, userType, address, phoneNumber, priceMin, priceMax);
        this.onPlace = onPlace;
    }

    public Teacher(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserType userType) {
        super(mail, password, name, surname, userType);
    }

    public Teacher() {
        super();
    }

    public boolean isOnPlace() {
        return onPlace;
    }

    public void setOnPlace(boolean onPlace) {
        this.onPlace = onPlace;
    }
}
