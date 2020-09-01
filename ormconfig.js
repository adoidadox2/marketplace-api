module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities:
    process.env.NODE_ENV !== "production"
      ? ["src/models/**/*.ts"]
      : ["dist/models/**/*.js"],
  migrations:
    process.env.NODE_ENV !== "production"
      ? ["src/database/migrations/**/*.ts"]
      : ["dist/database/migrations/**/*.js"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/database/migrations",
  },
};
