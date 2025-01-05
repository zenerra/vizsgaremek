// Szükséges modulok importálása
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
//

dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the MySQL server: ' + err.stack);
        return;
    }
    console.log('Connected to the MySQL server.');
});


export async function penztarok()
{
    let sql = 'SELECT DISTINCT szamla.spenztar FROM szamla WHERE 1';
    const [result] = await connection.execute(sql);
    return result;
}