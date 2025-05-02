
document.addEventListener('DOMContentLoaded', async () => {
    // Alkalmazottak betöltése
    try {
        const employeesResponse = await fetch('/server/alkalmazottak');
        if (!employeesResponse.ok) {
            throw new Error(`Hiba az alkalmazottak lekérdezésekor: ${employeesResponse.status}`);
        }
        const employees = await employeesResponse.json();
        const employeesTable = document.getElementById('employeesTable');
        employees.forEach(emp => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${emp.aazon}</td><td>${emp.nev}</td>`;
            employeesTable.appendChild(row);
        });
    } catch (error) {
        console.error('Hiba az alkalmazottak betöltésekor:', error);
    }

    // Termékek betöltése
    try {
        const productsResponse = await fetch('/server/termek');
        if (!productsResponse.ok) {
            throw new Error(`Hiba a termékek lekérdezésekor: ${productsResponse.status}`);
        }
        const products = await productsResponse.json();
        const productsTable = document.getElementById('productsTable');
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${product.id}</td><td>${product.nev}</td>`;
            productsTable.appendChild(row);
        });
    } catch (error) {
        console.error('Hiba a termékek betöltésekor:', error);
    }
});