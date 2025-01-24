"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
const customIcon = L.icon({
  iconUrl: "/marker.png", // Path to your image in the public folder
  iconSize: [32, 32], // Size of the icon [width, height]
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MoveToClosestButton = ({ locations }) => {
  const map = useMap();

  const handleMoveToClosest = () => {
    const center = map.getCenter();
    const userLocation: [number, number] = [center.lat, center.lng];
    const closestLocation = locations.reduce(
      (closest, location) => {
        const distance = getDistance(
          userLocation,
          location.position as [number, number]
        );
        return distance < closest.distance ? { location, distance } : closest;
      },
      { location: null, distance: Infinity }
    );

    if (closestLocation.location) {
      map.flyTo(closestLocation.location.position as [number, number], 15);
    } else {
      console.error("No closest location found.");
    }
  };

  return (
    <div className="w-full flex justify-center p-5">
      <button
        onClick={handleMoveToClosest}
        className=" z-[999] bg-green-500 text-white px-4 py-2 rounded hover:-translate-y-0.5 hover:shadow-lg transition-all"
      >
        Move to Closest Location
      </button>
    </div>
  );
};

const getDistance = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const Map = ({ locations, selectedLocation }) => {
  const [userLocation, setUserLocation] = useState<[number, number]>([
    52, -0.09,
  ]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userLocation}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MoveToClosestButton locations={locations} />
        <ChangeView center={selectedLocation || userLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position as [number, number]}
            icon={customIcon}
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
