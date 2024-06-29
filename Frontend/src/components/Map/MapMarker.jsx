import React, { useEffect, useState, useRef, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker, useMap, Pin } from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { getAllReports } from "../../services/redux/actions/reportactions";

const MapMarker = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const reports = await getAllReports();
      const formattedLocations = reports?.map((report) => ({
        key: report._id,
        location: {
          lat: parseFloat(report.latitude),
          lng: parseFloat(report.longitude),
        },
        type: report.type,
        description: report.description,
        severity: report.severity,
        crimeplace: report.crimeplace,
        crimetime: new Date(report.crimetime).toLocaleString(),
      }));
      setLocations(formattedLocations);
    };

    fetchReports();
  }, []);

  return (
    <div className="h-[25rem] w-[25rem]">
      <APIProvider apiKey="AIzaSyAitCJvWk1mvYJuLGjUvUtYq56DPGcM--g">
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          mapId="3c948ac84b2f7a77"
        ></Map>
        <PoiMarkers pois={locations} />
      </APIProvider>
    </div>
  );
};

const PoiMarkers = ({ pois }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.addMarkers(Object.values(markers));
    }
  }, [markers]);

  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  const handleMarkerClick = useCallback(
    (ev, poi) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked:", ev.latLng.toString(), poi);
      map.panTo(ev.latLng);
     
    },
    [map]
  );

  return (
    <>
      {pois.map((poi) => (
        <AdvancedMarker
          key={poi.key}
          clickable={true}
          onClick={(ev) => handleMarkerClick(ev, poi)}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
        >
          <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default MapMarker;
