# Introduction

For full documentation visit [mkdocs.org](https://www.mkdocs.org).

## System Overview

The relace system architecture is built on the microservice architecture with its common patterns. Although its unit is still comprised of coarse-grained services, it has improved the  scalability, agility, and reliability of the system while overcoming the shortcomings of the monolithic architecture. As the system grows, it may make sense to further break down the services. 

The event-driven microservices paradigm is used in the communication pattern to enable asynchronicity and loose coupling between services. To accomplish this basic pub/sub messaging is needed. AMQP (RabbitMQ) w/ topic exchange type is chosen in this project.



## Design Consideration

### Assumptions and Dependencies

### General Constraints

### Goals and Guidelines

### Development Methods

## Architectural Strategies
