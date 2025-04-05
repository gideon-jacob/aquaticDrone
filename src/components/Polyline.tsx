import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef
  } from 'react';
  
  import {GoogleMapsContext } from '@vis.gl/react-google-maps';
  
  import type {Ref} from 'react';
  
  type PolylineEventProps = {
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onDrag?: (e: google.maps.MapMouseEvent) => void;
    onDragStart?: (e: google.maps.MapMouseEvent) => void;
    onDragEnd?: (e: google.maps.MapMouseEvent) => void;
    onMouseOver?: (e: google.maps.MapMouseEvent) => void;
    onMouseOut?: (e: google.maps.MapMouseEvent) => void;
  };
  
  type PolylineCustomProps = {
    /**
     * this is an encoded string for the path, will be decoded and used as a path
     */
    paths: google.maps.LatLng[] | google.maps.LatLngLiteral[] | google.maps.MVCArray<google.maps.LatLng>;
    encodedPath?: string;
    strokeColor?: string;
    strokeWeight?: number;
  };
  
  export type PolylineProps = google.maps.PolylineOptions &
    PolylineEventProps &
    PolylineCustomProps;
  
  export type PolylineRef = Ref<google.maps.Polyline | null>;
  
  function usePolyline(props: PolylineProps) {
    const {
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onMouseOver,
      onMouseOut,
      paths,
      ...polylineOptions
    } = props;
    // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
    const callbacks = useRef<Record<string, (e: unknown) => void>>({});
    Object.assign(callbacks.current, {
      onClick,
      onDrag,
      onDragStart,
      onDragEnd,
      onMouseOver,
      onMouseOut
    });
  
    const polyline = useRef(new google.maps.Polyline()).current;
    // update PolylineOptions (note the dependencies aren't properly checked
    // here, we just assume that setOptions is smart enough to not waste a
    // lot of time updating values that didn't change)
    useMemo(() => {
      polyline.setOptions(polylineOptions);
    }, [polyline, polylineOptions]);
  
    const map = useContext(GoogleMapsContext)?.map;
  
    // update the path with the encodedPath
    useMemo(() => {
      polyline.setPath(paths);
    }, [polyline, paths]);

    useEffect(() => {
      const { strokeColor = 'black' } = props;
      const { strokeWeight = 12 } = props; // Default stroke width to 12
      const strokeOpacity = 0.6; // Optional: Adjust stroke opacity

      polyline.setOptions({ 
        strokeColor, 
        strokeWeight, 
        strokeOpacity,
      });
    }, [polyline, props]);
  
    // create polyline instance and add to the map once the map is available
    useEffect(() => {
      if (!map) {
        if (map === undefined)
          console.error('<Polyline> has to be inside a Map component.');
  
        return;
      }
  
      polyline.setMap(map);
  
      return () => {
        polyline.setMap(null);
      };
    }, [map, polyline]);
  
    // attach and re-attach event-handlers when any of the properties change
    useEffect(() => {
      if (!polyline) return;
  
      // Add event listeners
      const gme = google.maps.event;
      [
        ['click', 'onClick'],
        ['drag', 'onDrag'],
        ['dragstart', 'onDragStart'],
        ['dragend', 'onDragEnd'],
        ['mouseover', 'onMouseOver'],
        ['mouseout', 'onMouseOut']
      ].forEach(([eventName, eventCallback]) => {
        gme.addListener(polyline, eventName, (e: google.maps.MapMouseEvent) => {
          const callback = callbacks.current[eventCallback];
          if (callback) callback(e);
        });
      });
  
      return () => {
        gme.clearInstanceListeners(polyline);
      };
    }, [polyline]);
  
    return polyline;
  }
  
  /**
   * Component to render a polyline on a map
   */
  export const Polyline = forwardRef((props: PolylineProps, ref: PolylineRef) => {
    const polyline = usePolyline(props);
  
    useImperativeHandle(ref, () => polyline, [polyline]);
  
    return null;
  });