package hu.flowacademy.munkalap.exception;

import org.springframework.http.HttpStatus;

public class WorksheetUsernameTakenException extends WorksheetUserException{
    public WorksheetUsernameTakenException(String message) {
        super(message);
    }

    public WorksheetUsernameTakenException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
