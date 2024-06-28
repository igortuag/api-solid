# GymPass API˜

This project serves as an exemplary application demonstrating the implementation of SOLID principles.

## Functional Requirements (FR)

- [x] **Registration**: Users should be able to register.
- [x] **Authentication**: Users should be able to authenticate.
- [x] **User Profile**: Retrieve the profile of a logged-in user.
- [x] **Check-in Count**: Get the number of check-ins by the logged-in user.
- [x] **Check-in History**: Retrieve the history of check-ins made by the logged-in user.
- [x] **Find Closest Gyms**: View the closest gyms (max 10km).
- [x] **Search Gyms by Name**: Search for gyms by name.
- [x] **Check-in at a Gym**: Perform a check-in at a gym.
- [x] **User-Validated Check-in**: Validate a user's check-in.
- [x] **Gym Registration**: Register a gym.

## Business Rules (BR)

- [x] **Unique Email**: Prevent the registration of duplicate emails.
- [x] **Daily Check-in Limit**: Restrict users from making two check-ins on the same day.
- [x] **Proximity Check**: Ensure users can only check in if they are within 100 meters of the gym.
- [x] **Timely Validation**: Allow validation of check-ins only within 20 minutes.
- [x] **Admin Validation**: Allow check-in validation only by administrators.
- [x] **Admin-only Gym Registration**: Restrict gym registration to administrators.

## Nonfunctional Requirements (NR)

- [x] **Cryptographic Passwords**: Implement cryptographic password storage for user security.
- [x] **Database Persistence**: Persist data in a PostgreSQL database.
- [x] **Pagination**: Paginate all lists with a limit of 20 items.
- [x] **JWT Identification**: Identify users using JSON Web Tokens (JWT).

## Object-Relational Mapper (ORM)

This project utilizes the [Prisma ORM](https://github.com/prisma) for efficient mapping between object-oriented programming and PostgreSQL databases.

## Docker

This project utilizes docker for the database. [Docker](https://www.docker.com/) is a platform designed to help developers build, share, and run container applications.

To run this project docker must be install, please see the [doc](https://docs.docker.com/get-docker/).

### How to run docker

#### Create Container
```
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

#### List containers
```
docker ps -a
```

#### Start container
```
docker start api-solid-pg
```

#### Delete container (do it just when necessary)
```
docker rm api-solid-pg
```

#### List running container
```
docker ps
```

### Or just use the docker compose and run the command
```
# to start
docker compose up -d

# to stop
docker compose stop
```

## Run migrations
Once you've made sure docker is running, you can run the migration with the following command:

```
npx prisma migrate dev
```

## Prisma Studio
To check if it works, open Prisma Studio

```
npx prisma studio
```

## Factory pattern

The Factory Method pattern suggests that you replace direct object construction calls (using the new operator) with calls to a special factory method. Don’t worry: the objects are still created via the new operator, but it’s being called from within the factory method. Objects returned by a factory method are often referred to as products.

## JWT: JSON Web Token

User logins, send email and password -> backend creates a token unique, non-changeable and stateless.

Stateless: not storage in any data base

Back-end: control the token through a key-word

Key-word: asdkldnklqwndklnqwkldnqwkldnqlwdhqiowhqiouehqwnqwlasz123

Emails/password -> header.payload.sign

The token can transit between BE and FE without lost, and could be generate only for the backend with a key word.

## CI
Continuous integration (CI) is the practice of automating the integration of code changes from multiple contributors into a single software project. 