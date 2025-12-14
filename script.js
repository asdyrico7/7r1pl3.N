document.addEventListener('DOMContentLoaded', () => {
    
    // Fungsi untuk mendapatkan waktu saat ini dalam format HH:MM
    function getCurrentTimeHHMM() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Fungsi untuk mendapatkan nama hari saat ini (Bahasa Indonesia)
    function getCurrentDayName() {
        const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
        const dayIndex = new Date().getDay();
        return days[dayIndex];
    }

    // Fungsi utama untuk menyoroti pelajaran saat ini
    function highlightCurrentLesson() {
        const tables = document.querySelectorAll('.schedule-table');
        const currentTime = getCurrentTimeHHMM();
        const currentDay = getCurrentDayName();
        const currentDayInfo = document.getElementById('current-time-info');
        
        // Update waktu di info bar
        currentDayInfo.textContent = `Waktu saat ini: ${currentTime} | Hari: ${currentDay.toUpperCase()}`;

        // 1. Hapus penanda dari semua baris sebelumnya
        document.querySelectorAll('.current-lesson').forEach(row => {
            row.classList.remove('current-lesson');
        });

        // 2. Tentukan tabel yang aktif berdasarkan hari
        let activeTableId;
        if (currentDay === 'senin') {
            activeTableId = 'monday-schedule';
        } else if (currentDay === 'selasa') {
            activeTableId = 'tuesday-schedule';
        } 
        // Anda bisa menambahkan 'else if' untuk hari lainnya

        // Jika tidak ada jadwal untuk hari ini, keluar dari fungsi
        if (!activeTableId) {
            currentDayInfo.textContent += ' | Tidak Ada Jadwal Tersedia Hari Ini.';
            return;
        }

        const activeTable = document.getElementById(activeTableId);
        
        // Tandai tabel hari ini dengan border (opsional)
        tables.forEach(table => table.style.border = 'none');
        activeTable.style.border = '2px solid #1abc9c';

        // 3. Iterasi melalui baris jadwal di tabel yang aktif
        const rows = activeTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const startTime = row.getAttribute('data-start');
            const endTime = row.getAttribute('data-end');

            if (startTime && endTime) {
                // Periksa apakah waktu saat ini (currentTime) berada di antara start dan end time
                if (currentTime >= startTime && currentTime < endTime) {
                    row.classList.add('current-lesson');
                }
            }
        });
    }

    // Jalankan fungsi saat halaman dimuat, dan ulangi setiap 60 detik untuk pembaruan real-time
    highlightCurrentLesson();
    setInterval(highlightCurrentLesson, 60000); // Update setiap 1 menit
});
