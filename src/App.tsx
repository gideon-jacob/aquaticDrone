import { useState } from 'react'

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { MapCameraChangedEvent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { Polygon } from './components/Polygon';
import { Polyline } from './components/Polyline';

import { GrUndo as UndoIcon } from "react-icons/gr";
import { Circles as LoaderSpinner } from 'react-loader-spinner';

import './App.scss'

const polylinePath = [
  {
      "lat": 12.999047907183801,
      "lng": 80.27334355403984
  },
  {
      "lat": 12.99917335391857,
      "lng": 80.2733381896219
  },
  {
      "lat": 12.999283119759468,
      "lng": 80.27332746078595
  },
  {
      "lat": 12.999432087608785,
      "lng": 80.2733328252039
  },
  {
      "lat": 12.999536626397004,
      "lng": 80.27337305833852
  },
  {
      "lat": 12.99949219741738,
      "lng": 80.27339183380138
  },
  {
      "lat": 12.999424247197892,
      "lng": 80.27337305833852
  },
  {
      "lat": 12.999360450336551,
      "lng": 80.27336872594788
  },
  {
      "lat": 12.999277892815766,
      "lng": 80.27336769392058
  },
  {
      "lat": 12.999220396427758,
      "lng": 80.27337037612959
  },
  {
      "lat": 12.999157673080196,
      "lng": 80.27339183380138
  },
  {
      "lat": 12.999094949716781,
      "lng": 80.27343743135395
  },
  {
      "lat": 12.999157673080196,
      "lng": 80.27345888902576
  },
  {
      "lat": 12.999233463789846,
      "lng": 80.27342938472704
  },
  {
      "lat": 12.999319708362336,
      "lng": 80.27341597368216
  },
  {
      "lat": 12.999398112493118,
      "lng": 80.2734213381001
  },
  {
      "lat": 12.99946344924987,
      "lng": 80.27342938472704
  },
  {
      "lat": 12.999528785989408,
      "lng": 80.27344547798089
  },
  {
      "lat": 12.99957321496248,
      "lng": 80.27348839332448
  },
  {
      "lat": 12.999549693742425,
      "lng": 80.27352057983218
  },
  {
      "lat": 12.999458222309958,
      "lng": 80.27349375774243
  },
  {
      "lat": 12.999392827236528,
      "lng": 80.27347010991026
  },
  {
      "lat": 12.99933277571918,
      "lng": 80.27347498227961
  },
  {
      "lat": 12.999272665871962,
      "lng": 80.27347498227961
  },
  {
      "lat": 12.999230850317465,
      "lng": 80.27347766448858
  },
  {
      "lat": 12.999209942537606,
      "lng": 80.27349912216039
  },
  {
      "lat": 12.999149832660626,
      "lng": 80.2735018043694
  },
  {
      "lat": 12.99907404192543,
      "lng": 80.2734642534437
  },
  {
      "lat": 12.999021772439411,
      "lng": 80.2734240203091
  },
  {
      "lat": 12.998982570317665,
      "lng": 80.27337037612959
  },
  {
      "lat": 12.998964275992066,
      "lng": 80.27343474914498
  },
  {
      "lat": 12.9989904107425,
      "lng": 80.27350985099629
  },
  {
      "lat": 12.999063588029133,
      "lng": 80.27350716878735
  },
  {
      "lat": 12.999126311400461,
      "lng": 80.27354203750403
  },
  {
      "lat": 12.999215169482731,
      "lng": 80.27355813075788
  },
  {
      "lat": 12.9992857332313,
      "lng": 80.27354740192197
  },
  {
      "lat": 12.999377204727327,
      "lng": 80.27353935529504
  },
  {
      "lat": 12.999450381899894,
      "lng": 80.27353130866813
  },
  {
      "lat": 12.999510491704074,
      "lng": 80.27355276633992
  },
  {
      "lat": 12.999588895774595,
      "lng": 80.27359568168352
  },
  {
      "lat": 12.999649005545237,
      "lng": 80.27364664365409
  },
  {
      "lat": 12.999669913288116,
      "lng": 80.27373247434133
  },
  {
      "lat": 12.999638551673112,
      "lng": 80.27373515655026
  },
  {
      "lat": 12.999601963117255,
      "lng": 80.27366273690794
  },
  {
      "lat": 12.999553337256929,
      "lng": 80.27363507588622
  },
  {
      "lat": 12.99946083577992,
      "lng": 80.2735876350566
  },
  {
      "lat": 12.99940333943429,
      "lng": 80.27358227063864
  },
  {
      "lat": 12.99935629695978,
      "lng": 80.27358495284763
  },
  {
      "lat": 12.9993040275332,
      "lng": 80.27359568168352
  },
  {
      "lat": 12.999230850317465,
      "lng": 80.27361713935532
  },
  {
      "lat": 12.999157673080196,
      "lng": 80.27359299947454
  },
  {
      "lat": 12.999092336242965,
      "lng": 80.27357154180275
  },
  {
      "lat": 12.999060974554972,
      "lng": 80.27354203750403
  },
  {
      "lat": 12.99902438591399,
      "lng": 80.27358227063864
  },
  {
      "lat": 12.999058361080786,
      "lng": 80.27363323260921
  },
  {
      "lat": 12.99912108445345,
      "lng": 80.27363323260921
  },
  {
      "lat": 12.999207329064983,
      "lng": 80.273654690281
  },
  {
    lat: 12.999290306806886,
    lng: 80.27369224120666
  }
]

function App() {
  const dronePosition = { lat: 12.999290306806886, lng: 80.27369224120666 };
  const [viewPortPosition, setViewPortPosition] = useState(dronePosition);
  const [boundaryList, setBoundaryList] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState(19);

  const [isFinalized, setIsFinalized] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);

  const [color1, color2, color3] = ['#005DAB', '#003366', '#DF4641'];

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

    if (lat && lng) setBoundaryList((prev) => [...prev, { lat, lng }]);
  }

  const handlePolygonClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat && lng) setBoundaryList((prev) => [...prev, { lat, lng }]);
  }

  const handleDrag = (index: number, event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    
    if (lat && lng) {
      setBoundaryList((prev) => {
        const newList = [...prev];
        newList[index] = { lat, lng };
        return newList;
      });
    }
  }

  const handleFinalize = () => {
    if (boundaryList.length < 3) {
      alert('Please select at least 3 points to create a polygon.');
      return;
    }

    setIsFinalized((prev) => !prev);
  }

  const handleUndo = () => {
    setBoundaryList((prev) => {
      const newList = [...prev];
      newList.pop();
      return newList;
    });
  }

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => setIsConnectionEstablished(true), 3000);
    console.log(boundaryList);
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
        
          onZoomChanged={handleZoomChanged}
          onCenterChanged={handleCenterChanged}
          {...isFinalized ? {} : { onClick: handleClick }}
        >
          <AdvancedMarker position={dronePosition}></AdvancedMarker>
          <Polygon
            fillColor={color1}
            strokeColor={color2}
            paths={boundaryList}
            {...isFinalized ? {} : { onClick: handlePolygonClick }}
          />

          {boundaryList.map((boundary, index) => (
            <AdvancedMarker
              key={index}
              position={boundary}
              draggable={!isFinalized}
              {...isFinalized ? {} : { onDrag: (event) => handleDrag(index, event) }}
            >
              <Pin
                background={'transparent'}
                borderColor={color1}
                glyph={'🔵'}
                glyphColor={color2}
                scale={0.6}
              />
            </AdvancedMarker>
          ))}

          {isSent && isConnectionEstablished && (
            <Polyline paths={polylinePath} strokeColor={color3} />
          )}
        </Map>
      </div>

      {!isSent ? (
        <div className='btn-container'>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type='button' className='btn' onClick={handleFinalize} disabled={isSent}>
              {isFinalized ? 'Edit Boundary' : 'Finalize Boundary'}
            </button>

            {isFinalized && (
              <button type='button' className='btn' onClick={handleSend} disabled={isSent}>
                Send
              </button>
            )}
          </div>

          <button
            type='button'
            className='btn'
            onClick={handleUndo}
            disabled={isFinalized}
            title="Undo"
          >
            <UndoIcon className='icon' />
          </button>
        </div>
      ) : !isConnectionEstablished ? (
        <LoaderSpinner
          visible={isSent && !isConnectionEstablished}
          height={55}
          width={55}
          color="#005DAB"
        />
      ) : (
        <span className='btn'>Progress: 48%</span>
      )}
    </div>
  )
}

export default App
