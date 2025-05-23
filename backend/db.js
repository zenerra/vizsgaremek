import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


let connection;

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "db_nyilvantartas",
    });
        
    } catch (error) {
        console.error("Failed to connect to database:", error);
        throw error;
    }

// Login Endpoint between the platforms
export async function Belepes(felulet, id) {
    try {
        
        if (id === undefined || id === null) {
            console.error('Invalid id: id is undefined or null');
            throw new Error('Felhasználói azonosító nem lehet üres');
        }

        let sql;
        if (felulet == "desktop") {
            sql = "SELECT alkalmazott.agepjog FROM alkalmazott WHERE aazon = ?;";
        } else if (felulet == "web") {
            sql = `SELECT alkalmazott.awebjog FROM alkalmazott WHERE aazon = ?;`;
        } else {
            console.error("Invalid felulet:", felulet);
            return null;
        }
        
        const [result] = await connection.execute(sql, [id]);
        return result;
    } catch (error) {
        console.error('Error in Belepes:', error);
        throw error;
    }
}

// Desktop Endpoints
export async function DPenztarok() {
    let sql = "SELECT DISTINCT szamla.spenztar FROM szamla WHERE 1";
    const [result] = await connection.execute(sql);
    return result;
}

export async function DAlkalmazott(aazon) {
    let sql = "SELECT alkalmazott.anev, alkalmazott.amunka, alkalmazott.aszul, alkalmazott.abelepes FROM alkalmazott WHERE aazon = ?";
    const [result] = await connection.execute(sql, [aazon]);
    return result;
}

export async function DTermekLista() {
    let sql =
        "SELECT termek.tazon, termek.tnev, termek.tkategoria FROM termek WHERE 1";
    const [result] = await connection.execute(sql);
    return result;
}

export async function DTermek(tazon) {
    let sql =
        "SELECT termek.tar, termek.tnev, termek.tmennyiseg, termek.tmennyisegiegyseg, termek.tkoros FROM termek WHERE tazon = ?";
    const [result] = await connection.execute(sql, [tazon]);
    return result;
}

export async function DUjSzamla(ujSzamla) {
    let sql =
        "INSERT INTO szamla (szamla.sazon, szamla.spenztar, szamla.selado, szamla.sfizetesimod) VALUES (?, ?, ?, ?)";
    const [result] = await connection.execute(sql, [
        ujSzamla.sazon,
        ujSzamla.spenztar,
        ujSzamla.selado,
        ujSzamla.sfizetesimod,
    ]);
    return result;
}

export async function DLegutobbiSzamla() {
    let sql = "SELECT MAX(szamla.sazon) as sazon FROM szamla";
    const [result] = await connection.execute(sql);
    return result;
}

export async function DUzlet() {
    let sql = "SELECT cim.orszag, cim.iranyitoszam, cim.telepules, cim.kozterulet, cim.hazszam FROM cim WHERE cim.cazon = 1";
    const [result] = await connection.execute(sql);
    return result;
}

export async function DUjTetel(ujTetel) {
    let sql = `INSERT INTO tetel (tetel.sazon, tetel.tazon, tetel.mennyiseg) VALUES (?, ?, ?)`;
    const [result] = await connection.execute(sql, [
        ujTetel.sazon,
        ujTetel.tazon,
        ujTetel.mennyiseg
    ]);

    const [result2] = await connection.execute(`UPDATE termek SET termek.tmennyiseg = termek.tmennyiseg - ? WHERE termek.tazon = ?`, [
        ujTetel.mennyiseg,
        ujTetel.tazon
    ]); 

    const [[{ lowStock }]] = await connection.execute(
        'SELECT IF(tmennyiseg < tminkeszlet, "true", "false") AS lowStock FROM termek WHERE tazon = ?',
        [ujTetel.tazon]
    );
    if (lowStock === "true") {
        const [adatok] = await connection.execute(
            "SELECT termek.tnev, termek.tmennyiseg, termek.tmennyisegiegyseg, termek.tminkeszlet, termek.trendeles, beszallito.bemail, beszallito.bnev FROM termek JOIN beszallito USING(bazon) WHERE termek.tazon = ?",
            [ujTetel.tazon]
        );
       
        await connection.execute(
            "UPDATE termek SET tmennyiseg = tmennyiseg + trendeles WHERE tazon = ?",
            [ujTetel.tazon]
        );
    }
    return result;
}



// Web Endpoints

export const GetAllTermek = async () => {
    try {
        const [rows] = await connection.execute(`
            SELECT tazon, tnev, tkategoria, tar, tmennyiseg, tmennyisegiegyseg, tminkeszlet, trendeles, tkoros, bazon 
            FROM termek ORDER BY termek.tnev;
        `);
        return rows;
    } catch (error) {
        console.error('Error in GetAllTermek:', error);
        throw error;
    }
};

export async function WCreateTermek(termek) {
    const sql =
        "INSERT INTO termek (tazon, tnev, tkategoria, tar, tmennyiseg, tmennyisegiegyseg, tminkeszlet, trendeles, tkoros, bazon) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM termek WHERE tnev = ?);";
    const [result] = await connection.execute(sql, [
        termek.tazon,
        termek.tnev,
        termek.tkategoria,
        termek.tar,
        termek.tmennyiseg,
        termek.tmennyisegiegyseg,
        termek.tminkeszlet,
        termek.trendeles,
        termek.tkoros,
        termek.bazon,
        termek.tnev,
    ]);
    return result;
}

export async function WTermekek() {
    const sql = `
    SELECT termek.tazon, termek.tnev, termek.tkategoria, termek.tar, termek.tmennyiseg, termek.tkoros, 
           termek.tmennyisegiegyseg, termek.tminkeszlet, termek.trendeles, termek.bazon, 
           beszallito.bnev, beszallito.bemail, cim.orszag, cim.iranyitoszam, cim.telepules, 
           cim.kozterulet, cim.hazszam 
    FROM termek 
    JOIN beszallito ON termek.bazon = beszallito.bazon 
    JOIN cim ON beszallito.bcim = cim.cazon 
    WHERE 1
    ORDER BY termek.tnev;
`;
    const [result] = await connection.execute(sql);
    return result;
}


export async function WGetBeszallito() {
    try {
        const sql = "SELECT * FROM beszallito WHERE 1";
        const [result] = await connection.execute(sql);
        return result;
    } catch (error) {
        console.error('Error in WGetBeszallito:', error);
        throw error;
    }
}

export async function WUpdateTermek(termek) {
    const sql = `
    UPDATE termek SET 
        tnev = ?, tkategoria = ?, tar = ?, tmennyiseg = ?, tmennyisegiegyseg = ?, tkoros = ?, bazon = ?, tminkeszlet = ?, trendeles = ?
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
        termek.tminkeszlet,
        termek.trendeles,
        termek.tazon,
    ]);
    return result;
}

export async function WDeleteTermek(tazon) {
    try {
        const deleteTetelSql = "DELETE FROM tetel WHERE tazon = ?";
        await connection.execute(deleteTetelSql, [tazon]);

        const deleteTermekSql = "DELETE FROM termek WHERE tazon = ?";
        const [result] = await connection.execute(deleteTermekSql, [tazon]);
        return result;
    } catch (error) {
        throw new Error(`Cannot delete product: ${error.message}`);
    }
}
export async function WSzamlak() {
    const sql = `
    SELECT 
        szamla.sazon, 
        szamla.skiallitas, 
        szamla.sfizetesimod, 
        szamla.spenztar, 
        alkalmazott.aazon, 
        alkalmazott.anev, 
        SUM(tetel.mennyiseg * termek.tar) AS total_amount
    FROM szamla
    JOIN alkalmazott ON szamla.selado = alkalmazott.aazon
    JOIN tetel ON tetel.sazon = szamla.sazon 
    JOIN termek ON termek.tazon = tetel.tazon
    GROUP BY szamla.sazon, szamla.skiallitas, szamla.sfizetesimod, szamla.spenztar, alkalmazott.aazon, alkalmazott.anev
    ORDER BY szamla.skiallitas DESC;
`;
    const [result] = await connection.execute(sql);
    return result;
}
export async function WUpdateSzamla(szamla) {
    const sql = `
    UPDATE szamla
    SET skiallitas = ?, scim = ?, spenztar = ?, selado = ?, sfizetesimod = ?
    WHERE sazon = ?;
`;
    const [result] = await connection.execute(sql, [
        szamla.skiallitas,
        szamla.scim || 1, // Default to 1 if not provided
        szamla.spenztar,
        szamla.selado,
        szamla.sfizetesimod,
        szamla.sazon,
    ]);
    return result;
}

// Statistics Endpoints
export async function WCashiersPerformance() {

    try {
        const sql = `
            SELECT a.anev AS name, COUNT(s.sazon) AS receipt_count,DATEDIFF(CURDATE(), a.abelepes) AS days_working
            FROM alkalmazott a 
            LEFT JOIN szamla s ON a.aazon = s.selado
			WHERE a.agepjog = 1 OR a.agepjog = null
            GROUP BY a.aazon, a.anev;
        `;
        
        const [result] = await connection.execute(sql);
        
        return result;
    } catch (error) {
        console.error('Error in WCashiersPerformance:', error);
        throw error; 
    }
}
export async function WPaymentPreference() {
    const sql = `
        SELECT sfizetesimod AS method, COUNT(*) AS count
        FROM szamla
        GROUP BY sfizetesimod
    `;
    const [result] = await connection.execute(sql);
    return result;
}

export async function WMonthlySales() {
    const sql = `
        SELECT 
            DATE_FORMAT(s.skiallitas, '%Y-%m') AS month,
            SUM(t.mennyiseg * p.tar) AS total_sales
        FROM szamla s
        JOIN tetel t ON s.sazon = t.sazon
        JOIN termek p ON t.tazon = p.tazon
        WHERE s.skiallitas >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(s.skiallitas, '%Y-%m')
        ORDER BY month
    `;
    const [result] = await connection.execute(sql);
    return result;
}

export { connection };