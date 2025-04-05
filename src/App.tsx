import { useState } from 'react'

import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { MapCameraChangedEvent, MapMouseEvent } from '@vis.gl/react-google-maps';
import { Polygon } from './components/Polygon';
import { Polyline } from './components/Polyline';

import { Circles as LoaderSpinner } from 'react-loader-spinner';
import { IoSend as SendIcon } from "react-icons/io5";
import { GrUndo as UndoIcon } from "react-icons/gr";
import { FaSignal as SignalIcon } from "react-icons/fa";
import { GiBattery75 as BatteryIcon } from "react-icons/gi";
import { FaRoute as PlanIcon } from "react-icons/fa6";
import { BsBoxArrowInDown as ReturnIcon } from "react-icons/bs";
import { GiPauseButton as PauseIcon } from "react-icons/gi";
import { FaPlay as PlayIcon } from "react-icons/fa";

import './App.scss'
import { useEffect } from 'react';

const initialPolylinePath = [
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

const initialResponse = {
  droneLocation: {
    lat: 12.999290306806886,
    lng: 80.27369224120666
  },
  currentState: "Onboard",
  batteryPercentage: 75,
  droneDirection: 270
}

function App() {
  // const dronePosition = initialResponse.droneLocation;
  const [droneLocation, setDroneLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [droneState, setDroneState] = useState<string>('');
  const [droneDirection, setDroneDirection] = useState<number | null>(0);
  const [dronePath, setDronePath] = useState<{ lat: number; lng: number }[]>([]);
  const [droneBattery, setDroneBattery] = useState<number>(initialResponse.batteryPercentage);

  const [viewPortPosition, setViewPortPosition] = useState<{ lat: number; lng: number } | null>(droneLocation);
  const [boundaryList, setBoundaryList] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState(19);

  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);
  const [isSetBoundary, setIsSetBoundary] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isBoundarySetSuccessful, setIsBoundarySetSuccessful] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDroneReturning, setIsDroneReturning] = useState(false);

  const [color1, color2, color3] = ['#005DAB', '#003366', '#DF4641'];

  useEffect(() => {
    // ComponentDidMount equivalent logic here
    setTimeout(() => {
      setIsConnectionEstablished(true);
      setDroneState(initialResponse.currentState);
      setDroneLocation(initialResponse.droneLocation);
      setDroneDirection(initialResponse.droneDirection);
      setDroneBattery(initialResponse.batteryPercentage);
      setViewPortPosition(initialResponse.droneLocation);
    }, 3000);

    const intervalId = setInterval(() => {
      if (!isBoundarySetSuccessful) return;
      if (isPaused) return;
      
      const newLocation = initialPolylinePath.pop();
      if (newLocation) {
        setDroneLocation(newLocation);
        setDronePath((prev) => [...prev, newLocation]);
      }
    }, 1000);

    // Cleanup function (optional, for ComponentWillUnmount equivalent)
    return () => {
      clearInterval(intervalId);
      console.log('Component unmounted');
    };
  }, [isBoundarySetSuccessful, isPaused]);

  const handleMapZoomChanged = (event: MapCameraChangedEvent) => {
    const newZoom = event.map.getZoom();
    if (newZoom) setZoom(newZoom);
  }

  const handleMapCenterChanged = (event: MapCameraChangedEvent) => {
    const center = event.map.getCenter();
    if (center) setViewPortPosition({ lat: center.lat(), lng: center.lng() });
  }

  const handleMapClick = (event: MapMouseEvent) => {
    const lat = event.detail.latLng?.lat;
    const lng = event.detail.latLng?.lng;

    if (lat && lng) setBoundaryList((prev) => [...prev, { lat, lng }]);
  }

  const handlePolygonBoundaryClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();

    if (lat && lng) setBoundaryList((prev) => [...prev, { lat, lng }]);
  }

  const handleBoundaryDrag = (index: number, event: google.maps.MapMouseEvent) => {
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

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSetBoundary(false);
      setIsBoundarySetSuccessful(true);
      initialResponse.currentState = 'Offboard';
      setDroneState(initialResponse.currentState);
    }, 3000);
    console.log(boundaryList);
  }
  
  const handleUndo = () => {
    setBoundaryList((prev) => {
      const newList = [...prev];
      newList.pop();
      return newList;
    });
  }

  const handleDronePause = () => {
    setIsPaused(true);
  }

  const handleDroneAction = () => {
    setIsPaused(false);
  }

  const handleDroneReturn = () => {
    setIsDroneReturning(true);
    setDroneState('Returning');

    setTimeout(() => {
      setIsDroneReturning(false);
      setIsBoundarySetSuccessful(false);
      setIsSent(false);
      setIsPaused(false);
      setIsSetBoundary(false);
      setBoundaryList([]);
      setDronePath((prev) => {
        initialPolylinePath.push(...prev);
        return [];
      });
    }, 5000);
  }

  const renderDroneStatus = () => {
    if (isConnectionEstablished) {
      return (isDroneReturning) ? 'Returning...' : droneState;
    } else {
      return 'Connecting...';
    }
  }

  return (
    <div className='bg-container'>
      {isConnectionEstablished && (
        <div className='map-wrapper' >
          <Map
            zoom={zoom}
            center={viewPortPosition}
            disableDefaultUI={true}
            mapTypeId='satellite'
            mapId={import.meta.env.VITE_PUBLIC_MAP_ID}
          
            onZoomChanged={handleMapZoomChanged}
            onCenterChanged={handleMapCenterChanged}
            {...isSetBoundary ? { onClick: handleMapClick } : {}}
          >
            <AdvancedMarker position={droneLocation}></AdvancedMarker>

            <Polygon
              fillColor={color1}
              strokeColor={color2}
              paths={boundaryList}
              {...isSetBoundary ? { onClick: handlePolygonBoundaryClick } : {}}
            />

            {boundaryList.map((boundary, index) => (
              <AdvancedMarker
                key={index}
                position={boundary}
                draggable={isSetBoundary}
                {...isSetBoundary ? { onDrag: (event) => handleBoundaryDrag(index, event) } : {}}
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

            {isSent && isBoundarySetSuccessful && (
              <Polyline paths={dronePath} strokeColor={color3} />
            )}
          </Map>
        </div>
      )}

      <header className='header-container'>
        <div className='info-container'>
          <span className='drone-status'>
            {renderDroneStatus()}
          </span>
          <span className='signal-status'>
            <SignalIcon className='icon' />
          </span>
          <span className='battery-status'>
            <BatteryIcon className='icon battery-icon' />
            <span className='battery-percentage-text'>{droneBattery}%</span>
          </span>
        </div>

        <hr className='seperator' />

        <div className='btn-container'>
          <button
            type='button'
            className={`btn ${(isSetBoundary && !isBoundarySetSuccessful) ? 'selected' : ''}`}
            onClick={() => setIsSetBoundary(prev => !prev)}
            disabled={isBoundarySetSuccessful}
          >
            <PlanIcon className='icon' />
            Plan
          </button>
          
          <button
            type='button'
            className='btn'
            onClick={handleDroneReturn}
            disabled={!isBoundarySetSuccessful || !isPaused}
          >
            <ReturnIcon style={{ strokeWidth: 0.8, scale: 1.05 }} className='icon' />
            Return
          </button>
          
          <button
            type='button'
            className='btn'
            onClick={handleDronePause}
            disabled={!isBoundarySetSuccessful || isPaused}
          >
            <PauseIcon className='icon' />
            Pause
          </button>
          
          <button
            type='button'
            className='btn'
            onClick={handleDroneAction}
            disabled={!isBoundarySetSuccessful || !isPaused}
          >
            <PlayIcon style={{ scale: 0.9 }} className='icon' />
            Action
          </button>
        </div>

        {isSetBoundary && !isBoundarySetSuccessful && (
          <>
              <hr className='seperator' /> 

              <div className='btn-container'>
                <button type='button' className='btn' onClick={handleSend}>
                  <SendIcon className='icon' /> Send
                </button>
                <button type='button' className='btn' onClick={handleUndo}>
                  <UndoIcon style={{ strokeWidth: 0.9, scale: 1.05 }} className='icon' /> Undo
                </button>
              </div>  
          </>
        )}      
      </header>

      {(isSent && !isBoundarySetSuccessful || !isConnectionEstablished)  && (
        <div className='loader-container'>
            <LoaderSpinner
              height={55}
              width={55}
              color="#005DAB"
            />
        </div>
      )}
    </div>
  )
}

export default App
