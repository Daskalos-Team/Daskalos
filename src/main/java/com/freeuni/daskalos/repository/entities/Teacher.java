package com.freeuni.daskalos.repository.entities;

import com.freeuni.daskalos.repository.embeddables.UserAddress;
import com.freeuni.daskalos.utils.UserType;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import reactor.util.annotation.NonNull;

@Entity
public class Teacher extends User {

    @Basic
    @Column(name = "on_place")
    private boolean onPlace;

    public Teacher(Long ID,
                   @NonNull String name,
                   @NonNull String secondName,
                   @NonNull String password,
                   @NonNull String mail,
                   @NonNull UserType userType,
                   @NonNull String phoneNumber,
                   @NonNull UserAddress address,
                   Boolean onPlace,
                   Integer priceMin,
                   Integer priceMax) {
        super(ID, name, secondName, password, mail, userType, phoneNumber, address, priceMin, priceMax);
        this.onPlace = onPlace;
    }

    public Teacher(@NonNull String mail,
                   @NonNull String password,
                   @NonNull String name,
                   @NonNull String surname,
                   @NonNull UserAddress address,
                   @NonNull UserType userType) {
        super(mail, password, name, surname, address, userType);
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
