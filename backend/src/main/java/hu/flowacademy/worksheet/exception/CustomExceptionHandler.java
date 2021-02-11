package hu.flowacademy.worksheet.exception;

import hu.flowacademy.worksheet.service.KeycloakClientService;
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
        log.info("ExceptionHandler Message: {}", e.getLocalizedMessage());
        return new ResponseEntity<>(List.of(e.getLocalizedMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(WorksheetUserException.class)
    public final ResponseEntity<Object> handleUserException(WorksheetUserException ex) {
        log.info("ExceptionHandler Message: {}", ex.getLocalizedMessage());
        return new ResponseEntity<>(List.of(ex.getLocalizedMessage()), HttpStatus.NOT_FOUND);
    }
}