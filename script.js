document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // ADMIN CREDENTIALS (Default)
    // ==========================================
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'adminkompass';

    // ==========================================
    // LOMBA LABEL MAP
    // ==========================================
    const lombaLabel = {
        mqk: "Musabaqah Qiraatul Kutub (MQK)",
        cci: "Cerdas Cermat Islam (CCI)",
        kdm: "Kompetisi Da'i Muda (KDM)",
        matematika: "Olimpiade Matematika",
        ipa: "Olimpiade IPA Terpadu",
        kkl: "Kompetisi Kaligrafi Lukis (KKL)",
        puisi: "Cipta & Baca Puisi"
    };

    // ==========================================
    // SEED DEFAULT DATA IN LOCALSTORAGE
    // ==========================================
    const defaultParticipants = [
        { id: "KMP-482019", fullname: "Ahmad Fauzi", school: "MTs Negeri 1 Jombang", whatsapp: "081234567890", email: "ahmad@gmail.com", category: "sains", lomba: "matematika", status: "Disetujui" },
        { id: "KMP-391823", fullname: "Lailatul Fitriyah", school: "SMP Darul Ulum Peterongan", whatsapp: "089876543210", email: "laila@yahoo.com", category: "agama", lomba: "mqk", status: "Pending" },
        { id: "KMP-728192", fullname: "Zainal Abidin", school: "MTsN 2 Jombang", whatsapp: "085712345678", email: "zainal@gmail.com", category: "seni", lomba: "kkl", status: "Disetujui" },
        { id: "KMP-881293", fullname: "Nur Aini Rahmawati", school: "SMP Negeri 1 Peterongan", whatsapp: "082334567890", email: "nuraini@yahoo.com", category: "agama", lomba: "kdm", status: "Pending" },
        { id: "KMP-214738", fullname: "Mochammad Ridwan", school: "MTs Al-Hikmah Jombang", whatsapp: "087812345678", email: "ridwan@gmail.com", category: "sains", lomba: "ipa", status: "Pending" }
    ];

    const defaultConfig = {
        lombaCount: "7+",
        hadadiTotal: "Rp 30 Juta",
        basePeserta: 495
    };

    if (!localStorage.getItem('kompass_participants')) {
        localStorage.setItem('kompass_participants', JSON.stringify(defaultParticipants));
    }
    if (!localStorage.getItem('kompass_config')) {
        localStorage.setItem('kompass_config', JSON.stringify(defaultConfig));
    }

    // ==========================================
    // SYNC STATISTICS TO LANDING PAGE
    // ==========================================
    const syncStats = () => {
        const cfg = JSON.parse(localStorage.getItem('kompass_config')) || defaultConfig;
        const participants = JSON.parse(localStorage.getItem('kompass_participants')) || [];
        const totalPeserta = (parseInt(cfg.basePeserta) || 0) + participants.length;

        const elLomba = document.getElementById('stat-lomba-count');
        const elHadiah = document.getElementById('stat-hadiah-total');
        const elPeserta = document.getElementById('stat-peserta-count');

        if (elLomba) elLomba.textContent = cfg.lombaCount || "7+";
        if (elHadiah) elHadiah.textContent = cfg.hadadiTotal || "Rp 30 Juta";
        if (elPeserta) elPeserta.textContent = totalPeserta + "+";
    };
    syncStats();

    // ==========================================
    // STICKY NAVBAR
    // ==========================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Active link highlight
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            let currentId = '';

            sections.forEach(sec => {
                const top = sec.offsetTop - 130;
                if (window.scrollY >= top) {
                    currentId = sec.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==========================================
    // MOBILE HAMBURGER
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link, .nav-cta-mobile').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // DARK / LIGHT THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }

    // ==========================================
    // LOMBA DETAIL MODAL DATA
    // ==========================================
    const lombaData = {
        mqk: {
            title: "Musabaqah Qiraatul Kutub (MQK)",
            detail: "Kompetisi membaca kitab kuning (klasik) dalam bidang Fiqih (Fathul Qorib) secara fasih dengan pemahaman nahu-shorof serta kemampuan menjelaskan isinya.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat se-Jawa Timur & Bali.",
                "Kitab yang dilombakan: Fathul Qorib (bab tertentu diumumkan saat TM).",
                "Penilaian meliputi: Fasahah (kelancaran), Makna (terjemahan), dan Fiqhul Ibarat (pemahaman isi).",
                "Maqra' (bab yang dibaca) diundi saat perlombaan dimulai."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "19 September 2026"
        },
        cci: {
            title: "Cerdas Cermat Islam (CCI)",
            detail: "Kompetisi beregu (3 siswa) yang menguji kecepatan dan ketepatan wawasan keislaman secara komprehensif meliputi Quran Hadits, Fiqih, Aqidah Akhlak, dan SKI.",
            syarat: [
                "1 tim terdiri dari 3 siswa aktif SMP/MTs sederajat dari sekolah yang sama.",
                "Tahap 1: Soal tertulis (Pilihan Ganda).",
                "Tahap 2: Cerdas Cermat (rebutan) bagi 5 tim dengan nilai tertinggi.",
                "Semua anggota tim harus hadir saat perlombaan."
            ],
            biaya: "Rp 75.000 / Tim (3 Orang)",
            waktu: "20 September 2026"
        },
        kdm: {
            title: "Kompetisi Da'i Muda (KDM)",
            detail: "Lomba ceramah/dakwah islami yang menguji kemampuan retorika, penguasaan materi, kedalaman ilmu, dan komunikasi peserta dalam menyampaikan pesan dakwah.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat.",
                "Tema pidato/dakwah: 'Pemuda Muslim di Era Digital'.",
                "Durasi penampilan: 7 - 10 menit.",
                "Naskah ceramah orisinal, bukan hasil plagiat.",
                "Pakaian menutup aurat, bersih, dan rapi."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "19 September 2026"
        },
        matematika: {
            title: "Olimpiade Matematika",
            detail: "Kompetisi mengasah kemampuan analitik dan logika matematika tingkat SMP/MTs, meliputi aljabar, geometri, statistika, dan kombinatorika.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat.",
                "Babak Penyisihan: 40 soal pilihan ganda (60 menit).",
                "Babak Final: 10 soal uraian tingkat lanjut (90 menit).",
                "Dilarang menggunakan kalkulator, HP, atau alat bantu lainnya."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "19 September 2026"
        },
        ipa: {
            title: "Olimpiade IPA Terpadu",
            detail: "Kompetisi sains yang mengintegrasikan materi Biologi, Fisika, dan Kimia dasar tingkat SMP/MTs sederajat.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat.",
                "Babak Penyisihan: 60 soal pilihan ganda (70 menit).",
                "Babak Final: tes tertulis esai dan demonstrasi eksperimen sederhana.",
                "Membawa alat tulis sendiri."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "20 September 2026"
        },
        kkl: {
            title: "Kompetisi Kaligrafi Lukis (KKL)",
            detail: "Kompetisi menulis indah kaligrafi Arab pada kanvas yang dipadukan dengan elemen lukisan/dekoratif kontemporer bernuansa islami.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat.",
                "Ukuran kanvas: 40cm x 60cm (disediakan panitia).",
                "Durasi pengerjaan: 5 jam di tempat lomba.",
                "Cat/pewarna, kuas, dan perlengkapan lainnya dibawa peserta sendiri.",
                "Teks/lafadz kaligrafi diumumkan saat perlombaan dimulai."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "19 September 2026"
        },
        puisi: {
            title: "Cipta & Baca Puisi",
            detail: "Kompetisi kreatif yang menggabungkan kemampuan menciptakan puisi orisinal secara on-the-spot dan membacakannya di hadapan dewan juri dengan penuh ekspresi.",
            syarat: [
                "Siswa aktif SMP/MTs sederajat.",
                "Sesi 1 – Cipta Puisi: Menulis puisi bertema 'Kebanggaan Tanah Air' (60 menit).",
                "Sesi 2 – Baca Puisi: Membaca karya puisi ciptaan sendiri dari sesi 1.",
                "Penilaian: Diksi, imaji, struktur, intonasi, ekspresi, dan penghayatan."
            ],
            biaya: "Rp 50.000 / Orang",
            waktu: "20 September 2026"
        }
    };

    // --- Modal elements ---
    const modal = document.getElementById('lomba-modal');
    if (modal) {
        const modalContent = document.getElementById('modal-body-content');
        const modalClose = document.querySelector('#lomba-modal .modal-close');
        const detailButtons = document.querySelectorAll('.btn-detail');

        detailButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-lomba');
                const data = lombaData[key];
                if (data) {
                    let syaratHTML = data.syarat.map(s => `<li>${s}</li>`).join('');
                    const catFromCard = btn.closest('.lomba-card') ? btn.closest('.lomba-card').getAttribute('data-category') : '';

                    modalContent.innerHTML = `
                        <h3 class="modal-title">${data.title}</h3>
                        <div class="modal-section">
                            <h4>Deskripsi Lomba</h4>
                            <p>${data.detail}</p>
                        </div>
                        <div class="modal-section">
                            <h4>Syarat & Ketentuan</h4>
                            <ul>${syaratHTML}</ul>
                        </div>
                        <div class="modal-section" style="display:flex; gap:32px; flex-wrap:wrap;">
                            <div>
                                <h4>Biaya Pendaftaran</h4>
                                <p style="color:var(--accent-gold);font-weight:700;">${data.biaya}</p>
                            </div>
                            <div>
                                <h4>Jadwal Pelaksanaan</h4>
                                <p style="color:var(--accent-emerald);font-weight:700;">${data.waktu}</p>
                            </div>
                        </div>
                        <div style="margin-top:32px;display:flex;gap:16px;flex-wrap:wrap;">
                            <a href="daftar.html?category=${catFromCard}&lomba=${key}" class="btn btn-primary">Daftar Sekarang</a>
                        </div>
                    `;

                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLombaModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        if (modalClose) modalClose.addEventListener('click', closeLombaModal);
        window.addEventListener('click', e => { if (e.target === modal) closeLombaModal(); });
    }

    // ==========================================
    // LOMBA CATEGORY FILTER BUTTONS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lombaCards = document.querySelectorAll('.lomba-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-category');
            lombaCards.forEach(card => {
                if (cat === 'semua' || card.getAttribute('data-category') === cat) {
                    card.style.display = 'flex';
                    card.style.animation = 'slideIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // LOGIN ADMIN
    // ==========================================
    const loginModal = document.getElementById('login-modal');
    const btnLoginAdmin = document.getElementById('btn-login-admin');
    const closeLoginBtn = document.getElementById('close-login');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    if (btnLoginAdmin && loginModal) {
        btnLoginAdmin.addEventListener('click', () => {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        const closeLogin = () => {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            if (loginError) loginError.textContent = '';
        };

        if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeLogin);
        window.addEventListener('click', e => { if (e.target === loginModal) closeLogin(); });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const uname = document.getElementById('admin-username').value.trim();
            const pass = document.getElementById('admin-password').value;

            if (uname === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
                loginModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                openDashboard();
            } else {
                loginError.textContent = 'Username atau password salah. Silakan coba lagi.';
            }
        });
    }

    // ==========================================
    // DASHBOARD ADMIN
    // ==========================================
    const dashboardEl = document.getElementById('admin-dashboard');
    const btnLogout = document.getElementById('btn-logout-admin');

    const openDashboard = () => {
        if (!dashboardEl) return;
        dashboardEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        renderParticipantsTable();
        loadConfigForm();
    };

    const closeDashboard = () => {
        if (!dashboardEl) return;
        dashboardEl.style.display = 'none';
        document.body.style.overflow = 'auto';
        syncStats();
    };

    if (btnLogout) btnLogout.addEventListener('click', closeDashboard);

    // --- Load config values into sidebar form ---
    const loadConfigForm = () => {
        const cfg = JSON.parse(localStorage.getItem('kompass_config')) || defaultConfig;
        const elLomba = document.getElementById('cfg-lomba-count');
        const elHadiah = document.getElementById('cfg-hadiah-total');
        const elBase = document.getElementById('cfg-base-peserta');
        if (elLomba) elLomba.value = cfg.lombaCount;
        if (elHadiah) elHadiah.value = cfg.hadadiTotal;
        if (elBase) elBase.value = cfg.basePeserta;
    };

    // --- Config form save ---
    const configForm = document.getElementById('config-form');
    if (configForm) {
        configForm.addEventListener('submit', e => {
            e.preventDefault();
            const newCfg = {
                lombaCount: document.getElementById('cfg-lomba-count').value.trim(),
                hadadiTotal: document.getElementById('cfg-hadiah-total').value.trim(),
                basePeserta: parseInt(document.getElementById('cfg-base-peserta').value) || 0
            };
            localStorage.setItem('kompass_config', JSON.stringify(newCfg));

            // Show success toast
            showToast('Statistik website berhasil diperbarui!');
            syncStats();
        });
    }

    // --- Render participants table ---
    const renderParticipantsTable = () => {
        const tbody = document.getElementById('participants-table-body');
        if (!tbody) return;

        const participants = JSON.parse(localStorage.getItem('kompass_participants')) || [];
        tbody.innerHTML = '';

        if (participants.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-secondary);">Belum ada data pendaftar.</td></tr>`;
            return;
        }

        participants.forEach((p, index) => {
            const statusClass = p.status === 'Disetujui' ? 'status-approved'
                : p.status === 'Ditolak' ? 'status-rejected'
                : 'status-pending';
            const lombaName = lombaLabel[p.lomba] || p.lomba;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span class="participant-id">${p.id}</span></td>
                <td><strong>${p.fullname}</strong></td>
                <td>${p.school}</td>
                <td><a href="https://wa.me/62${p.whatsapp.replace(/^0/, '')}" target="_blank" class="wa-link">${p.whatsapp}</a></td>
                <td>${lombaName}</td>
                <td><span class="status-badge ${statusClass}">${p.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-action btn-edit" data-index="${index}" title="Edit Peserta">✏️ Edit</button>
                        <button class="btn-action btn-delete" data-index="${index}" title="Hapus Peserta">🗑️ Hapus</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Bind edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                openEditModal(idx);
            });
        });

        // Bind delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                deleteParticipant(idx);
            });
        });
    };

    // --- Delete participant ---
    const deleteParticipant = (index) => {
        if (!confirm('Apakah Anda yakin ingin menghapus data peserta ini?')) return;
        const participants = JSON.parse(localStorage.getItem('kompass_participants')) || [];
        participants.splice(index, 1);
        localStorage.setItem('kompass_participants', JSON.stringify(participants));
        renderParticipantsTable();
        syncStats();
        showToast('Data peserta berhasil dihapus.');
    };

    // --- Edit participant modal ---
    const editModal = document.getElementById('edit-participant-modal');
    const closeEditBtn = document.getElementById('close-edit-modal');
    const editForm = document.getElementById('edit-participant-form');

    const openEditModal = (index) => {
        const participants = JSON.parse(localStorage.getItem('kompass_participants')) || [];
        const p = participants[index];
        if (!p || !editModal) return;

        document.getElementById('edit-part-id').value = index;
        document.getElementById('edit-part-name').value = p.fullname;
        document.getElementById('edit-part-school').value = p.school;
        document.getElementById('edit-part-whatsapp').value = p.whatsapp;
        document.getElementById('edit-part-status').value = p.status;

        editModal.style.display = 'block';
    };

    const closeEditModal = () => {
        if (editModal) editModal.style.display = 'none';
    };

    if (closeEditBtn) closeEditBtn.addEventListener('click', closeEditModal);
    window.addEventListener('click', e => { if (e.target === editModal) closeEditModal(); });

    if (editForm) {
        editForm.addEventListener('submit', e => {
            e.preventDefault();
            const idx = parseInt(document.getElementById('edit-part-id').value);
            const participants = JSON.parse(localStorage.getItem('kompass_participants')) || [];

            if (participants[idx]) {
                participants[idx].fullname = document.getElementById('edit-part-name').value.trim();
                participants[idx].school = document.getElementById('edit-part-school').value.trim();
                participants[idx].whatsapp = document.getElementById('edit-part-whatsapp').value.trim();
                participants[idx].status = document.getElementById('edit-part-status').value;

                localStorage.setItem('kompass_participants', JSON.stringify(participants));
                closeEditModal();
                renderParticipantsTable();
                syncStats();
                showToast('Data peserta berhasil diperbarui!');
            }
        });
    }

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    const showToast = (msg) => {
        let toast = document.getElementById('kompass-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'kompass-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

});
