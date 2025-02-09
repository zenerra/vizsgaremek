# Nyilvántartó rendszer vizsgaremek 

E bolti nyilvántartó szoftver egy modern, integrált rendszer, amely hatékonyan segíti a készletek és tranzakciók kezelését bármelyik vegyeskereskedelmi kisboltnak. A szoftver két fő modulból áll: egy webes felületből és egy asztali applikációból. A webes felület lehetővé teszi a beérkező áruk és a raktárkészlet nyomon követését, a termékek adatainak szerkesztését, valamint részletes statisztikák és kimutatások készítését. A bolti alkalmazottak itt láthatják a legnépszerűbb termékek forgalmát, a készletmozgásokat, és exportálhatják a jelentéseket különböző időszakokra vonatkozóan. Az asztali applikáció elsősorban a vásárlói tranzakciók feljegyzésére és nyugtázására szolgál. 

Vásárlásokat és értékesítéseket lehet rögzíteni egy egyszerű, intuitív felületen, amely lehetővé teszi a nyugták automatikus formázáésát. Az alkalmazás offline módban is működik, a raktári mozgásokat pedig valós időben szinkronizálja a webes felülettel, amikor elérhető az internetkapcsolat. A rendszer többfelhasználós működést támogat, különböző jogosultsági szintekkel, és biztosítja a tranzakciók, valamint az adatmódosítások naplózását. A szoftver rugalmasan testreszabható, felhasználóbarát kialakítása pedig megkönnyíti a mindennapi munkavégzést a boltvezetők és az alkalmazottak számára.

## 1. Követelmények és tervezés
   ### Célok meghatározása:
   ### Felhasználói szerepkörök definiálása:
- **Pénztáros:** kizárólag az asztali aplikáció használatára jogosult
- **Üzletvezető:** abszolút jogosultsága van minden rendszerhez
- **Raktáros:** kizárólag a webes felület használatára van jogosultsága
  
### Funkciók listája:
- **Készletkezelés:** árubeérkezés és árukiadás követése.
- **Számlázás: egyszerű** számlák formázása és kiállítása szöveges fájl formájában.
- **Rendeléskezelés:** beszállítói rendelések létrehozása szöveges formátumban.
- **Jelentések készítése:** eladási statisztikák, készletinformációk megtekinthetők a webes felületen.
- **Beszállító entitás:** kapcsolattartási e-mail cím tárolása.
  
### Adatmodell kialakítása:
- **Termékek:** termék azonosítója, termék neve,termék kategóriája, termék ára (egységenként), készlet mennyiség, mennyiségi egység, beszállító azonosítója, korhatáros (logikai érték, igaz/hamis)
- **Vásárlási tételétel:** számla / vásárlás azonosítója, termék azonosítója, vásárolt mennyiség
- **Alkalmazottak:** alkalmazott azonosítója, alkalmazott munkaköre, alkalmazott neve, alkalmazott születési dátuma, alkalmazott belépésének dátuma, alkalmazott bére, alkalmazott hozzáférése a webes és natív asztali felületekhez
- **Beszállítók:** beszállító azonosítója, beszállító neve, beszállító címének azonosítója, beszállító e-mail címe
- **Címek:** cím azonosítója, ország, irányítószám, település, utca, házszám
- **Számlák:** számla kiállítási dátuma és ideje, számla azonosítója, választott fizetési mód, üzlet címének azonosítója, pénztár azonosítója, eladó alkalmazott azonosítója
## 2. Fejlesztési folyamat
### Készletkezelés megvalósítása:
   - Termékek hozzáadása, szerkesztése és törlése.
   - Készletmozgások, beérkezés és eladás naplózása.
### Számlázó modul fejlesztése:
  - Vásárlási tételek tranzakcióhoz adása.
  - Számla generálása szöveges fájl formátumában.
  - Számla adatok tárolása későbbi visszakereséshez. **--!!**
### Rendeléskezelés:
  - Hiányzó vagy fogyó áruk automatikus azonosítása.
  - Beszállítói rendelés létrehozása szöveges formában.
  - Beszállítói számla adatok tárolása későbbi visszakereséshez.
### Kapcsolattartás a beszállítókkal:
  - Beszállító entitás kezelése.
  - Alacsony készlet esetén automatikus figyelemfelhívás, küldésre kész rendeléssel együtt.
## 3. Felhasználói felület kialakítása
  ### Egyszerű és áttekinthető UI:
  - Könnyen kezelhető termék- és számlázási modul.
  - Készletjelentések és rendelési előzmények gyors elérése
  ### Webes és asztali felület:
  - **Webes:** Jelentések megjelenítése és adatbázis tartalom manuális módosítása.
  - **Asztali:** Egyszerűsített számlák kiállítása és adatbázis tartalom automatikus módosítása.
## 4. Tesztelés és bevezetés
  ### Rendszer tesztelése:
  - Különböző esetek szimulálása (pl. áru beérkezés, eladás, rendelés).
  - Hibák javítása és optimalizálás.
  ### Felhasználók betanítása
  - Esetleges súgó opció implementálása
## 5. Eszközök és technológia
  - **Adatbázis:** MySQL
  - **Backend:** Node.js, Express.
  - **Frontend:** HTML/CSS (+Bootstrap)/JavaScript
  - **Asztali applikáció:** C# .NET Windows Forms Application **--!! (BBCode)**
  - **Projekt menedzsment:** Trello
  - **Verziókezelés:** GitHub
  - **Általános kommunikáció:** Microsoft Teams, Discord
## 6. Munka elosztás és együttműködés
   - **Hummel Vendel:** Natív asztali applikáció fejlesztése, tesztelése és dokumentálása, valamint a backend végpontok tesztelése
   - **Hunka Róbert Emánuel:** Reszponzív webes felület fejlesztése, tesztelése és dokumentálása, valamint az adatbázis funkciók tesztelése
   - **Közösen elvégzett feladatok:** Általános dokumentáció, adatbázis és backend végpontok kialakítása
# Összegzés és további fejlesztési lehetőségek

#### Fejlesztők:
  - **Hummel Vendel**
  - **Hunka Róbert Emánuel**
