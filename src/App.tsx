import { useState } from 'react'
import {
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import type { MapCameraChangedEvent, MapMouseEvent } from '@vis.gl/react-google-maps';

import './App.scss'

function App() {
  const dronePosition = { lat: 12.999290306806886, lng: 80.27369224120666 };
  const [viewPortPosition, setViewPortPosition] = useState(dronePosition);
  const [boundaryList, setBoundaryList] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState(19);

  console.log(boundaryList);

  const handleZoomChanged = (event: MapCameraChangedEvent) => {
    const newZoom = event.map.getZoom();
    if (newZoom) setZoom(newZoom);
  }

  const handleCenterChanged = (event: MapCameraChangedEvent) => {
    const center = event.map.getCenter();
    if (center) setViewPortPosition({ lat: center.lat(), lng: center.lng() });
  }

  const handleClick = (event: MapMouseEvent) => {
    const lat = event.detail.latLng?.lat;
    const lng = event.detail.latLng?.lng;
    console.log('lat', lat, 'lng', lng);

    if (lat && lng) setBoundaryList((prev) => [...prev, { lat, lng }]);
  }

  return (
    <div className="bg-container">
      <div className='map-container' >
        <Map
          zoom={zoom}
          center={viewPortPosition}
          mapTypeId='satellite'
          mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
        
          disableDefaultUI={true}
          zoomControl={true}
          scaleControl={true}
          rotateControl={true}
        
          onZoomChanged={handleZoomChanged}
          onCenterChanged={handleCenterChanged}
          onClick={handleClick}
        >
          <AdvancedMarker position={dronePosition} ></AdvancedMarker>
        </Map>
      </div>

      <button type='button' className='btn' onClick={() => console.log('clicked')}>
        Click me
      </button>
    </div>
  )
}

export default App
