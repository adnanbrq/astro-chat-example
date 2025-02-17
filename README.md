# Chat Application

An open-source example application built with the **Astro Framework**, integrating UI libraries like React, Vue, and Svelte, alongside real-time technologies like Pusher.

## About

This project demonstrates how to build a fully interactive web application while benefiting from server-rendered content.

## Project Structure

Everything **except the `package` folder** follows the standard Astro project structure.

### `package` Folder

The `package` folder contains the core logic for both the **frontend** and **backend**:

- Each package has its own subpackages that can be consumed independently.
- The **backend** package is structured differently—its subpackages are accessed via the `AppContainer` in [`package/backend/backend.ts`](package/backend/backend.ts).
- This ensures that consumers (e.g., the Astro framework) interact with a single entry point for business logic, avoiding direct interface implementations.

## Features

- **Authentication** secured with HTTP-only cookies.
- **Real-time updates** powered by Pusher.
- **Persistent data storage** using Docker and PostgreSQL.
- **Fully typed data access** with Kysely.
- **UI framework agnostic**, supporting:
  - React
  - Vue
  - Svelte
  - Solid.js
- **Data validation** using Zod for DTOs and parameters.
- **Modern styling** with Tailwind CSS (v3).
- **Full TypeScript support** for type safety.
- **Pessimistic request handling**, ensuring robust API interactions using `typescript-optional`.

## Running Locally

### 1. Clone the Repository

```sh
git clone https://github.com/adnanbrq/astro-chat-example.git
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Configure Environment Variables

Copy .env.example to .env and update the required values.

```sh
cp .env.example .env
```

### 4. Set Up Pusher

Create an app on Pusher, then add your Secret, Key, Cluster, and other credentials to the .env file.

### 5. Start the Database

```sh
docker compose up -d
```

### 6. Start the Application

```sh
pnpm run dev
```

### 7. Using the Application

Once the app is running, you can:

Sign Up / Sign In
Create a Channel by entering a name in the left-side text field and pressing Enter.
