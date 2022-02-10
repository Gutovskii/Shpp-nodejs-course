import { RowDataPacket } from "mysql2";
import { db } from "../database/connection";

export const analyticsService = async (id: string, path: string): Promise<boolean> => {
    let sql = `
        UPDATE books`;
    
    switch (path) {
        case '/clicked':
            sql += `
                SET books.clicked = books.clicked + 1
            `;
            break;
        case '/wishful':
            sql += `
                SET books.wishful = books.wishful + 1
            `;
            break;
    }

    sql += `
        WHERE books.book_id = ?`;
        
    const [result] = await db.query<RowDataPacket[]>(sql, [id]);
    return true;
}