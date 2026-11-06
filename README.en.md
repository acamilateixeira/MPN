# MPN — service scheduling

[Português](README.md) · **English** · **Status · legacy code and modernization proposal**

MPN connects businesses, services, clients, time slots, and bookings. The modernization starts with one question: what happens when two people try to book overlapping time for the same service provider?

## Current code

The [Laravel 7 API](api/routes/api.php) has JWT routes for businesses, services, time slots, and bookings. The [React 17 UI](web/package.json) follows that model. Booking creation records the business, client, service, and time slot. The repository has no integration test demonstrating how two overlapping bookings are handled. The current backend provides domain context and needs a legacy environment to reproduce.

## Modernization scope

| Proposed choice | What it demonstrates |
| --- | --- |
| **Kotlin and Spring Boot** | A JVM backend with validation, company-scoped authorization, and explicit booking conflicts. |
| **PostgreSQL and Flyway** | Reproducible migrations and a database exclusion constraint that protects against overlapping bookings, including concurrent writes. |
| **React and TypeScript** | One availability and booking screen to validate the experience with a user. |
| **JUnit, PostgreSQL integration tests, OpenAPI, and Postman** | A repeatable walkthrough for booking, time conflicts, cancellation, and company isolation. |

The first workflow will list availability, book a time, and cancel. Two users requesting overlapping intervals for the same provider should receive one success and one HTTP 409. Cancellation releases the interval. Bookings from another company remain inaccessible.

The milestone includes a synthetic seed, a start command, tests against PostgreSQL, and an API collection. Setup commands will accompany the working implementation.

[Spring Boot Kotlin support](https://docs.spring.io/spring-boot/reference/features/kotlin.html) · [PostgreSQL range types](https://www.postgresql.org/docs/current/rangetypes.html)
