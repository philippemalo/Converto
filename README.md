# MVC-template

This is a **fullstack application template** that you can use as a starting point for your own projects. It comes with basic sign up, sign in, and sign out functionalities, as well as integration with various technologies such as **Vitejs**, **Vue3**, **TailwindCSS**, **Typescript**, **Nodejs**, **Prisma**, **MongoDB**, and **Docker**.

## Installation

To use this template, you need to have **Node.js** and **Docker** installed on your system. Once you have them, follow these steps:

Clone this repository: `git clone https://github.com/philippemalo/mvc-template.git\`<br>
Change to the project directory: `cd mvc-template`

## Usage

This template provides you with a basic structure for a fullstack application, including client-side and server-side code. You can customize it to fit your needs and add new features.

## Database

This template uses **MongoDB** as the database. The configuration is located in the `/Model/.env` file. You can change it to use a different database if you prefer.

### Docker

This template includes a `Dockerfile` for each service and a `docker-compose.yml`, which allows you to run the application in a **Docker** container.

### Development

To use Docker, follow these steps:

Build the Docker image: `docker-compose -f docker-compose.dev.yml build`<br>
Run the Docker container: `docker-compose -f docker-compose.dev.yml up -d`

Once the Docker container is built and running, you can access it's bash shell locally using `docker exec -it YOUR_CONTAINER_NAME bash`<br>
The `mongo` shell is available there. From the Mongo shell, you can use `show dbs` to show available databases (at this point, you should only see the default databases; admin, config and local)

## Server

The server-side code is located in the `Controller` directory. It was built with **Nodejs**, and uses **Typescript** and **Prisma** to interact with the **MongoDB** database. The main entry point is `index.ts`.

Install the dependencies: `npm install`

Once the database is up and running inside the Docker container, generate the Prisma client: `npm run gen`<br>
When the Prisma client is succesfully generated, push the model to the database: `npm run dbp`<br>
You can also use Prisma studio once the database is up: `npm run studio`

Start the development server: `npm run dev`<br>
Open `http://localhost:4466/` in your web browser to see the server running.

## Client

The client-side code is located in the `View` directory. It was built with **Vitejs** and **Vue3**, and uses **TailwindCSS** for styling. The main entry point is `main.ts`.

Install the dependencies: `npm install`<br>
Start the development server: `npm run dev`<br>
Open `http://localhost:8000/` in your web browser to see the application running.
