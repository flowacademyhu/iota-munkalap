package hu.flowacademy.worksheet.exception;

import org.springframework.http.HttpStatus;

public class WorksheetUsernameTakenException extends ValidationException {
    public WorksheetUsernameTakenException(String message) {
        super(message);
    }

    public WorksheetUsernameTakenException(String message, HttpStatus httpStatus) {
        super(message, httpStatus);
    }
}
