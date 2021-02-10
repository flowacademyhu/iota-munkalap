package hu.flowacademy.worksheet.exception;

import org.springframework.http.HttpStatus;

public class WorksheetUserException extends Exception {
    private HttpStatus httpStatus;

    public WorksheetUserException(String message) {
        this(message, HttpStatus.BAD_REQUEST);
    }

    public WorksheetUserException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
