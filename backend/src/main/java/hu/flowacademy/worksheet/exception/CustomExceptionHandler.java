package hu.flowacademy.worksheet.exception;


import hu.flowacademy.worksheet.exception.WorksheetUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception e, WebRequest request) {
        List<String> messageList = new ArrayList<>();
        messageList.add(e.getLocalizedMessage());
        return new ResponseEntity<>(messageList, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(WorksheetUserException.class)
    public final ResponseEntity<Object> handleUserException(WorksheetUserException ex, WebRequest request) {
        List<String> messageList = new ArrayList<>();
        messageList.add(ex.getLocalizedMessage());
        return new ResponseEntity<>(messageList, HttpStatus.NOT_FOUND);
    }
}