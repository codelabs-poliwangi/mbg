import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import PetaSPPG from './pages/PetaSPPG';
import PenerimaManfaat from './pages/PenerimaManfaat';
import PenyaluranDana from './pages/PenyaluranDana';
import YayasanDanMitra from './pages/YayasanDanMitra';
import LaporanWarga from './pages/LaporanWarga';
import KeamananPangan from './pages/KeamananPangan';
import TransparansiData from './pages/TransparansiData';
import AjukanDataPPID from './pages/AjukanDataPPID';
import DokumenResmi from './pages/DokumenResmi';
import Tentang from './pages/Tentang';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Beranda />} />
          <Route path="peta-sppg" element={<PetaSPPG />} />
          <Route path="penerima-manfaat" element={<PenerimaManfaat />} />
          <Route path="penyaluran-dana" element={<PenyaluranDana />} />
          <Route path="yayasan-dan-mitra" element={<YayasanDanMitra />} />
          <Route path="laporan-warga" element={<LaporanWarga />} />
          <Route path="keamanan-pangan" element={<KeamananPangan />} />
          <Route path="transparansi-data" element={<TransparansiData />} />
          <Route path="ajukan-data-ppid" element={<AjukanDataPPID />} />
          <Route path="dokumen-resmi" element={<DokumenResmi />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
