package com.freeuni.daskalos.utils.exceptions;

public class UserNotExistException extends RuntimeException {

    private String errorMessage;

    public UserNotExistException(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public  String getErrorMessage() {
        return this.errorMessage;
    }
}
