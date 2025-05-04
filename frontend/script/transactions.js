


let notificationTimeout = null;

function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    if (!notification) {
        console.error("Notification element not found in the DOM.");
        return;
    }

    // Clear any existing timeout to prevent premature hiding
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    notification.textContent = message;
    notification.className = `notification ${type}`; // Reset classes and add type
    notification.classList.add("show");

    // Set a new timeout to hide the notification
    notificationTimeout = setTimeout(() => {
        notification.classList.remove("show");
        notificationTimeout = null;
    }, 3000);
}

async function fetchTransactions() {
    try {
        const response = await fetch("/server/szamla");
        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.status}`);
        }
        const transactions = await response.json();
        displayTransactions(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        showNotification(`Error loading transactions: ${error.message}`, "warning");
        document.getElementById("transactionsBody").innerHTML = "<tr><td colspan='7'>No transactions available.</td></tr>";
    }
}

// Display transactions in the table
function displayTransactions(transactions) {
    const tbody = document.getElementById("transactionsBody");
    tbody.innerHTML = "";

    if (transactions.length === 0) {
        tbody.innerHTML = "<tr><td colspan='7'>No transactions available.</td></tr>";
        return;
    }

    transactions.forEach(tx => {
        const row = document.createElement("tr");
        const formattedDate = new Date(tx.skiallitas)
            .toISOString()
            .replace(/T/, " ")
            .replace(/Z/, "")
            .replace(/(\.\d{2})\d*/, "$1")
            .replace(/-/g, "/");
        row.innerHTML = `
            <td>${tx.sazon}</td>
            <td>${formattedDate}</td>
            <td>${tx.sfizetesimod}</td>
            <td>${tx.spenztar}</td>
            <td>${tx.anev} (${tx.aazon})</td>
            <td>${tx.total_amount} Ft</td>
            <td><button class="edit-btn">Edit</button></td>
        `;

        // Add click event to the Edit button to populate the form
        const editButton = row.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            console.log("INSETRT FORM")
            populateForm(tx);
            document.getElementById("edittransaction").scrollIntoView({ behavior: "smooth" });
        });



        tbody.appendChild(row);
    });
}

// Populate the form with transaction data
function populateForm(transaction) {
    const form = document.getElementById("edittransaction");



    document.getElementById("datetime").value = transaction.skiallitas.replace(" ", "T").slice(0, 16); // Format for datetime-local
    document.getElementById("register").value = transaction.spenztar || "";
    document.getElementById("cashier").value = transaction.aazon || "";
    document.getElementById("id").value = transaction.sazon || "";

    // Set the payment method radio button
    const cashRadio = document.getElementById("cash-radio");
    const cardRadio = document.getElementById("card-radio");
    if (transaction.sfizetesimod === "készpénz") {
        cashRadio.checked = true;
    } else if (transaction.sfizetesimod === "kártya") {
        cardRadio.checked = true;
    }
}

// Handle form submission for editing a transaction
async function editTransaction() {
    const form = document.getElementById("edittransaction");
    const sazon = form.querySelector("#id").value;

    if (!sazon || isNaN(sazon)) {
        showNotification("Please provide a valid Transaction ID to edit.", "warning");
        return;
    }

    const data = {
        skiallitas: form.querySelector("#datetime").value.replace("T", " "),
        spenztar: parseInt(form.querySelector("#register").value),
        selado: parseInt(form.querySelector("#cashier").value),
        sfizetesimod: form.querySelector("input[name='select']:checked")?.value || "készpénz",
        sazon: parseInt(sazon),
        scim: 1
    };

    try {
        const response = await fetch(`/server/szamla`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const error = await response.json();
            showNotification(`Error updating transactions`, "warning");
        }
        form.reset();
        fetchTransactions();
        showNotification("Transaction updated successfully.", "success");
    } catch (error) {
        showNotification(`Error updating transaction: ${error.message}`, "warning");
    }
}


async function deleteTransaction(sazon) {
    if (!sazon || isNaN(sazon)) {
        showNotification("Please provide a valid Transaction ID to delete.", "warning");
        return;
    }

    try {
        const response = await fetch(`/server/szamla/${sazon}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Failed to delete transaction");
        }


        showNotification("Transaction deleted successfully.", "success");
        fetchTransactions();
        document.getElementById("edittransaction").reset();
    }

    catch (error) {
        console.error("Error deleting product:", error);
        showNotification(`Error deleting product: ${error.message}`, "warning");
        fetchProducts();
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetchTransactions();


    document.getElementById("editTransactionBtn").addEventListener("click", editTransaction);
    document.getElementById("deleteTransactionBtn").addEventListener("click", async () => {
        const sazon = document.getElementById("id").value;
        if (sazon && !isNaN(sazon)) {

            await deleteTransaction(sazon);

        } else {
            showNotification("Please provide a valid Transaction ID to delete.", "warning");
        }
    });
});