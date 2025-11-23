import { Pool } from "pg";
import { ENV } from "../constants/env";

const connectionString = ENV.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set in environment");
}

export let pool = new Pool({ connectionString });

export async function query<T = any>(text: string, params?: any[]) {
  const res = await pool.query<T>(text, params);
  return res;
}