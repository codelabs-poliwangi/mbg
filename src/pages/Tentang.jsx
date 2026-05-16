import { Eye, Users, Shield, Lock, BarChart2, MessageSquare, Database, TrendingUp, Mail, Phone, Clock, CheckCircle } from 'lucide-react';

const prinsipCivicTech = [
  { icon: Eye, label: 'Transparan', desc: 'Semua proses dan data dapat diakses oleh publik', color: 'bg-blue-50 text-blue-600' },
  { icon: Users, label: 'Inklusif', desc: 'Menjangkau semua kalangan masyarakat tanpa terkecuali', color: 'bg-teal-50 text-teal-600' },
  { icon: Shield, label: 'Akuntabel', desc: 'Setiap data dapat ditelusuri sumber dan validasinya', color: 'bg-purple-50 text-purple-600' },
  { icon: Lock, label: 'Aman', desc: 'Data pribadi warga dilindungi sesuai regulasi', color: 'bg-orange-50 text-orange-600' },
  { icon: MessageSquare, label: 'Partisipatif', desc: 'Warga dapat berkontribusi melalui laporan dan masukan', color: 'bg-pink-50 text-pink-600' },
  { icon: BarChart2, label: 'Berbasis Data', desc: 'Keputusan didasarkan pada data yang tervalidasi', color: 'bg-emerald-50 text-emerald-600' },
];

const sumberData = [
  { singkatan: 'BGN', nama: 'Badan Gizi Nasional', desc: 'Data utama SPPG dan program MBG', color: 'bg-blue-500' },
  { singkatan: 'Kemenkeu', nama: 'Kementerian Keuangan', desc: 'Data anggaran dan realisasi', color: 'bg-purple-500' },
  { singkatan: 'Kemenkes', nama: 'Kementerian Kesehatan', desc: 'Standar gizi dan keamanan pangan', color: 'bg-red-500' },
  { singkatan: 'Kemendagri', nama: 'Kementerian Dalam Negeri', desc: 'Data wilayah dan kependudukan', color: 'bg-teal-500' },
  { singkatan: 'BPS', nama: 'Badan Pusat Statistik', desc: 'Data statistik dan demografi', color: 'bg-orange-500' },
];

const caraKerja = [
  { step: '01', judul: 'Pengumpulan Data', desc: 'Data dikumpulkan secara otomatis dari API resmi BGN, Kemenkeu, Kemenkes, dan BPS setiap hari', icon: Database },
  { step: '02', judul: 'Validasi dan Verifikasi', desc: 'Setiap data divalidasi silang antar sumber dan diverifikasi oleh tim teknis sebelum dipublikasikan', icon: CheckCircle },
  { step: '03', judul: 'Publikasi Terbuka', desc: 'Data yang telah terverifikasi dipublikasikan dalam format terbuka dan dapat diakses oleh publik', icon: Eye },
  { step: '04', judul: 'Partisipasi Publik', desc: 'Warga dapat melaporkan ketidaksesuaian data dan mengirimkan laporan lapangan melalui platform', icon: Users },
];

const prinsipEtik = [
  'Data pribadi warga tidak dipublikasikan tanpa izin',
  'Tidak ada monetisasi data pengguna platform',
  'Sumber data selalu dicantumkan secara transparan',
  'Laporan warga diproses dengan menjaga kerahasiaan pelapor',
  'Tidak ada afiliasi politik dalam penyajian data',
  'Seluruh kode sumber platform bersifat open-source',
];

export default function Tentang() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tentang Pantau MBG</h1>
        <p className="text-slate-500 text-sm mt-1">Platform pemantauan independen Program Makan Bergizi Gratis</p>
      </div>

      {/* Mission */}
      <div className="bg-[#1B4F72] rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-[#1B4F72] font-bold text-2xl">M</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Pantau MBG</h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Platform transparansi berbasis civic tech yang menyajikan data Program Makan Bergizi Gratis (MBG) secara terbuka, terstruktur, dan mudah dipahami oleh seluruh lapisan masyarakat Indonesia.
            </p>
            <p className="text-blue-200 text-sm leading-relaxed">
              Kami percaya bahwa transparansi adalah kunci keberhasilan program sosial pemerintah. Dengan membuka akses data kepada publik, kita dapat bersama-sama memantau, mengevaluasi, dan mendorong peningkatan kualitas program MBG untuk seluruh anak Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* Civic Tech Principles */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-slate-800 mb-4">Prinsip Civic Tech</h2>
        <div className="grid grid-cols-3 gap-4">
          {prinsipCivicTech.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color.split(' ')[0]}`}>
                <Icon size={20} className={color.split(' ')[1]} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">{label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sumber Data */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-6">
        <h2 className="text-base font-bold text-slate-800 mb-4">Sumber Data Resmi</h2>
        <div className="grid grid-cols-5 gap-4">
          {sumberData.map((s) => (
            <div key={s.singkatan} className="text-center">
              <div className={`w-14 h-14 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <span className="text-white font-bold text-xs leading-tight text-center px-1">{s.singkatan}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">{s.nama}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cara Kerja */}
      <div className="mb-6">
        <h2 className="text-base font-bold text-slate-800 mb-4">Cara Kerja Platform</h2>
        <div className="grid grid-cols-4 gap-4">
          {caraKerja.map(({ step, judul, desc, icon: Icon }) => (
            <div key={step} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 relative">
              <div className="absolute top-4 right-4 text-4xl font-black text-slate-50">{step}</div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <Icon size={20} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1.5">{judul}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Prinsip Etik + Tim + Kolaborasi */}
      <div className="grid grid-cols-3 gap-4">
        {/* Prinsip Etik */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield size={16} className="text-purple-600" />
            Prinsip Etik
          </h2>
          <div className="space-y-2.5">
            {prinsipEtik.map((p, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tim dan Kontak */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Users size={16} className="text-blue-600" />
            Tim dan Kontak
          </h2>
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-[#1B4F72] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AP</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Andi Pratama</p>
                <p className="text-xs text-slate-400">Koordinator Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">SR</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Siti Rahayu</p>
                <p className="text-xs text-slate-400">Analis Data</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Mail size={13} className="text-blue-500" />
              kontak@pantaumbg.id
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Phone size={13} className="text-blue-500" />
              +62 21 555-0100
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Clock size={13} className="text-blue-500" />
              Senin–Jumat, 08:00–17:00 WIB
            </div>
          </div>
        </div>

        {/* Kolaborasi */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-emerald-600" />
            Kolaborasi dan Masukan
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Kami terbuka untuk berkolaborasi dengan peneliti, jurnalis, organisasi masyarakat sipil, dan lembaga akademik yang ingin menggunakan atau berkontribusi pada platform ini.
          </p>
          <div className="space-y-2.5">
            {[
              { label: 'Kontribusi Kode', desc: 'Kirim pull request di GitHub kami', icon: Database },
              { label: 'Laporan Bug/Error', desc: 'Gunakan form laporan di platform', icon: MessageSquare },
              { label: 'Masukan Data', desc: 'Email ke data@pantaumbg.id', icon: TrendingUp },
              { label: 'Kemitraan', desc: 'Hubungi tim melalui email resmi', icon: Users },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2.5 p-2.5 bg-slate-50 rounded-lg">
                <item.icon size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
