import mapPlaceholder from '../assets/map.png';

export default function MapSection() {
  return (
    // Changed h-full to h-64 (256px) or h-48 (192px) to reduce size
    <div className="w-full h-64 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
      <img 
        src={mapPlaceholder} 
        alt="Map" 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm">
        Map View
      </div>
    </div>
  );
}