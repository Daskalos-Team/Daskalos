package com.freeuni.daskalos.repository.embeddables;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserAddress {

    private String fullAddress;

    private double latitude;

    private double longitude;

    public UserAddress(String fullAddress, double latitude, double longitude) {
        this.fullAddress = fullAddress;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UserAddress() {

    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String country) {
        this.fullAddress = country;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
