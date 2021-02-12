package hu.flowacademy.worksheet.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class CustomExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(CustomExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception e) {
        log.error("ExceptionHandler Message, from Exception class: {}", e.getLocalizedMessage());
        return new ResponseEntity<>(List.of(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ValidationException.class)
    public final ResponseEntity<Object> handleUserException(ValidationException ex) {
        log.error("ExceptionHandler Message, from ValidationException class: {}", ex.getLocalizedMessage());
        return new ResponseEntity<>(List.of(ex.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WorksheetUsernameTakenException.class)
    public final ResponseEntity<Object> worksheetUserNameException(WorksheetUsernameTakenException ex) {
        log.error("ExceptionHandler Message, from WorksheetUserameTakenException: {}", ex.getLocalizedMessage());
        return new ResponseEntity<>(List.of(ex.getLocalizedMessage()), HttpStatus.BAD_REQUEST);
    }
}
