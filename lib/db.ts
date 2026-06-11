import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: process.env.DATABASE_URL?.includes("sslmode=require") ? "require" : false,
  max: 10,
});

export default sql;
