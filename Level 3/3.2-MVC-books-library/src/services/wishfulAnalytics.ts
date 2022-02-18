import { RowDataPacket } from "mysql2";
import { db } from "../database/connection";

export const wishfulService = async (id: string): Promise<void> => {
    let sql = `
        UPDATE books
        SET books.wishful = books.wishful + 1
        WHERE books.book_id = ?`;
        
    await db.query<RowDataPacket[]>(sql, [id]);
}