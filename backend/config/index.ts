import configJson from "./config.json";

interface Config {
  db: {
    host: string;
    user: string;
    password: string;
    database: string;
  };
  dbFileEncoding: BufferEncoding;
  cookie: {
    signed: boolean;
    httpOnly: boolean;
    maxAge: number;
  };
}

export const config = configJson as Config;
