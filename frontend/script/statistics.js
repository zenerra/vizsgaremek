const cashierPerformance = document.getElementById('cashiersperformance');
const paymentPreference = document.getElementById('paymentpreference');
const monthlySales = document.getElementById('monthlysales');


fetch('/server/alkalmazott/cashiers-performance')
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch cashiers performance');
        return response.json();
    })
    .then(data => {
        new Chart(cashierPerformance, {
            type: 'bar',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    label: '# Number of Receipts Issued',
                    data: data.map(item => item.receipt_count),
                    borderWidth: 2,
                    backgroundColor: 'rgba(0, 125, 252, 1)',
                    borderColor: 'rgba(245, 245, 245, 1)'
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {

                            callback: function (value) {
                                if (Number.isInteger(value)) {
                                    return value;
                                }
                                return null;
                            },

                        },
                        beginAtZero: true
                    }
                }
            }
        });

        // Update cashier list dynamically

        const cashierList = document.querySelector('.tabsDiv div:first-child ul');
        cashierList.innerHTML = '';
        const br = document.createElement('br');
        data.forEach((item, index) => {
            const li = document.createElement('li');

            if (index === 0) {
                li.innerHTML = `${item.name} - The owner of the store<br>‎ `;
            }
            else {
                li.innerHTML = `${item.name} has been with us for ${item.days_working} days`;
            }



            cashierList.appendChild(li);
            cashierList.appendChild(br);
        });
    })
    .catch(error => {
        console.error('Error fetching cashiers performance:', error);
        cashierPerformance.insertAdjacentHTML('afterend', '<p style="color: red;">Failed to load cashiers performance data</p>');
    });

fetch('/server/szamla/payment-preference')
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch payment preference');
        return response.json();
    })
    .then(data => {
        new Chart(paymentPreference, {
            type: 'pie',
            data: {
                labels: data.map(item => item.method),
                datasets: [{
                    label: 'Payment Method Preference',
                    data: data.map(item => item.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(0, 125, 252, 1)'
                    ],
                    borderColor: [
                        'rgba(245, 245, 245, 1)',
                        'rgba(245, 245, 245, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching payment preference:', error);
        paymentPreference.insertAdjacentHTML('afterend', '<p style="color: red;">Failed to load payment preference data</p>');
    });


fetch('/server/szamla/monthly-sales')
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch monthly sales');
        return response.json();
    })
    .then(data => {
        // Sum up total sales
        sum_yearlysales = Number(data.reduce((sum, item) => sum + item.total_sales, 0)).toLocaleString();;
        monthlySales.insertAdjacentHTML('afterend', `Total Yearly Sales <span style="color: var(--signaturecolor); font-weight: bold; padding: 1rem; font-size:2rem"> ${sum_yearlysales} Ft<span></p>`);
        new Chart(monthlySales, {
            type: 'line',
            data: {
                labels: data.map(item => item.month),
                datasets: [{
                    label: 'Monthly Sales (in HUF)',
                    data: data.map(item => item.total_sales),
                    fill: true,
                    borderColor: 'rgba(245, 245, 245, 1)',
                    backgroundColor: 'rgba(0, 125, 252, 1)',
                    tension: 0.3,
                    pointBackgroundColor: 'rgba(245, 245, 245, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Error fetching monthly sales:', error);
        monthlySales.insertAdjacentHTML('afterend', '<p style="color: red;">Failed to load monthly sales data</p>');
    });
