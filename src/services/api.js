/**
 * API Client untuk Pantau MBG
 *
 * Sementara semua endpoint dialihkan ke MOCK_MODE = true yang mengembalikan
 * data dummy dari src/data/dummyData.js. Saat backend tersedia, set
 * VITE_API_URL di .env dan ubah MOCK_MODE menjadi false (atau biarkan
 * fallback otomatis ketika VITE_API_URL terdefinisi).
 *
 * Cara pakai di komponen:
 *   import { api } from '@/services/api';
 *   const data = await api.sppg.list({ provinsi: 'Jawa Barat' });
 */

import {
  sppgData,
  penerimaManfaatData,
  penyaluranDanaData,
  yayasanData,
  laporanWargaData,
  keamananPanganData,
  transparansiData,
  dokumenResmiData,
} from '../data/dummyData';

const API_URL = import.meta.env.VITE_API_URL || '';
const MOCK_MODE = !API_URL;
const NETWORK_DELAY = 300; // ms — simulasi latency

function delay(ms = NETWORK_DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function request(path, { method = 'GET', body, params } = {}) {
  const url = new URL(path, API_URL);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

function filterList(items, { search, status, kategori, wilayah } = {}) {
  return items.filter((item) => {
    if (search) {
      const haystack = Object.values(item).join(' ').toLowerCase();
      if (!haystack.includes(search.toLowerCase())) return false;
    }
    if (status && item.status && item.status !== status) return false;
    if (kategori && item.kategori && item.kategori !== kategori) return false;
    if (wilayah && item.wilayah && !item.wilayah.includes(wilayah)) return false;
    return true;
  });
}

function paginate(items, { page = 1, pageSize = 10 } = {}) {
  const start = (page - 1) * pageSize;
  return {
    data: items.slice(start, start + pageSize),
    meta: {
      page,
      pageSize,
      total: items.length,
      totalPages: Math.max(1, Math.ceil(items.length / pageSize)),
    },
  };
}

export const api = {
  sppg: {
    async overview() {
      if (!MOCK_MODE) return request('/api/sppg/overview');
      await delay();
      return {
        stats: sppgData.headerStats,
        bebanLayanan: sppgData.bebanLayanan,
        gapWilayah: sppgData.gapWilayah,
        provinsi: sppgData.provinsiData,
      };
    },
    async list(params = {}) {
      if (!MOCK_MODE) return request('/api/sppg', { params });
      await delay();
      const filtered = filterList(sppgData.daftarSPPG, params);
      return paginate(filtered, params);
    },
    async detail(id) {
      if (!MOCK_MODE) return request(`/api/sppg/${id}`);
      await delay();
      return sppgData.daftarSPPG.find((s) => s.id === Number(id)) || null;
    },
  },

  penerimaManfaat: {
    async overview() {
      if (!MOCK_MODE) return request('/api/penerima-manfaat/overview');
      await delay();
      return penerimaManfaatData;
    },
  },

  penyaluranDana: {
    async overview() {
      if (!MOCK_MODE) return request('/api/penyaluran-dana/overview');
      await delay();
      return penyaluranDanaData;
    },
  },

  yayasan: {
    async overview() {
      if (!MOCK_MODE) return request('/api/yayasan/overview');
      await delay();
      return {
        stats: yayasanData.headerStats,
        relasi: yayasanData.relasiData,
      };
    },
    async list(params = {}) {
      if (!MOCK_MODE) return request('/api/yayasan', { params });
      await delay();
      const filtered = filterList(yayasanData.daftarYayasan, params);
      return paginate(filtered, params);
    },
    async profile(id) {
      if (!MOCK_MODE) return request(`/api/yayasan/${id}`);
      await delay();
      return yayasanData.profileYayasan;
    },
  },

  laporanWarga: {
    async overview() {
      if (!MOCK_MODE) return request('/api/laporan/overview');
      await delay();
      return {
        stats: laporanWargaData.headerStats,
        kategori: laporanWargaData.kategoriData,
      };
    },
    async list(params = {}) {
      if (!MOCK_MODE) return request('/api/laporan', { params });
      await delay();
      const filtered = filterList(laporanWargaData.laporan, params);
      return paginate(filtered, params);
    },
    async submit(payload) {
      if (!MOCK_MODE) return request('/api/laporan', { method: 'POST', body: payload });
      await delay(600);
      return {
        id: `LW-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: 'Menunggu',
        ...payload,
      };
    },
  },

  keamananPangan: {
    async overview() {
      if (!MOCK_MODE) return request('/api/keamanan-pangan/overview');
      await delay();
      return keamananPanganData;
    },
    async inspections(params = {}) {
      if (!MOCK_MODE) return request('/api/keamanan-pangan/inspeksi', { params });
      await delay();
      const filtered = filterList(keamananPanganData.inspeksiData, params);
      return paginate(filtered, params);
    },
  },

  transparansi: {
    async overview() {
      if (!MOCK_MODE) return request('/api/transparansi/overview');
      await delay();
      return {
        stats: transparansiData.headerStats,
        statusDataset: transparansiData.statusDataset,
        trendSkor: transparansiData.trendSkor,
        gapTracker: transparansiData.gapTracker,
      };
    },
    async datasets(params = {}) {
      if (!MOCK_MODE) return request('/api/transparansi/datasets', { params });
      await delay();
      const filtered = filterList(transparansiData.daftarDataset, params);
      return paginate(filtered, params);
    },
  },

  ppid: {
    async submit(payload) {
      if (!MOCK_MODE) return request('/api/ppid/permohonan', { method: 'POST', body: payload });
      await delay(700);
      return {
        nomor: `PPID-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        status: 'Diajukan',
        tanggalKirim: new Date().toISOString(),
        ...payload,
      };
    },
    async myRequests() {
      if (!MOCK_MODE) return request('/api/ppid/saya');
      await delay();
      return [];
    },
  },

  dokumen: {
    async kategori() {
      if (!MOCK_MODE) return request('/api/dokumen/kategori');
      await delay();
      return dokumenResmiData.kategori;
    },
    async list(params = {}) {
      if (!MOCK_MODE) return request('/api/dokumen', { params });
      await delay();
      const filtered = filterList(dokumenResmiData.dokumen, params);
      return paginate(filtered, params);
    },
  },
};

export default api;
