// Notification funkció
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) {
        console.error('Notification div not found!');
        return;
    }
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Beszállítók lekérése és validSupplierIds frissítése
async function fetchSuppliers() {
    try {
        const response = await fetch('/server/beszallito');
        if (!response.ok) throw new Error(`Failed to fetch suppliers: ${response.status}`);
        const suppliers = await response.json();
        validSupplierIds = suppliers.map(s => s.bazon);
        return validSupplierIds;
    } catch (error) {
        console.error('Error fetching suppliers:', error);
        showNotification(`Error loading suppliers: ${error.message}`, 'warning');
        validSupplierIds = [];
        return [];
    }
}

// Termékek lekérése és megjelenítése
async function fetchProducts() {
    try {
        const response = await fetch('/server/termek/all');
        if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
        const products = await response.json();
        const container = document.getElementById('productCards');
        if (!container) throw new Error('Product cards container not found!');
        container.innerHTML = '';
        if (products.length === 0) {
            container.innerHTML = '<p>No products available.</p>';
            return;
        }
        products.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'tab card';

            const name = document.createElement('h3');
            name.textContent = `${product.tnev || 'N/A'}${product.tkoros ? ' (+18)' : ''}`;
            card.appendChild(name);

            const category = document.createElement('p');
            category.textContent = `Category: ${product.tkategoria || 'N/A'}`;
            card.appendChild(category);

            const price = document.createElement('p');
            price.textContent = `${product.tar || 0} HUF`;
            card.appendChild(price);

            const stock = document.createElement('p');
            const stockClass = (product.tmennyiseg < (product.tminkeszlet || 0) || (product.tmennyiseg || 0) === 0)
                ? 'stockempty'
                : (product.tmennyiseg || 0) <= (product.tminkeszlet || 0) * 1.1
                    ? 'stockshortage'
                    : '';
            stock.className = stockClass;
            stock.textContent = `Stock: ${product.tmennyiseg || 0} ${product.tmennyisegiegyseg || 'N/A'}`;
            card.appendChild(stock);

            const productId = document.createElement('p');
            productId.textContent = `Product ID: ${product.tazon || 'N/A'}`;
            card.appendChild(productId);

            const supplierId = document.createElement('p');
            supplierId.textContent = `Supplier ID: ${product.bazon || 'N/A'}`;
            card.appendChild(supplierId);

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                showForm(product);
                document.getElementById('edititem').scrollIntoView({ behavior: 'smooth' });
            });
            card.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteProduct(product.tazon));
            card.appendChild(deleteButton);

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        showNotification(`Error loading products: ${error.message}`, 'warning');
        document.getElementById('productCards').innerHTML = '<p>No products available.</p>';
    }
}


function showForm(product = {}) {
    const form = document.getElementById('edititem');
    if (!form) {
        console.error('Edit form not found!');
        return;
    }

    form.reset();

    const validCategories = [
        'Pékáru', 'Tejtermék', 'Szeszesital', 'Italok', 'Gyümölcs', 'Húsáru', 'Zöldség',
        'Fagyasztott', 'Konzervek', 'Édesség', 'Háztartás', 'Személyes higiénia', 'Gyógyszer', 'Egyéb'
    ];

    let categoryValue = product.tkategoria || 'Egyéb';
    if (product.tkategoria && !validCategories.includes(product.tkategoria)) {
        console.warn(`Invalid category for product ${product.tazon || 'unknown'}: ${product.tkategoria}. Defaulting to 'Egyéb'.`);
        showNotification(`Warning: The category "${product.tkategoria}" for product "${product.tnev || 'unknown'}" is invalid. Defaulting to 'Egyéb'.`, 'warning');
        categoryValue = 'Egyéb';
    }

    document.getElementById('productname').value = product.tnev || '';
    document.getElementById('tkoros').checked = Boolean(product.tkoros);
    document.getElementById('tkategoria').value = categoryValue;
    document.getElementById('tar').value = product.tar || '';
    document.getElementById('tmennyiseg').value = product.tmennyiseg || '';
    document.getElementById('tmennyisegiegyseg').value = product.tmennyisegiegyseg || 'db';
    document.getElementById('tminkeszlet').value = product.tminkeszlet || '';
    document.getElementById('trendeles').value = product.trendeles || '';
    document.getElementById('tazon').value = product.tazon || '';
    document.getElementById('bazon').value = product.bazon || '';
}

// Űrlap validációja
function validateForm(form) {
    const errors = [];
    const tnev = form.tnev.value.trim();
    const tar = parseInt(form.tar.value);
    const tmennyiseg = parseFloat(form.tmennyiseg.value);
    const tminkeszlet = parseFloat(form.tminkeszlet.value);
    const trendeles = parseFloat(form.trendeles.value);
    const bazon = parseInt(form.bazon.value);

    if (!tnev || tnev.length > 100) errors.push('Product name is required and must be ≤ 100 characters.');
    if (isNaN(tar) || tar < 0) errors.push('Price must be a non-negative number.');
    if (isNaN(tmennyiseg) || tmennyiseg < 0) errors.push('Stock must be a non-negative number.');
    if (isNaN(tminkeszlet) || tminkeszlet < 0) errors.push('Minimum quantity must be a non-negative number.');
    if (isNaN(trendeles) || trendeles < 0) errors.push('Refill size must be a non-negative number.');
    if (isNaN(bazon) || bazon <= 0) errors.push('Supplier ID must be a positive integer.');
    if (!validSupplierIds.includes(bazon)) errors.push('Supplier ID does not exist in the suppliers list.');

    if (errors.length > 0) {
        showNotification(errors.join(' '), 'warning');
        return false;
    }
    return true;
}


function emptyForm() {
    const form = document.getElementById('edititem');
    form.reset();
    showNotification('Form successfully reset.', 'success');
}

async function editByProductId() {
    const form = document.getElementById('edititem');
    if (!form || !validateForm(form)) return;

    const tazon = form.tazon.value;
    if (!tazon || isNaN(tazon)) {
        showNotification('Please provide a valid Product ID to edit.', 'warning');
        return;
    }

    const data = {
        tnev: form.tnev.value.trim(),
        tkategoria: form.tkategoria.value,
        tar: parseInt(form.tar.value),
        tmennyiseg: parseFloat(form.tmennyiseg.value),
        tmennyisegiegyseg: form.tmennyisegiegyseg.value,
        tminkeszlet: parseFloat(form.tminkeszlet.value),
        trendeles: parseFloat(form.trendeles.value),
        tkoros: form.tkoros.checked ? 1 : 0,
        bazon: parseInt(form.bazon.value),
    };
    try {
        const response = await fetch(`/server/termek/${tazon}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update product');
        }

        fetchProducts();
        showNotification('Product updated successfully.', 'success');
    } catch (error) {
        console.error('Error updating product:', error);
        showNotification(`Error updating product: ${error.message}`, 'warning');
    }
}

async function createProduct() {
    const form = document.getElementById('edititem');
    if (!form || !validateForm(form)) return;

    const data = {
        tnev: form.tnev.value.trim(),
        tkategoria: form.tkategoria.value,
        tar: parseInt(form.tar.value),
        tmennyiseg: parseFloat(form.tmennyiseg.value),
        tmennyisegiegyseg: form.tmennyisegiegyseg.value,
        tminkeszlet: parseFloat(form.tminkeszlet.value),
        trendeles: parseFloat(form.trendeles.value),
        tkoros: form.tkoros.checked ? 1 : 0,
        bazon: parseInt(form.bazon.value),
    };
    try {
        const response = await fetch('/server/termek', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create product');
        }
        const result = await response.json();

        fetchProducts(); 
        showNotification(`Product created successfully. ID: ${result.tazon}`, 'success');
    } catch (error) {
        console.error('Error creating product:', error);
        showNotification(`Error creating product: ${error.message}`, 'warning');
    }
}


async function deleteProduct(tazon) {
    if (!tazon || isNaN(tazon)) {
        showNotification('Please provide a valid Product ID.', 'warning');
        return;
    }
    try {
        const response = await fetch(`/server/termek/${tazon}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete product');
        }
        fetchProducts();
        showNotification('Product deleted successfully.', 'success');
    } catch (error) {
        console.error('Error deleting product:', error);
        showNotification(`Error deleting product: ${error.message}`, 'warning');
        fetchProducts(); 
    }
}

function refreshProducts() {
    fetchProducts();
    showNotification('Products refreshed.', 'success');
}


document.addEventListener('DOMContentLoaded', async () => {
    validSupplierIds = await fetchSuppliers(); 
    fetchProducts(); 

    document.getElementById('edititem')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const tazon = document.getElementById('tazon').value;
        if (tazon) editByProductId();
        else createProduct();
    });

    document.getElementById('resetForm')?.addEventListener('click', emptyForm);
    document.getElementById('refreshProducts')?.addEventListener('click', refreshProducts);
});