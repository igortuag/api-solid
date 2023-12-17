# GymPass App

This project serves as an exemplary application demonstrating the implementation of SOLID principles.

## Functional Requirements (FR)

- [ ] **Registration**: Users should be able to register.
- [ ] **Authentication**: Users should be able to authenticate.
- [ ] **User Profile**: Retrieve the profile of a logged-in user.
- [ ] **Check-in Count**: Get the number of check-ins by the logged-in user.
- [ ] **Check-in History**: Retrieve the history of check-ins made by the logged-in user.
- [ ] **Find Closest Gyms**: View the closest gyms.
- [ ] **Search Gyms by Name**: Search for gyms by name.
- [ ] **Check-in at a Gym**: Perform a check-in at a gym.
- [ ] **User-Validated Check-in**: Validate a user's check-in.
- [ ] **Gym Registration**: Register a gym.

## Business Rules (BR)

- [ ] **Unique Email**: Prevent the registration of duplicate emails.
- [ ] **Daily Check-in Limit**: Restrict users from making two check-ins on the same day.
- [ ] **Proximity Check**: Ensure users can only check in if they are within 100 meters of the gym.
- [ ] **Timely Validation**: Allow validation of check-ins only within 20 minutes.
- [ ] **Admin Validation**: Allow check-in validation only by administrators.
- [ ] **Admin-only Gym Registration**: Restrict gym registration to administrators.

## Nonfunctional Requirements (NR)

- [ ] **Cryptographic Passwords**: Implement cryptographic password storage for user security.
- [ ] **Database Persistence**: Persist data in a PostgreSQL database.
- [ ] **Pagination**: Paginate all lists with a limit of 20 items.
- [ ] **JWT Identification**: Identify users using JSON Web Tokens (JWT).

## Object-Relational Mapper (ORM)

This project utilizes the [Prisma ORM](https://github.com/prisma) for efficient mapping between object-oriented programming and PostgreSQL databases.

## Docker

This project utilizes docker for the database. [Docker](https://www.docker.com/) is a platform designed to help developers build, share, and run container applications.

To run this project docker must be install, please see the [doc](https://docs.docker.com/get-docker/).

### How to run docker

#### First
```
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

#### After
```
docker ps -a

docker start api-solid-pg
```