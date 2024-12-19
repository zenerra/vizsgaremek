# Nyílvántartó rendszer vizsgaremek 

E bolti nyilvántartó szoftver egy modern, integrált rendszer, amely hatékonyan segíti a készletek és tranzakciók kezelését bármelyik vegyeskereskedelmi kisboltnak. A szoftver két fő modulból áll: egy webes felületből és egy asztali applikációból. A webes felület lehetővé teszi a beérkező áruk és a raktárkészlet nyomon követését, a termékek adatainak szerkesztését, valamint részletes statisztikák és kimutatások készítését. A felhasználók itt láthatják a legnépszerűbb termékek forgalmát, a készletmozgásokat, és exportálhatják a jelentéseket különböző időszakokra vonatkozóan. Az asztali applikáció elsősorban a napi tranzakciók lebonyolítására szolgál. 

Vásárlásokat és értékesítéseket lehet rögzíteni egy egyszerű, intuitív felületen, amely támogatja a vonalkódos beolvasást és a nyugták, számlák automatikus nyomtatását. Az alkalmazás offline módban is működik, a raktári mozgásokat pedig valós időben szinkronizálja a webes felülettel, amikor elérhető az internetkapcsolat. A rendszer többfelhasználós működést támogat, különböző jogosultsági szintekkel, és biztosítja a tranzakciók, valamint az adatmódosítások naplózását. A szoftver rugalmasan testreszabható, felhasználóbarát kialakítása pedig megkönnyíti a mindennapi munkavégzést a boltvezetők és az alkalmazottak számára.

## 1. Követelmények és tervezés
   ### Célok meghatározása:
   ### Felhasználói szerepkörök definiálása:
- Ki használja a rendszert (pl.: üzletvezető, eladó, raktáros)
- Milyen jogosultságokra van szükség (pl.: adatbevitel, jelentések készítése)?
  
### Funkciók listája:
- Készletkezelés: árubeérkezés és árukiadás követése.
- Számlázás: egyszerű számlák kiállítása. (pl.: szöveges fájl)
- Rendeléskezelés: beszállítói rendelések létrehozása.
- Jelentések készítése: eladási statisztikák, készletinformációk. (web)
- Beszállító tábla: kapcsolattartási adatok tárolása.
  
### Adatmodell kialakítása:
- Termékek: azonosító, név, kategória, ár, készletmennyiség, beszállító.
- Beszállítók: név, cím, elérhetőségek.
- Számlák: dátum idő, vevő adatai, vásárolt tételek, összeg.
## 2. Fejlesztési folyamat
### Készletkezelés megvalósítása:
   - Termékek hozzáadása, szerkesztése és törlése.
   - Készletmozgások (beérkezés, eladás) naplózása.
### Számlázó modul fejlesztése:
  - Vásárlási tételek kosárba helyezése.
  - Számla generálása (pl.: szöveges fájl vagy nyomtatásra kész formátum).
  - Számla adatok tárolása későbbi visszakereséshez
### Rendeléskezelés:
  - Hiányzó áruk automatikus azonosítása.
  - Beszállítói rendelés létrehozása (p.: e-mailes értesítés vagy PDF formátum).
  - Számla adatok tárolása későbbi visszakereséshez
### Kapcsolattartás a beszállítókkal:
  - Beszállítói adatbázis karbantartása.
  - Automatikus értesítések küldése (pl.: alacsony készlet esetén).
## 3. Felhasználói felület kialakítása
  ### Egyszerű és áttekinthető UI:
  - Könnyen kezelhető termék- és számlázási modul.
  - Készletjelentések és rendelési előzmények gyors elérése
  ### Webes és asztali felület:
  - Webes: Jelentések megjelenítése és adatbázis tartalom manuális módosítása
  - Asztali: Egyszerűsített számlák kiállítása és adatbázis tartalom automatikus módosítása
## 4. Tesztelés és bevezetés
  ### Rendszer tesztelése:
  - Különböző esetek szimulálása (pl. áru beérkezés, eladás, rendelés).
  - Hibák javítása és optimalizálás.
  ### Felhasználók betanítása
  - Esetleges súgó opció implementálása
## 5. Eszközök és technológia
  - Adatbázis: MySQL
  - Backend nyelv: Node.js.
  - Frontend keretrendszer: HTML/CSS/JavaScript (+Bootstrap)
  - Számlagenerátor: C# .NET Windows Forms Application

Készítők: Hummel Vendel, Hunka Róbert
