// Dummy data for Pantau MBG application

export const stats = {
  beranda: {
    totalSPPG: 2417,
    sekolahPenerima: 18732,
    penerimManfaat: 3847126,
    cakupanSekolah: 78.6,
    totalAnggaran: 15200000000000,
    danaTersalur: 12890000000000,
    efisiensiAnggaran: 94.2,
    laporanWarga: 1247,
    skorTransparansi: 78,
  }
};

export const sppgData = {
  headerStats: {
    totalSPPG: { value: 2417, change: '+128', pct: '5.59%' },
    wilayahTerlayani: { value: 412 },
    rasioSPPGSekolah: { value: '1:8.7' },
    wilayahTanpaData: { value: 28 },
  },
  bebanLayanan: [
    { bulan: 'Des 2024', beban: 1524 },
    { bulan: 'Jan 2025', beban: 1812 },
    { bulan: 'Feb 2025', beban: 1973 },
    { bulan: 'Mar 2025', beban: 2238 },
    { bulan: 'Apr 2025', beban: 2498 },
    { bulan: 'Mei 2025', beban: 2739 },
  ],
  gapWilayah: [
    { provinsi: 'Papua Pegunungan', rasio: '1:23.5', status: 'Tinggi' },
    { provinsi: 'Papua Tengah', rasio: '1:18.9', status: 'Tinggi' },
    { provinsi: 'Maluku Utara', rasio: '1:15.2', status: 'Tinggi' },
    { provinsi: 'Nusa Tenggara Timur', rasio: '1:12.7', status: 'Sedang' },
    { provinsi: 'Kalimantan Utara', rasio: '1:10.3', status: 'Sedang' },
  ],
  daftarSPPG: [
    { id: 1, nama: 'SPPG Menteng Raya', wilayah: 'DKI Jakarta', status: 'Operasional', yayasan: 'Yayasan Nur Sejahtera', update: '20 Mei 2025' },
    { id: 2, nama: 'SPPG Cikini Utara', wilayah: 'DKI Jakarta', status: 'Operasional', yayasan: 'PT Gizi Nusantara', update: '19 Mei 2025' },
    { id: 3, nama: 'SPPG Bandung Selatan', wilayah: 'Jawa Barat', status: 'Operasional', yayasan: 'Yayasan Maju Bersama', update: '21 Mei 2025' },
    { id: 4, nama: 'SPPG Soreang', wilayah: 'Jawa Barat', status: 'Dalam Proses', yayasan: 'CV Berkah Pangan', update: '18 Mei 2025' },
    { id: 5, nama: 'SPPG Banyumas', wilayah: 'Jawa Tengah', status: 'Operasional', yayasan: 'Yayasan Sejahtera', update: '21 Mei 2025' },
    { id: 6, nama: 'SPPG Purwokerto', wilayah: 'Jawa Tengah', status: 'Operasional', yayasan: 'PT Gizi Nusantara', update: '20 Mei 2025' },
    { id: 7, nama: 'SPPG Surabaya Timur', wilayah: 'Jawa Timur', status: 'Operasional', yayasan: 'Yayasan Nur Sejahtera', update: '21 Mei 2025' },
    { id: 8, nama: 'SPPG Malang Kota', wilayah: 'Jawa Timur', status: 'Dalam Proses', yayasan: 'CV Berkah Pangan', update: '15 Mei 2025' },
    { id: 9, nama: 'SPPG Medan Timur', wilayah: 'Sumatera Utara', status: 'Operasional', yayasan: 'Yayasan Maju Bersama', update: '21 Mei 2025' },
    { id: 10, nama: 'SPPG Deli Serdang', wilayah: 'Sumatera Utara', status: 'Perencanaan', yayasan: '-', update: '10 Mei 2025' },
    { id: 11, nama: 'SPPG Makassar Barat', wilayah: 'Sulawesi Selatan', status: 'Operasional', yayasan: 'Yayasan Nur Sejahtera', update: '20 Mei 2025' },
    { id: 12, nama: 'SPPG Wamena', wilayah: 'Papua Pegunungan', status: 'Dalam Proses', yayasan: 'CV Papua Mandiri', update: '12 Mei 2025' },
    { id: 13, nama: 'SPPG Nabire', wilayah: 'Papua Tengah', status: 'Perencanaan', yayasan: '-', update: '08 Mei 2025' },
    { id: 14, nama: 'SPPG Ternate', wilayah: 'Maluku Utara', status: 'Operasional', yayasan: 'Yayasan Maluku Sejahtera', update: '19 Mei 2025' },
    { id: 15, nama: 'SPPG Kupang Selatan', wilayah: 'Nusa Tenggara Timur', status: 'Operasional', yayasan: 'PT Gizi Nusantara', update: '18 Mei 2025' },
  ],
  provinsiData: [
    { provinsi: 'DKI Jakarta', count: 187, level: 'high' },
    { provinsi: 'Jawa Barat', count: 312, level: 'high' },
    { provinsi: 'Jawa Tengah', count: 289, level: 'high' },
    { provinsi: 'Jawa Timur', count: 301, level: 'high' },
    { provinsi: 'Sumatera Utara', count: 143, level: 'medium' },
    { provinsi: 'Sulawesi Selatan', count: 98, level: 'medium' },
    { provinsi: 'NTT', count: 67, level: 'medium' },
    { provinsi: 'Papua', count: 23, level: 'low' },
    { provinsi: 'Papua Pegunungan', count: 12, level: 'low' },
    { provinsi: 'Kalimantan Utara', count: 34, level: 'low' },
  ],
};

export const penerimaManfaatData = {
  headerStats: {
    sekolahPenerima: 18732,
    penerimManfaat: 3847126,
    cakupanSekolah: 78.6,
    bebanPerSPPG: 1598,
  },
  byJenjang: [
    { name: 'SD/MI', value: 49.2, color: '#3B82F6' },
    { name: 'SMP/MTs', value: 28.7, color: '#10B981' },
    { name: 'SMA/SMK/MA', value: 19.0, color: '#F59E0B' },
    { name: 'SLB', value: 3.1, color: '#8B5CF6' },
  ],
  byStatus: [
    { name: 'Negeri', value: 73.7, color: '#1B4F72' },
    { name: 'Swasta', value: 26.3, color: '#85C1E9' },
  ],
  kondisiKhusus: [
    { name: 'Disabilitas', value: 86721 },
    { name: 'Anak Yatim/Piatu', value: 132608 },
    { name: 'Keluarga Tidak Mampu', value: 1245872 },
    { name: 'Daerah 3T', value: 279456 },
    { name: 'Pengungsi/Sementara', value: 18932 },
  ],
  regionalData: [
    { provinsi: 'DKI Jakarta', sekolah: 1247, penerima: 312847, cakupan: 86.5 },
    { provinsi: 'Jawa Barat', sekolah: 3892, penerima: 892341, cakupan: 82.3 },
    { provinsi: 'Jawa Tengah', sekolah: 3124, penerima: 712456, cakupan: 79.8 },
    { provinsi: 'Jawa Timur', sekolah: 2987, penerima: 698234, cakupan: 77.4 },
    { provinsi: 'Sumatera Utara', sekolah: 1876, penerima: 423198, cakupan: 74.2 },
    { provinsi: 'Sulawesi Selatan', sekolah: 1243, penerima: 287654, cakupan: 71.9 },
    { provinsi: 'NTT', sekolah: 987, penerima: 198432, cakupan: 68.5 },
    { provinsi: 'Papua', sekolah: 543, penerima: 98765, cakupan: 51.27 },
  ],
  distribusiSasaran: [
    { name: 'Peserta Didik', value: 92.94, color: '#1B4F72' },
    { name: 'Guru', value: 4.45, color: '#3498DB' },
    { name: 'Ibu Hamil', value: 1.62, color: '#E74C3C' },
    { name: 'Balita', value: 0.97, color: '#2ECC71' },
    { name: 'Lainnya', value: 0.02, color: '#95A5A6' },
  ],
  kesenjangan: {
    tertinggi: { provinsi: 'DKI Jakarta', nilai: 86.5 },
    terendah: { provinsi: 'Papua', nilai: 51.27 },
    gap: 35.23,
  },
};

export const penyaluranDanaData = {
  headerStats: {
    totalAnggaran: 15200000000000,
    danaTersalur: 12890000000000,
    efisiensi: 94.2,
    serapanDana: 84.8,
  },
  monthlyData: [
    { bulan: 'Jan 2025', anggaran: 2100, tersalur: 1890 },
    { bulan: 'Feb 2025', anggaran: 2200, tersalur: 2050 },
    { bulan: 'Mar 2025', anggaran: 2400, tersalur: 2180 },
    { bulan: 'Apr 2025', anggaran: 2500, tersalur: 2350 },
    { bulan: 'Mei 2025', anggaran: 2800, tersalur: 2420 },
    { bulan: 'Jun 2025', anggaran: 3200, tersalur: 0 },
  ],
  byProvinsi: [
    { provinsi: 'Jawa Barat', anggaran: 2840000000000, tersalur: 2410000000000, serapan: 84.9 },
    { provinsi: 'Jawa Timur', anggaran: 2650000000000, tersalur: 2280000000000, serapan: 86.0 },
    { provinsi: 'Jawa Tengah', anggaran: 2410000000000, tersalur: 2050000000000, serapan: 85.1 },
    { provinsi: 'DKI Jakarta', anggaran: 1870000000000, tersalur: 1750000000000, serapan: 93.6 },
    { provinsi: 'Sumatera Utara', anggaran: 1240000000000, tersalur: 1010000000000, serapan: 81.5 },
    { provinsi: 'Sulawesi Selatan', anggaran: 980000000000, tersalur: 820000000000, serapan: 83.7 },
    { provinsi: 'NTT', anggaran: 750000000000, tersalur: 580000000000, serapan: 77.3 },
    { provinsi: 'Papua', anggaran: 620000000000, tersalur: 420000000000, serapan: 67.7 },
    { provinsi: 'Kalimantan Timur', anggaran: 840000000000, tersalur: 720000000000, serapan: 85.7 },
    { provinsi: 'Bali', anggaran: 560000000000, tersalur: 510000000000, serapan: 91.1 },
  ],
};

export const yayasanData = {
  headerStats: {
    totalYayasan: 1248,
    totalMitra: 2317,
    sppgDikelola: 2417,
    dataVerifikasi: 1973,
  },
  daftarYayasan: [
    { id: 1, nama: 'Yayasan Nur Sejahtera', badanHukum: 'Yayasan', jumlahSPPG: 18, wilayah: 'DKI Jakarta, Jawa Barat', status: 'Terverifikasi' },
    { id: 2, nama: 'PT Gizi Nusantara', badanHukum: 'PT', jumlahSPPG: 24, wilayah: 'Jawa Tengah, Jawa Timur', status: 'Terverifikasi' },
    { id: 3, nama: 'Yayasan Maju Bersama', badanHukum: 'Yayasan', jumlahSPPG: 12, wilayah: 'Jawa Barat, Banten', status: 'Terverifikasi' },
    { id: 4, nama: 'CV Berkah Pangan', badanHukum: 'CV', jumlahSPPG: 8, wilayah: 'Jawa Barat', status: 'Dalam Verifikasi' },
    { id: 5, nama: 'Yayasan Maluku Sejahtera', badanHukum: 'Yayasan', jumlahSPPG: 6, wilayah: 'Maluku Utara', status: 'Terverifikasi' },
    { id: 6, nama: 'CV Papua Mandiri', badanHukum: 'CV', jumlahSPPG: 4, wilayah: 'Papua Tengah', status: 'Dalam Verifikasi' },
    { id: 7, nama: 'PT Nutrisi Indonesia', badanHukum: 'PT', jumlahSPPG: 31, wilayah: 'Sumatera Utara, Riau', status: 'Terverifikasi' },
    { id: 8, nama: 'Yayasan Peduli Gizi', badanHukum: 'Yayasan', jumlahSPPG: 15, wilayah: 'Sulawesi Selatan', status: 'Terverifikasi' },
    { id: 9, nama: 'Koperasi Makan Sehat', badanHukum: 'Koperasi', jumlahSPPG: 9, wilayah: 'Yogyakarta', status: 'Ditolak' },
    { id: 10, nama: 'PT Katering Nusantara', badanHukum: 'PT', jumlahSPPG: 22, wilayah: 'Kalimantan Timur', status: 'Terverifikasi' },
  ],
  profileYayasan: {
    nama: 'Yayasan Nur Sejahtera',
    badanHukum: 'Yayasan',
    noRegistrasi: 'AHU-0012345.AH.01.04.2023',
    alamat: 'Jl. Gatot Subroto No. 47, Menteng, Jakarta Pusat',
    namaKetua: 'Ir. Hendra Gunawan, M.Sc.',
    telepon: '+62-21-5551234',
    email: 'nur.sejahtera@yayasan.id',
    statusVerifikasi: 'Terverifikasi',
    tanggalVerifikasi: '12 Januari 2025',
    jumlahSPPG: 18,
    wilayahOperasi: ['DKI Jakarta', 'Jawa Barat'],
    sppgList: [
      'SPPG Menteng Raya', 'SPPG Cikini Barat', 'SPPG Gambir', 'SPPG Tanah Abang',
      'SPPG Kemayoran', 'SPPG Penjaringan', 'SPPG Tanjung Priok', 'SPPG Koja',
      'SPPG Pademangan', 'SPPG Pluit', 'SPPG Kelapa Gading', 'SPPG Cilincing',
      'SPPG Cakung Timur', 'SPPG Duren Sawit', 'SPPG Matraman', 'SPPG Jatinegara',
      'SPPG Bekasi Barat', 'SPPG Depok Tengah',
    ],
    catatanLaporan: [
      { tanggal: '10 Mei 2025', judul: 'Laporan Kinerja Q1 2025', status: 'Disetujui' },
      { tanggal: '15 Apr 2025', judul: 'Audit Keuangan Maret 2025', status: 'Disetujui' },
      { tanggal: '01 Mar 2025', judul: 'Laporan Inspeksi Sanitasi', status: 'Diproses' },
    ],
  },
  relasiData: {
    nodes: [
      { id: 'y1', label: 'Nur Sejahtera', type: 'yayasan' },
      { id: 'y2', label: 'PT Gizi Nusantara', type: 'yayasan' },
      { id: 'y3', label: 'Yayasan Maju', type: 'yayasan' },
      { id: 'm1', label: 'BGN Pusat', type: 'mitra' },
      { id: 'm2', label: 'Kemenkes', type: 'mitra' },
      { id: 'm3', label: 'BPS', type: 'mitra' },
      { id: 's1', label: 'SPPG Menteng', type: 'sppg' },
      { id: 's2', label: 'SPPG Cikini', type: 'sppg' },
      { id: 's3', label: 'SPPG Bandung', type: 'sppg' },
      { id: 's4', label: 'SPPG Soreang', type: 'sppg' },
    ],
    edges: [
      { from: 'y1', to: 's1' }, { from: 'y1', to: 's2' }, { from: 'y1', to: 'm1' }, { from: 'y1', to: 'm2' },
      { from: 'y2', to: 's3' }, { from: 'y2', to: 'm1' }, { from: 'y2', to: 'm3' },
      { from: 'y3', to: 's4' }, { from: 'y3', to: 'm2' },
    ],
  },
};

export const laporanWargaData = {
  headerStats: {
    totalLaporan: 1247,
    diproses: 389,
    selesai: 743,
    waktuRespon: '2.3 hari',
  },
  laporan: [
    { id: 'LW-2025-001', tanggal: '21 Mei 2025', kategori: 'Kualitas Makanan', lokasi: 'SDN 05 Menteng, Jakarta', status: 'Diproses', prioritas: 'Tinggi' },
    { id: 'LW-2025-002', tanggal: '20 Mei 2025', kategori: 'Keterlambatan Distribusi', lokasi: 'SD Islam Al-Azhar, Bekasi', status: 'Selesai', prioritas: 'Sedang' },
    { id: 'LW-2025-003', tanggal: '20 Mei 2025', kategori: 'Porsi Tidak Sesuai', lokasi: 'SMP N 2 Bandung, Jawa Barat', status: 'Selesai', prioritas: 'Rendah' },
    { id: 'LW-2025-004', tanggal: '19 Mei 2025', kategori: 'Kebersihan Kemasan', lokasi: 'SDN 12 Surabaya, Jawa Timur', status: 'Menunggu', prioritas: 'Tinggi' },
    { id: 'LW-2025-005', tanggal: '19 Mei 2025', kategori: 'Alergi Tidak Tercantum', lokasi: 'SD Kristen BPK, Medan', status: 'Diproses', prioritas: 'Tinggi' },
    { id: 'LW-2025-006', tanggal: '18 Mei 2025', kategori: 'Data Tidak Akurat', lokasi: 'SMP N 5 Makassar, Sulsel', status: 'Selesai', prioritas: 'Sedang' },
    { id: 'LW-2025-007', tanggal: '18 Mei 2025', kategori: 'SPPG Tidak Beroperasi', lokasi: 'SDN Wamena 01, Papua', status: 'Diproses', prioritas: 'Tinggi' },
    { id: 'LW-2025-008', tanggal: '17 Mei 2025', kategori: 'Kualitas Makanan', lokasi: 'MI Nurul Huda, Kupang, NTT', status: 'Selesai', prioritas: 'Sedang' },
    { id: 'LW-2025-009', tanggal: '17 Mei 2025', kategori: 'Keterlambatan Distribusi', lokasi: 'SMA N 1 Ternate, Maluku Utara', status: 'Menunggu', prioritas: 'Sedang' },
    { id: 'LW-2025-010', tanggal: '16 Mei 2025', kategori: 'Porsi Tidak Sesuai', lokasi: 'SDN Nabire 03, Papua', status: 'Selesai', prioritas: 'Rendah' },
  ],
  kategoriData: [
    { kategori: 'Kualitas Makanan', jumlah: 387 },
    { kategori: 'Keterlambatan Distribusi', jumlah: 298 },
    { kategori: 'Porsi Tidak Sesuai', jumlah: 213 },
    { kategori: 'Kebersihan Kemasan', jumlah: 187 },
    { kategori: 'Data Tidak Akurat', jumlah: 98 },
    { kategori: 'Lainnya', jumlah: 64 },
  ],
};

export const keamananPanganData = {
  headerStats: {
    inspeksiDilakukan: 1847,
    tingkatLolos: 91.3,
    pelanggaranDitemukan: 161,
    tindakLanjut: 89.4,
  },
  trendData: [
    { bulan: 'Des 2024', lolos: 88.2, gagal: 11.8 },
    { bulan: 'Jan 2025', lolos: 89.1, gagal: 10.9 },
    { bulan: 'Feb 2025', lolos: 90.3, gagal: 9.7 },
    { bulan: 'Mar 2025', lolos: 90.8, gagal: 9.2 },
    { bulan: 'Apr 2025', lolos: 91.0, gagal: 9.0 },
    { bulan: 'Mei 2025', lolos: 91.3, gagal: 8.7 },
  ],
  inspeksiData: [
    { sppg: 'SPPG Menteng Raya', tanggal: '21 Mei 2025', hasil: 'Lulus', skor: 96, catatan: 'Semua standar terpenuhi' },
    { sppg: 'SPPG Cikini Utara', tanggal: '20 Mei 2025', hasil: 'Lulus', skor: 91, catatan: 'Perlu peningkatan kebersihan peralatan' },
    { sppg: 'SPPG Bandung Selatan', tanggal: '20 Mei 2025', hasil: 'Gagal', skor: 62, catatan: 'Suhu penyimpanan tidak sesuai' },
    { sppg: 'SPPG Surabaya Timur', tanggal: '19 Mei 2025', hasil: 'Lulus', skor: 88, catatan: 'Dokumentasi perlu diperbaiki' },
    { sppg: 'SPPG Medan Timur', tanggal: '19 Mei 2025', hasil: 'Lulus', skor: 94, catatan: 'Standar kebersihan sangat baik' },
    { sppg: 'SPPG Makassar Barat', tanggal: '18 Mei 2025', hasil: 'Lulus', skor: 87, catatan: 'Perlu pelatihan tambahan staf' },
    { sppg: 'SPPG Ternate', tanggal: '18 Mei 2025', hasil: 'Gagal', skor: 58, catatan: 'Bahan makanan tidak segar, izin kadaluarsa' },
    { sppg: 'SPPG Kupang Selatan', tanggal: '17 Mei 2025', hasil: 'Lulus', skor: 89, catatan: 'Standar nutrisi terpenuhi' },
  ],
  kategoriPelanggaran: [
    { kategori: 'Suhu Penyimpanan', jumlah: 43 },
    { kategori: 'Kebersihan Fasilitas', jumlah: 38 },
    { kategori: 'Kadaluarsa Bahan', jumlah: 29 },
    { kategori: 'Standar Nutrisi', jumlah: 24 },
    { kategori: 'Dokumentasi', jumlah: 17 },
    { kategori: 'Lainnya', jumlah: 10 },
  ],
};

export const transparansiData = {
  headerStats: {
    skorTransparansi: 78,
    datasetTerbuka: 82,
    totalDataset: 67,
    pembaruanTerakhir: '21 Mei 2025',
  },
  statusDataset: [
    { name: 'Terbuka', value: 55, pct: 82, color: '#10B981' },
    { name: 'Sebagian Terbuka', value: 7, pct: 10, color: '#F59E0B' },
    { name: 'Terbatas', value: 3, pct: 4, color: '#F97316' },
    { name: 'Tertutup', value: 2, pct: 3, color: '#EF4444' },
  ],
  trendSkor: [
    { bulan: 'Des 2024', skor: 56 },
    { bulan: 'Jan 2025', skor: 59 },
    { bulan: 'Feb 2025', skor: 63 },
    { bulan: 'Mar 2025', skor: 69 },
    { bulan: 'Apr 2025', skor: 72 },
    { bulan: 'Mei 2025', skor: 78 },
  ],
  daftarDataset: [
    { id: 1, nama: 'Data SPPG Aktif Nasional', kategori: 'Infrastruktur', penanggungjawab: 'BGN', diperbarui: '21 Mei 2025', status: 'Terbuka', format: 'CSV, JSON' },
    { id: 2, nama: 'Data Penerima Manfaat per Sekolah', kategori: 'Penerima', penanggungjawab: 'BGN', diperbarui: '20 Mei 2025', status: 'Terbuka', format: 'CSV, Excel' },
    { id: 3, nama: 'Realisasi Anggaran Bulanan', kategori: 'Keuangan', penanggungjawab: 'Kemenkeu', diperbarui: '15 Mei 2025', status: 'Terbuka', format: 'JSON, PDF' },
    { id: 4, nama: 'Hasil Inspeksi Keamanan Pangan', kategori: 'Keamanan', penanggungjawab: 'Kemenkes', diperbarui: '18 Mei 2025', status: 'Terbuka', format: 'CSV' },
    { id: 5, nama: 'Data Yayasan dan Mitra Terverifikasi', kategori: 'Kelembagaan', penanggungjawab: 'BGN', diperbarui: '12 Mei 2025', status: 'Sebagian Terbuka', format: 'JSON' },
    { id: 6, nama: 'Laporan Warga Terverifikasi', kategori: 'Partisipasi', penanggungjawab: 'BGN', diperbarui: '21 Mei 2025', status: 'Terbuka', format: 'CSV, JSON' },
    { id: 7, nama: 'Kontrak SPPG-Yayasan', kategori: 'Kelembagaan', penanggungjawab: 'BGN', diperbarui: '01 Apr 2025', status: 'Terbatas', format: 'PDF' },
    { id: 8, nama: 'Data Nutrisi Menu Harian', kategori: 'Keamanan', penanggungjawab: 'Kemenkes', diperbarui: '10 Mei 2025', status: 'Terbuka', format: 'CSV, Excel' },
    { id: 9, nama: 'Anggaran per Provinsi Detail', kategori: 'Keuangan', penanggungjawab: 'Kemenkeu', diperbarui: '01 Mei 2025', status: 'Sebagian Terbuka', format: 'Excel' },
    { id: 10, nama: 'Data Demografi Penerima', kategori: 'Penerima', penanggungjawab: 'BPS', diperbarui: '30 Apr 2025', status: 'Terbuka', format: 'CSV, JSON' },
  ],
  gapTracker: [
    { topik: 'Data SPPG Daerah 3T', pct: 68 },
    { topik: 'Laporan Keuangan Yayasan', pct: 54 },
    { topik: 'Hasil Uji Laboratorium', pct: 71 },
    { topik: 'Data Real-time Distribusi', pct: 83 },
    { topik: 'Kontrak Mitra Swasta', pct: 42 },
  ],
};

export const dokumenResmiData = {
  kategori: [
    { nama: 'Juknis', jumlah: 12, icon: 'FileText' },
    { nama: 'Pedoman', jumlah: 18, icon: 'BookOpen' },
    { nama: 'Siaran Pers', jumlah: 27, icon: 'Megaphone' },
    { nama: 'Dashboard Resmi', jumlah: 9, icon: 'BarChart' },
    { nama: 'Regulasi', jumlah: 15, icon: 'Scale' },
  ],
  dokumen: [
    { id: 1, nama: 'Petunjuk Teknis Penyelenggaraan Program MBG 2025', kategori: 'Juknis', jenis: 'PDF', tanggal: '15 Jan 2025', ukuran: '2.4 MB', url: '#' },
    { id: 2, nama: 'Pedoman Standar Gizi dan Keamanan Pangan SPPG', kategori: 'Pedoman', jenis: 'PDF', tanggal: '20 Jan 2025', ukuran: '1.8 MB', url: '#' },
    { id: 3, nama: 'Siaran Pers: Program MBG Resmi Diluncurkan', kategori: 'Siaran Pers', jenis: 'PDF', tanggal: '01 Jan 2025', ukuran: '0.5 MB', url: '#' },
    { id: 4, nama: 'Regulasi BGN No. 01/2025 tentang SPPG', kategori: 'Regulasi', jenis: 'PDF', tanggal: '05 Jan 2025', ukuran: '3.1 MB', url: '#' },
    { id: 5, nama: 'Pedoman Verifikasi Yayasan dan Mitra', kategori: 'Pedoman', jenis: 'PDF', tanggal: '22 Jan 2025', ukuran: '1.2 MB', url: '#' },
    { id: 6, nama: 'Siaran Pers: Capaian 4 Bulan Program MBG', kategori: 'Siaran Pers', jenis: 'PDF', tanggal: '01 Mei 2025', ukuran: '0.8 MB', url: '#' },
    { id: 7, nama: 'Dashboard Monitoring MBG - Versi 2.0', kategori: 'Dashboard Resmi', jenis: 'XLSX', tanggal: '10 Apr 2025', ukuran: '5.2 MB', url: '#' },
    { id: 8, nama: 'Juknis Pelaporan Keuangan SPPG', kategori: 'Juknis', jenis: 'PDF', tanggal: '01 Feb 2025', ukuran: '1.6 MB', url: '#' },
    { id: 9, nama: 'Regulasi Kemenkes tentang Standar Gizi Anak Sekolah', kategori: 'Regulasi', jenis: 'PDF', tanggal: '15 Feb 2025', ukuran: '2.8 MB', url: '#' },
    { id: 10, nama: 'Pedoman Pengaduan dan Laporan Warga', kategori: 'Pedoman', jenis: 'PDF', tanggal: '01 Mar 2025', ukuran: '0.9 MB', url: '#' },
    { id: 11, nama: 'Siaran Pers: Perkembangan SPPG Daerah 3T', kategori: 'Siaran Pers', jenis: 'PDF', tanggal: '15 Mar 2025', ukuran: '0.6 MB', url: '#' },
    { id: 12, nama: 'Juknis Inspeksi Keamanan Pangan', kategori: 'Juknis', jenis: 'PDF', tanggal: '20 Feb 2025', ukuran: '1.4 MB', url: '#' },
  ],
};

export const formatCurrency = (value) => {
  if (value >= 1000000000000) {
    return `Rp ${(value / 1000000000000).toFixed(1)} T`;
  } else if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1)} M`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
};

export const formatNumber = (value) => {
  return value.toLocaleString('id-ID');
};
