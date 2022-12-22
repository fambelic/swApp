FROM openjdk:11 
WORKDIR /app
COPY target/authenticationservice-0.0.1.jar /app
ENV SERVER_PORT 8087
EXPOSE $SERVER_PORT
COPY wait_for_it.sh /app
RUN chmod +x wait_for_it.sh

