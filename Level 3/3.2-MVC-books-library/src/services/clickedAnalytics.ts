import { RowDataPacket } from "mysql2";
import { db } from "../database/connection";

export const clickedService = async (id: string): Promise<void> => {
    let sql = `
        UPDATE books
        SET books.clicked = books.clicked + 1
        WHERE books.book_id = ?`;
        
    await db.query<RowDataPacket[]>(sql, [id]);
}