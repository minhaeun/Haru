package com.haru.api.common.advice;

import com.haru.api.common.exception.BusinessException;
import com.haru.api.common.exception.PermissionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> businessExceptionHandler(BusinessException ex) {
        ErrorResponse response = ErrorResponse.build("400", ex);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PermissionException.class)
    public ResponseEntity<ErrorResponse> permissionExceptionHandler(PermissionException ex) {
        ErrorResponse response = ErrorResponse.build("401", ex);

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}


