document.addEventListener('DOMContentLoaded', function () {
    // =================================================================
    // || KONFIGURASI ADMIN (JANGAN UBAH JIKA TIDAK PERLU) ||
    // =================================================================
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxSFFpRMLrM8vvV7QyjaECIdtzuWqWsyUj7zmFh9GhovEexdd7ojq_h8cfjBNP-gNz4/exec"; // URL Google Script yang sama
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "admin1";
    const API_KEY = "WhenStellariaMjk"; // Kunci Rahasia yang sama

    // =================================================================
    // || Elemen DOM ||
    // =================================================================
    const loginSection = document.getElementById('login-section');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const logoutButton = document.getElementById('logout-button');
    const refreshButton = document.getElementById('refresh-button');
    const loader = document.getElementById('loader');
    const ordersTable = document.getElementById('orders-table');
    const ordersTbody = document.getElementById('orders-tbody');
    const totalRevenueEl = document.getElementById('total-revenue');
    const memberSummaryEl = document.getElementById('member-summary');

    // =================================================================
    // || FUNGSI UTAMA ||
    // =================================================================

        const togglePasswordButton = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggle-icon');

    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function() {
            // Ganti tipe input dari password ke text atau sebaliknya
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Ganti ikon mata
            if (type === 'password') {
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            } else {
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            }
        });
    }

    // Cek status login saat halaman dimuat
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
        showDashboard();
    }

    // Cek status login saat halaman dimuat
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
        showDashboard();
    }

    // Handler untuk form login
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            showDashboard();
        } else {
            loginError.textContent = 'Invalid username or password.';
            setTimeout(() => { loginError.textContent = ''; }, 3000);
        }
    });

    // Handler untuk logout
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        showLogin();
    });

    // Handler untuk refresh data
    refreshButton.addEventListener('click', fetchData);

    function showDashboard() {
        loginSection.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        fetchData();
    }

    function showLogin() {
        loginSection.classList.remove('hidden');
        adminDashboard.classList.add('hidden');
    }

    // Fungsi untuk mengambil data dari Google Sheet
    async function fetchData() {
        loader.style.display = 'block';
        ordersTable.classList.add('hidden');

        try {
            const response = await fetch(`${SCRIPT_URL}?action=getOrders&apiKey=${API_KEY}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            renderTable(data);
            calculateSummary(data);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert(`Failed to fetch data: ${error.message}`);
            loader.innerHTML = `<p class="text-red-500">Failed to load data. Please try again.</p>`;
        } finally {
            loader.style.display = 'none';
            ordersTable.classList.remove('hidden');
        }
    }

    // Fungsi untuk merender tabel pesanan
    function renderTable(data) {
        ordersTbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            const isDone = row.Status === 'DONE';
            tr.className = isDone ? 'status-done' : '';

            tr.innerHTML = `
                <td>
                    <input type="checkbox" class="status-checkbox w-5 h-5 rounded" data-row-id="${row.Timestamp}" ${isDone ? 'checked' : ''}>
                </td>
                <td>${new Date(row.Timestamp).toLocaleString('id-ID')}</td>
                <td>${row.Nama}</td>
                <td>${row.Email}</td>
                <td>${row['No. WhatsApp']}</td>
                <td class="whitespace-pre-wrap">${row.Pesanan}</td>
                <td>${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.Total)}</td>
                <td><a href="${row['Link Bukti Bayar']}" target="_blank" class="text-purple-400 hover:underline">View Proof</a></td>
            `;
            ordersTbody.appendChild(tr);
        });

        // Tambah event listener untuk checkbox
        document.querySelectorAll('.status-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', updateStatus);
        });
    }

    // Fungsi untuk mengupdate status 'DONE'
    async function updateStatus(event) {
        const checkbox = event.target;
        const timestamp = checkbox.dataset.rowId;
        const isChecked = checkbox.checked;
        const status = isChecked ? 'DONE' : '';

        checkbox.disabled = true;

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'updateStatus',
                    apiKey: API_KEY,
                    timestamp: timestamp,
                    status: status
                })
            });
            const result = await response.json();
            if (result.result !== 'success') {
                throw new Error(result.message || 'Unknown error');
            }
            // Toggle style setelah berhasil
            checkbox.closest('tr').classList.toggle('status-done', isChecked);
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please refresh and try again.');
            // Revert checkbox state on failure
            checkbox.checked = !isChecked;
        } finally {
            checkbox.disabled = false;
        }
    }

    // Fungsi untuk kalkulasi rangkuman
    function calculateSummary(data) {
        // Total Pendapatan
        const totalRevenue = data.reduce((sum, row) => sum + parseFloat(row.Total || 0), 0);
        totalRevenueEl.textContent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalRevenue);

        // Rangkuman per member
        const memberCounts = {
            'NAE': 0, 'YUNA': 0, 'ALICE': 0, 'MELODY': 0, 'ELLA': 0, 'Group Cheki': 0
        };

        data.forEach(row => {
            const pesanan = row.Pesanan || '';
            const lines = pesanan.split('\n');
            lines.forEach(line => {
                const match = line.match(/🧡NAE🧡|💛YUNA💛|💜ALICE💜|❤️MELODY❤️|💚ELLA💚|Group Cheki 🖤/);
                const quantityMatch = line.match(/\((\d+)x/);
                if (match && quantityMatch) {
                    const memberName = match[0].replace(/🧡|💛|💜|❤️|💚|🖤/g, '').trim();
                    const quantity = parseInt(quantityMatch[1], 10);
                    if (memberCounts.hasOwnProperty(memberName)) {
                        memberCounts[memberName] += quantity;
                    } else if (memberName === "Group Cheki") {
                        memberCounts['Group Cheki'] += quantity;
                    }
                }
            });
        });

        memberSummaryEl.innerHTML = '';
        for (const member in memberCounts) {
            memberSummaryEl.innerHTML += `
                <div class="text-sm">
                    <p class="font-semibold text-slate-300">${member}</p>
                    <p class="text-xl font-bold text-purple-300">${memberCounts[member]} Cheki</p>
                </div>
            `;
        }
    }
});