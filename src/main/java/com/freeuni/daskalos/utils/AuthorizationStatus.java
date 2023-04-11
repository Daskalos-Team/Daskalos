package com.freeuni.daskalos.utils;

public enum AuthorizationStatus {
    OK("OK"),
    SUCCESSFUL_REGISTRATION("SUCCESSFUL_REGISTRATION"),
    SUCCESSFUL_LOGIN("SUCCESSFUL_LOGIN"),
    EMAIL_NOT_FOUND("EMAIL_NOT_FOUND"),
    WRONG_PASSWORD("WRONG_PASSWORD"),
    ALREADY_EXISTS("ALREADY_EXISTS"),
    ILLEGAL_PASSWORD("ILLEGAL_PASSWORD"),
    SUCCESSFUL_CHANGE("SUCCESSFUL_CHANGE");

    private final String status;

    AuthorizationStatus(String status) {
        this.status = status;
    }
}
