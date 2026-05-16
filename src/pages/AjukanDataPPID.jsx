import { useState } from 'react';
import { FileQuestion, CheckCircle, Clock, Send, Save } from 'lucide-react';

const steps = [
  { id: 1, label: 'Draft', desc: 'Permohonan dibuat' },
  { id: 2, label: 'Diajukan', desc: 'Menunggu konfirmasi' },
  { id: 3, label: 'Diproses', desc: 'Sedang ditinjau PPID' },
  { id: 4, label: 'Tanggapan', desc: 'Respons tersedia' },
  { id: 5, label: 'Selesai', desc: 'Permohonan selesai' },
];

const contohData = [
  { no: 1, judul: 'Data SPPG per Kecamatan', keterangan: 'Daftar lengkap SPPG beserta koordinat dan status operasional' },
  { no: 2, judul: 'Rincian Anggaran per Yayasan', keterangan: 'Alokasi dan realisasi anggaran per yayasan mitra' },
  { no: 3, judul: 'Laporan Inspeksi BPOM', keterangan: 'Hasil pemeriksaan keamanan pangan oleh BPOM' },
  { no: 4, judul: 'Kontrak SPPG-BGN', keterangan: 'Salinan kontrak kerja sama antara SPPG dan BGN' },
  { no: 5, judul: 'Data Menu Harian per SPPG', keterangan: 'Rencana menu makanan harian per satuan SPPG' },
];

export default function AjukanDataPPID() {
  const [currentStep] = useState(1);
  const [form, setForm] = useState({
    jenisData: '',
    wilayah: '',
    periode: '',
    format: '',
    alasan: '',
    ringkasan: '',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Ajukan Data PPID</h1>
        <p className="text-slate-500 text-sm mt-1">Permohonan informasi publik melalui Pejabat Pengelola Informasi dan Dokumentasi (PPID)</p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Form */}
        <div className="col-span-3">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-5 flex items-center gap-2">
              <FileQuestion size={16} className="text-blue-600" />
              Form Permohonan Data
            </h2>

            {saved && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 flex items-center gap-2">
                <CheckCircle size={15} />
                Draft berhasil disimpan
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Jenis Data yang Diminta *</label>
                <select
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.jenisData}
                  onChange={e => setForm({...form, jenisData: e.target.value})}
                >
                  <option value="">Pilih Jenis Data</option>
                  <option>Data SPPG dan Lokasi</option>
                  <option>Data Penerima Manfaat</option>
                  <option>Data Anggaran dan Keuangan</option>
                  <option>Data Inspeksi Keamanan Pangan</option>
                  <option>Data Yayasan dan Kontrak</option>
                  <option>Laporan Program</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Wilayah</label>
                  <select
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.wilayah}
                    onChange={e => setForm({...form, wilayah: e.target.value})}
                  >
                    <option value="">Nasional (semua wilayah)</option>
                    <option>DKI Jakarta</option>
                    <option>Jawa Barat</option>
                    <option>Jawa Tengah</option>
                    <option>Jawa Timur</option>
                    <option>Sumatera Utara</option>
                    <option>Papua</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Periode Data</label>
                  <select
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.periode}
                    onChange={e => setForm({...form, periode: e.target.value})}
                  >
                    <option value="">Pilih Periode</option>
                    <option>Januari 2025</option>
                    <option>Februari 2025</option>
                    <option>Maret 2025</option>
                    <option>April 2025</option>
                    <option>Mei 2025</option>
                    <option>Q1 2025 (Jan-Mar)</option>
                    <option>Seluruh Tahun 2025</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Format Data yang Diinginkan</label>
                <select
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.format}
                  onChange={e => setForm({...form, format: e.target.value})}
                >
                  <option value="">Pilih Format</option>
                  <option>CSV (Spreadsheet)</option>
                  <option>JSON (API-ready)</option>
                  <option>Excel (.xlsx)</option>
                  <option>PDF</option>
                  <option>Semua Format Tersedia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Alasan Permohonan *
                  <span className="text-slate-400 font-normal ml-1">({form.alasan.length}/500 karakter)</span>
                </label>
                <textarea
                  rows={4}
                  maxLength={500}
                  placeholder="Jelaskan keperluan dan alasan permohonan data ini. Contoh: untuk kegiatan penelitian akademik, jurnalisme, advokasi kebijakan, dll."
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.alasan}
                  onChange={e => setForm({...form, alasan: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Ringkasan Surat Permohonan *
                  <span className="text-slate-400 font-normal ml-1">({form.ringkasan.length}/300 karakter)</span>
                </label>
                <textarea
                  rows={3}
                  maxLength={300}
                  placeholder="Ringkasan singkat isi surat permohonan resmi yang akan dilampirkan..."
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={form.ringkasan}
                  onChange={e => setForm({...form, ringkasan: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Lampiran Surat (opsional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-sm text-slate-400 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <p>Seret dan lepas file di sini, atau klik untuk memilih</p>
                  <p className="text-xs mt-1">PDF, DOC, JPG (max 5MB)</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  <Save size={15} />
                  Simpan Draft
                </button>
                <button className="flex items-center gap-2 bg-[#1B4F72] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#154060] transition-colors">
                  <Send size={15} />
                  Kirim Permohonan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-span-2 flex flex-col gap-4">
          {/* Status Tracker */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-5">Status Permohonan</h2>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-200" />
              <div className="space-y-5">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.id < currentStep ? 'bg-emerald-500' :
                      step.id === currentStep ? 'bg-[#1B4F72] ring-4 ring-blue-100' :
                      'bg-slate-200'
                    }`}>
                      {step.id < currentStep ? (
                        <CheckCircle size={16} className="text-white" />
                      ) : step.id === currentStep ? (
                        <Clock size={14} className="text-white" />
                      ) : (
                        <span className="text-xs text-slate-400 font-bold">{step.id}</span>
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-semibold ${step.id <= currentStep ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                      <p className={`text-xs ${step.id <= currentStep ? 'text-slate-500' : 'text-slate-300'}`}>
                        {step.desc}
                      </p>
                      {step.id === currentStep && (
                        <p className="text-xs text-blue-600 font-medium mt-0.5">Status saat ini</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400">
              <p>Permohonan diproses dalam 10 hari kerja sesuai UU KIP No. 14/2008</p>
            </div>
          </div>

          {/* Contoh Data */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">Contoh Data yang Bisa Diminta</h2>
            <div className="space-y-3">
              {contohData.map((item) => (
                <div key={item.no} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 bg-[#1B4F72] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {item.no}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{item.judul}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.keterangan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
