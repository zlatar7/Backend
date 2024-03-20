import { config } from "dotenv";
import args from "./args.utils.js";

const { env } = args;
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });


export default {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_SESSION: process.env.SECRET_SESSION,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
};
