## Getting Started
1. Install bun
2. Install posgresql, you can install directly on your device or use docker
3. Clone this repository and run `bun install`
4. Copy environment
```
cp env.samples .env
```
4. If you use docker just run `docker compose up` or `docker-compose up`
5. Push database schema
```
bunx drizzle-kit push
```
6. Run the project
```
bun run dev
```
