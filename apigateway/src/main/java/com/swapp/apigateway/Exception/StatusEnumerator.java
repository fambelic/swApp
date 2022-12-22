package com.swapp.apigateway.Exception;

public enum StatusEnumerator {
    //success registration, never used(at the moment)
    OK,
    //user already used
    UAU,
    //email already used
    EAU,
    //invalid password
    IP,
    //invalid mail address
    IMA
}
