
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface OpenStreetMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerTitle?: string;
  height?: string;
  width?: string;
  className?: string;
}

const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  latitude,
  longitude,
  zoom = 13,
  markerTitle = 'Location',
  height = '400px',
  width = '100%',
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Fix icon paths for Leaflet
    const fixLeafletIcon = () => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    };

    fixLeafletIcon();

    if (!mapInstanceRef.current) {
      // Initialize the map
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], zoom);

      // Add the OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add a marker
      L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(markerTitle)
        .openPopup();
    } else {
      // Update the map view if props change
      mapInstanceRef.current.setView([latitude, longitude], zoom);
      
      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });
      
      // Add a new marker
      L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(markerTitle)
        .openPopup();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, markerTitle]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width }} 
      className={`rounded-lg shadow-md ${className}`}
    />
  );
};

export default OpenStreetMap;
