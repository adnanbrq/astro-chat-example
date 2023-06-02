# Chat Application

An open source example application build using the Astro Framework in combination with UI Libraries like React, Vue, Svelte and realtime technologies like Pusher.

## About

The Idea behind this project was to showcase how a fully interactive Web Application can be build while having the benefits of server rendered content.

## Structure

**Anything but the package folder** follows the project structure of a Astro
project.

**#package**

> The package folder hosts the logic for our **frontend** and **backend**.\
> Every package hosts their own _subpackages_ that can be consumed but the **backend** package is treated differently here. It's subpackages can be consumed through the AppContainer found at `package/backend/backend.ts`. This ensures that the Consumer (in this case the Astro Framework) has only one way of gaining access to the business logic and does not have to implement the interfaces itself.

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

1. Clone the Repository or download the Code

```sh
git clone ...
```

2. Install dependencies using a package manager like pnpm:

```sh
pnpm i
```

2. Copy `.env.example` to `.env` and update the variables.

```sh
cp .env.example .env
```

3. Start the development server:

```sh
pnpm dev
```
