// Szükséges modulok importálása
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import e from 'express';
//

dotenv.config();
const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'db_nyilvantartas'
    
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

export async function DUjSzamla(ujSzamla) {
    let sql = 'INSERT INTO szamla (szamla.spenztar, szamla.selado, szamla.sfizetesimod) VALUES (?, ?, ?)';
    const [result] = await connection.execute(sql, [ujSzamla.spenztar, ujSzamla.selado, ujSzamla.sfizetesimod]);
    return result;
}

export async function DUjTetel(ujTetel) {
    let sql = `INSERT INTO tetel (tetel.sazon, tetel.tazon, tetel.mennyiseg) VALUES (?, ?, ?);
    UPDATE termek SET termek.tmennyiseg = termek.tmennyiseg - ? WHERE termek.tazon = ?`;
    const [result] = await connection.execute(sql, [ujTetel.sazon, ujTetel.tazon, ujTetel.mennyiseg, ujTetel.mennyiseg, ujTetel.tazon]);
    
    if (await connection.execute('SELECT IF(termek.tmennyiseg < termek.tminkeszlet, "true", "false") WHERE termek.tazon = ?', [ujTetel.tazon]) == "true") {
        const [adatok] = await connection.execute('SELECT termek.tnev, termek.mennyiseg, termek.mennyisegiegyseg, termek.tminkeszlet, termek.trendeles, beszallito.bemail, beszallito.bnev FROM termek JOIN beszallito USING(bazon) WHERE termek.tazon = ?', [ujTetel.tazon])
        console.log(`
            \n
            A(z) ${adatok[0]} -ból/-ből a készlet mennyiség elérte kritikus pontot! \n
            Jelenlegi mennyiség: ${adatok[1]} ${adatok[2]} \n
            Meghatározott határérték: ${adatok[3]} ${adatok[2]} \n \n
            Új rendelés leadva ${adatok[4]} ${adatok[2]} ${adatok[0]} -ról/-ről a(z) ${adatok[5]} e-mail címre. \n \n
            Beszállító kapcsolattartási adatai: \n
            \t- Megnevezés: ${adatok[6]} \n
            \t- E-mail cím: ${adatok[5]}
        `);
        await connection.execute('UPDATE termek SET termek.tmennyiseg = termek.tmennyiseg + termek.trendeles WHERE termek.tazon = ?', [ujTetel.tazon]);
        
    }
    return result;
}
//

export async function Belepes(felulet, id)
{
    let sql;
    if (felulet == "desktop") {
        sql = 'SELECT alkalmazott.agepjog FROM alkalmazott WHERE aazon = ?;';
    }
    else if (felulet == "web") {
        sql = `SELECT aazon FROM alkalmazott WHERE aazon = ? AND webjog IS TRUE;`;
    }
    else{  
        alert("Error"); 
        return null;   
    }
    const [result] = await connection.execute(sql, [id]);
    return result;
}

// Web Endpoints

/* 
export async function WBelepes(id)
{
    let sql = 'SELECT aazon FROM alkalmazott WHERE aazon =  AND webjog IS TRUE;';
    const [result] = await connection.execute(sql);
    return result;
}
*/    

export async function WTermekek()
{
    const sql = `
    SELECT tazon, tnev, tkategoria, tar, tmennyiseg, tkoros, tmennyisegiegyseg, aazon, bnev, bemail, orszag, iranyitoszam, telepules, kozterulet, hazszam 
    FROM termek 
    JOIN beszallito ON termek.bazon = beszallito.bazon 
    JOIN cim ON beszallito.bcim = cim.cazon 
    WHERE 1;
`;
    const [result] = await connection.execute(sql);
    return result;
}
export async function WUpdateTermek(termek) {
    const sql = `
    UPDATE termek SET 
        tnev = ?, tkategoria = ?, tar = ?, tmennyiseg = ?, tmennyisegiegyseg = ?, tkoros = ?, bazon = ?
    WHERE 
        tazon = ?;
`;
    const [result] = await connection.execute(sql, [
        termek.tnev,           
        termek.tkategoria,     
        termek.tar,            
        termek.tmennyiseg,   
        termek.tmennyisegiegyseg, 
        termek.tkoros,         
        termek.bazon,          
        termek.tazon           
    ]);
    return result;
}
export async function WSzamlak()
{
    const sql = `
    SELECT  sazon, skiallitas, sfizetesimod, spenztar, aazon, anev, scim, orszag, iranyitoszam, telepules, kozterulet, hazszam, mennyiseg, tnev, tar, tmennyisegiegyseg
    FROM cim
    JOIN szamla ON cim.scim = szamla.cazon
    JOIN alkalmazott ON szamla.selado = alkalmazott.aazon
    JOIN tetel ON tetel.sazon = szamla.sazon 
    JOIN termek ON termek.tazon = tetel.tazon
    WHERE 1;
`;  const [result] = await connection.execute(sql);
    return result;
} 



export async function WUpdateSzamla(termek, tetel) {
    const sql = `
    UPDATE szamla
    SET szamla.skiallitas = ?, szamla.scim = ?, szamla.spenztar = ?, szamla.selado = ?, szamla.sfizetesimod = ? WHERE szamla.sazon = ?;
    UPDATE tetel
    SET tetel.tazon = ?, tetel.mennyiseg = ? WHERE tetel.sazon = ? AND tetel.tazon = ?;`;

    const [result] = await connection.execute(
    sql, [
        termek.skillitas,           
        termek.scim,     
        termek.spenztar,            
        termek.selado,   
        termek.sfizetesimod, 
        termek.sazon,
        tetel.tazon,
        tetel.mennyiseg,
        tetel.sazon,
        tetel.tazon 
        ]); 
    
    
    return result;
}
export async function WMunkaAdatok()
{
    const sql = `
    SELECT aazon, anev, abelepes, sazon, skiallitas 
    FROM alkalmazottak 
    JOIN szamla ON alkalmazott.aazon = szamla.selado WHERE 1;
`;  const [result] = await connection.execute(sql);
    return result;
} 

export async function WSzamlaAdatok()
{
    const sql = `
    SELECT szamla.sazon, szamla.skiallitas, szamla.sfizetesimod FROM szamla WHERE 1;
`;  const [result] = await connection.execute(sql);
    return result;
} 




//