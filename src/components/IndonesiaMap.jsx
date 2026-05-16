import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { provinsiList } from '../data/wilayah';

function getColor(count) {
  if (count > 100) return '#F97316';
  if (count > 50) return '#EAB308';
  if (count > 10) return '#22C55E';
  if (count > 0) return '#3B82F6';
  return '#94A3B8';
}

function getRadius(count) {
  if (count > 200) return 22;
  if (count > 100) return 18;
  if (count > 50) return 14;
  if (count > 20) return 11;
  if (count > 0) return 8;
  return 5;
}

export default function IndonesiaMap({ data = provinsiList, height = 360, onSelectProvinsi }) {
  return (
    <div className="rounded-lg overflow-hidden border border-slate-200" style={{ height }}>
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        minZoom={4}
        maxZoom={10}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#dbeafe' }}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {data.map((p) => (
          <CircleMarker
            key={p.kode || p.nama}
            center={[p.lat, p.lng]}
            radius={getRadius(p.sppg)}
            pathOptions={{
              color: 'white',
              weight: 1.5,
              fillColor: getColor(p.sppg),
              fillOpacity: 0.85,
            }}
            eventHandlers={{
              click: () => onSelectProvinsi && onSelectProvinsi(p),
            }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
              <div className="text-xs">
                <p className="font-semibold">{p.nama}</p>
                <p className="text-slate-600">{p.sppg} SPPG</p>
              </div>
            </Tooltip>
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-slate-800">{p.nama}</p>
                <p className="text-slate-600 mt-1">
                  <span className="font-semibold text-[#1B4F72]">{p.sppg}</span> Satuan Pelayanan
                </p>
                {onSelectProvinsi && (
                  <button
                    onClick={() => onSelectProvinsi(p)}
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Filter wilayah ini →
                  </button>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
