import { createPool } from "mysql2/promise";
import { poolOptions } from "./options";

export const db = createPool(poolOptions);