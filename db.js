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

// Desktop Endpoints
export async function DPenztarok()
{
    let sql = 'SELECT DISTINCT szamla.spenztar FROM szamla WHERE 1';
    const [result] = await connection.execute(sql);
    return result;
}

export async function DBelepes(aazon) {
    let sql = 'SELECT alkalmazott.agepjog FROM alkalmazott WHERE aazon = ?';
    const [result] = await connection.execute(sql, [aazon]);
    return result;
}

export async function DAlkalmazott(aazon) {
    let sql = 'SELECT alkalmazott.anev, alkalmazott.amunka, alkalmazott.aszul, alkalmazott.abelepes FROM alkalmazott WHERE aazon = ?';
    const [result] = await connection.execute(sql, [aazon]);
    return result;
}

export async function DTermekLista() {
    let sql = 'SELECT termek.tazon, termek.tnev, termek.tkategoria FROM termek WHERE 1';
    const [result] = await connection.execute(sql);
    return result;
}

export async function DTermek(tazon) {
    let sql = 'SELECT termek.tar, termek.tmennyiseg, termek.tmennyisegiegyseg, termek.tkoros FROM termek WHERE tazon = ?';
    const [result] = await connection.execute(sql, [tazon]);
    return result;
}

export async function DUjSzamla(spenztar, selado, sfizetesimod) {
    let sql = 'INSERT INTO szamla (szamla.spenztar, szamla.selado, szamla.sfizetesimod) VALUES (?, ?, ?)';
    const [result] = await connection.execute(sql, [spenztar, selado, sfizetesimod]);
    return result;
}

export async function DUjTetel(sazon, tazon, mennyiseg) {
    let sql = 'INSERT INTO tetel (tetel.sazon, tetel.tazon, tetel.mennyiseg) VALUES (?, ?, ?)';
    const [result] = await connection.execute(sql, [sazon, tazon, mennyiseg]);
    return result;
}
//

// Web Endpoints


//