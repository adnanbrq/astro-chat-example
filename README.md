# Chat Application

An open source example application build using the Astro Framework in combination with UI Libraries like React, Vue,
Svelte and realtime technologies like Pusher.

## About

The Idea behind this project was to showcase how a fully interactive Web Application can be build while having the
benefits of server rendered content.

## Structure

**Anything but the package folder** follows the project structure of a Astro
project.

**#package**

> The package folder hosts the logic for our **frontend** and **backend**.\
> Every package hosts their own _subpackages_ that can be consumed but the **backend** package is treated differently
> here. It's subpackages can be consumed through the AppContainer found at `package/backend/backend.ts`. This ensures
> that
> the Consumer (in this case the Astro Framework) has only one way of gaining access to the business logic and does not
> have to implement the interfaces itself.

## Features

- Authentication backed by secured cookies
- Realtime knowledge of new entities backed by Pusher
- Persistence backed by PlantScale's MySQL Instance
- Fully typed data access backed by Kysely
- UI Framework agnostic through Astro's adapters
  - Vue
  - Svelte
  - Solid
- DTO and Parameter Validation backed by Zod
- Fast and easily extensible styling through TailwindCSS
- Typesafe through TypeScript
- Pessimistic handling of requests. Nearly every return is treated as an Optional backed by typescript-optional

## Running Locally

1. Clone the Repository

```sh
git clone https://github.com/adnanbrq/astro-chat-example.git
```

2. Install dependencies using via pnpm:

```sh
pnpm i
```

3. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

4. Create a App on Pusher. You need to have an Account

5. Start the MySQL Database using the provided docker-compose config

```sh
docker compose up db
```

6. Start the Application

```sh
pnpm run dev
```

7. Once the Application is running you are able to Sign Up or Sign In and create a Channel by giving it a Name in the
   Left side Textfield and hitting Enter