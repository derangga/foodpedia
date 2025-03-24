# Overview

Foodpedia is a web app for sharing food recipe. The user can favorite and comment to the recipe. They can ask to AI too, to giving a suggestion food recipe based on ingredients. The design ispired to [flavoriz](https://www.figma.com/community/file/1388051873021664275)

# Requirement

- This project use bun, if you don't have bun installed on your local machine please install first by visiting this [page](https://bun.sh/)
- Postgres
  - Install postgres on laptop [download](https://www.postgresql.org/download/)
  - Use docker: install docker and run
  ```sh
  docker compose up -d
  ```

# Quick Start

- Clone this project
- Install dependency
  ```sh
  $ bun install
  ```
- Setup database
  ```sh
  $ bun run db-migrate
  $ bun run db-seed
  ```
- Setup env by copy env.sample and make some adjustment
  ```sh
  $ cp env.sample .env
  ```
- Run project
  ```sh
  $ bun run dev
  ```
