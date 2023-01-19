package com.swapp.apigateway.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("http://localhost/submit")
public interface AnnuncInterface {

}
