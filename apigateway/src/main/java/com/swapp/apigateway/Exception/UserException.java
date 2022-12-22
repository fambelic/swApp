package com.swapp.apigateway.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST,reason = "submit error")
public class UserException extends Exception {
    String msg;
    public UserException(StatusEnumerator e) {
        super(msg);
        switch (e){
            case IP:
                msg="Password is invalid: must be at least 8 characters";
                break;
            case EAU:
                msg="mail address is already in use";
                break;
            case IMA:
                msg="invalid mail address";
                break;
            case UAU:
                msg="username is already in use";
                break;
        }

    }
}