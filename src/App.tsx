import { useState } from 'react'
import { Map, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';
import type { MapCameraChangedEvent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { Polygon } from './components/Polygon';

import './App.scss'

function App() {
  const dronePosition = { lat: 12.999290306806886, lng: 80.27369224120666 };
  const [viewPortPosition, setViewPortPosition] = useState(dronePosition);
  const [boundaryList, setBoundaryList] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState(19);

  const [isFinalized, setIsFinalized] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [color1, color2] = ['#005DAB', '#003366'];

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

  const handleFinalize = () => {
    setIsFinalized((prev) => !prev);
    console.log(boundaryList);
  }

  const handleUndo = () => {
    setBoundaryList((prev) => {
      const newList = [...prev];
      newList.pop();
      return newList;
    });
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
          {...isFinalized ? {} : { onClick: handleClick }}
        >
          <AdvancedMarker position={dronePosition} ></AdvancedMarker>
          <Polygon fillColor={color1} strokeColor={color2} paths={boundaryList} />

          {boundaryList.map((boundary, index) => (
            <AdvancedMarker key={index} position={boundary} >
              <Pin
                background={'transparent'}
                borderColor={color1}
                glyph={'🔵'}
                glyphColor={color2}
                scale={0.6}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </div>

      <div className='btn-container'>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type='button' className='btn' onClick={handleFinalize} disabled={isSent}>
            {isFinalized ? 'Edit Boundary' : 'Finalize Boundary'}
          </button>

          {isFinalized && (
            <button type='button' className='btn' onClick={() => setIsSent(true)} disabled={isSent}>
              {isSent ? 'Sent ✅' : 'Send'}
            </button>
          )}
        </div>

        <button type='button' className='btn' onClick={handleUndo} disabled={isFinalized}>
          Undo
        </button>
      </div>
    </div>
  )
}

export default App
