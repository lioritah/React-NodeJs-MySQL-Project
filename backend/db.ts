import mysql, { MysqlError } from "mysql";
import { config } from "./config";

const connection = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export function asyncQuery<T>(
  sql: string,
  params: Array<string | number | Date | undefined | Boolean>
): Promise<T> {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err: MysqlError | null, results: T) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
}
