import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeftIcon, MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "./Components/BottomNavbar";
// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});
function MapSection() {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const shuttleMarkerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  // KNUST Campus coordinates (Kumasi, Ghana)
  const campusCenter = [6.6769, -0.1892];
  // Mock shuttle stops around KNUST
  const shuttleStops = [
    {
      id: 1,
      name: "Unity Hall",
      coords: [6.6769, -0.1892],
      type: "stop",
      description: "Pickup Point"
    },
    {
      id: 2,
      name: "Traffic Lights",
      coords: [6.6780, -0.1900],
      type: "waypoint",
      description: "Route Point"
    },
    {
      id: 3,
      name: "Main Gate",
      coords: [6.6750, -0.1880],
      type: "waypoint",
      description: "Route Point"
    },
    {
      id: 4,
      name: "Library",
      coords: [6.6740, -0.1870],
      type: "waypoint",
      description: "Route Point"
    },
    {
      id: 5,
      name: "College of Sci",
      coords: [6.6730, -0.1860],
      type: "stop",
      description: "Destination"
    },
    {
      id: 6,
      name: "Engineering Block",
      coords: [6.6720, -0.1850],
      type: "waypoint",
      description: "Route Point"
    }
  ];
  // Current shuttle position (interpolated based on progress)
  const getShuttlePosition = () => {
    const start = shuttleStops[0].coords;
    const end = shuttleStops[shuttleStops.length - 1].coords;
    const progressRatio = progress / 100;
    return [
      start[0] + (end[0] - start[0]) * progressRatio,
      start[1] + (end[1] - start[1]) * progressRatio
    ];
  };
  // Initialize map
  useEffect(() => {
    if (mapInstanceRef.current) return;
    const map = L.map(mapRef.current).setView(campusCenter, 15);
    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    mapInstanceRef.current = map;
    // Add shuttle stops markers
    shuttleStops.forEach((stop) => {
      const markerIcon = L.icon({
        iconUrl: stop.type === "stop"
          ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png"
          : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      const marker = L.marker(stop.coords, { icon: markerIcon })
        .bindPopup(`<strong>${stop.name}</strong><br>${stop.description}`)
        .addTo(map);
    });
    // Draw route line
    const routeCoords = shuttleStops.map(stop => stop.coords);
    const routePolyline = L.polyline(routeCoords, {
      color: '#7c3aed',
      weight: 4,
      opacity: 0.7,
      dashArray: '5, 5'
    }).addTo(map);
    routeLayerRef.current = routePolyline;
  }, []);
  // Update shuttle marker position based on progress
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const position = getShuttlePosition();
    if (shuttleMarkerRef.current) {
      shuttleMarkerRef.current.setLatLng(position);
    } else {
      // Create shuttle marker with custom icon
      const shuttleIcon = L.icon({
        iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHJ4PSI4IiBmaWxsPSIjMjJjNTVlIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnRTaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5iYPC90ZXh0Pjwvc3ZnPg==",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
      });
      shuttleMarkerRef.current = L.marker(position, { icon: shuttleIcon })
        .bindPopup('<strong>Your Shuttle</strong><br>Currently in transit')
        .addTo(mapInstanceRef.current);
    }
  }, [progress]);
  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        let newProgress = prev + Math.random() * 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg--100 rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Live Tracking</h2>
        <div className="w-10"></div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative">
        <div
          ref={mapRef}
          className="w-full h-full"
        />
        {/* Progress Bar Overlay */}
        <div className="absolute bottom-24 left-4 right-4 bg-white rounded-lg shadow-lg p-4">
          {/* Progress Display */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-gray-800">Route Progress</span>
            <span className="text-sm font-bold text-green-600">{Math.round(progress)}%</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Status Info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded p-2 text-center">
              <p className="text-xs text-gray-600 font-medium">FROM</p>
              <p className="text-xs font-semibold text-gray-800 mt-1">Unity Hall</p>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center">
              <p className="text-xs text-gray-600 font-medium">DISTANCE</p>
              <p className="text-xs font-semibold text-gray-800 mt-1">2.3 km</p>
            </div>
            <div className="bg-gray-50 rounded p-2 text-center">
              <p className="text-xs text-gray-600 font-medium">ETA</p>
              <p className="text-xs font-semibold text-green-600 mt-1">2 mins</p>
            </div>
          </div>
        </div>
        {/* Route Legend */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <p className="text-xs font-semibold text-gray-800 mb-2">Route Legend</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Start/End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Route Point</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🚌</span>
              <span className="text-xs text-gray-600">Shuttle</span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}
export default MapSection;