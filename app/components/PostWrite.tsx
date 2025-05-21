import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./PostWrite.css";
import RichTextEditor from "./RichTextEditor";

interface PostWriteProps {
  cancelOnclick: () => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function PostWriteComponent(Details: PostWriteProps) {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
  const [redoStack, setRedoStack] = useState<{ lat: number; lng: number }[]>(
    []
  );
  const [mapLoaded, setMapLoaded] = useState(false);

  const isDrawingModeRef = useRef(isDrawingMode);
  const pathRef = useRef(path);
  const redoRef = useRef(redoStack);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const polylineRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    isDrawingModeRef.current = isDrawingMode;
  }, [isDrawingMode]);

  useEffect(() => {
    pathRef.current = path;
  }, [path]);

  useEffect(() => {
    redoRef.current = redoStack;
  }, [redoStack]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=357e1eb7fc25d648387238964179b068&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => setMapLoaded(true));
    };
    document.head.appendChild(script);
  }, []);

  useLayoutEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height;
      if (height > 0) {
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(
            35.1398173087151,
            126.931692188988
          ),
          level: 4,
        });
        mapInstanceRef.current = map;

        polylineRef.current = new window.kakao.maps.Polyline({
          map,
          path: [],
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
        });

        window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => {
          if (!isDrawingModeRef.current) return;
          const latlng = mouseEvent.latLng;
          const newPoint = { lat: latlng.getLat(), lng: latlng.getLng() };
          const newPath = [...pathRef.current, newPoint];
          setPath(newPath);
          setRedoStack([]);
          polylineRef.current.setPath(
            newPath.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))
          );
        });

        observer.disconnect();
      }
    });

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [mapLoaded]);

  const toggleDrawingMode = () => setIsDrawingMode((prev) => !prev);

  const handleUndo = () => {
    if (pathRef.current.length === 0) return;
    const newPath = [...pathRef.current];
    const last = newPath.pop();
    if (last) {
      setPath(newPath);
      setRedoStack([...redoRef.current, last]);
      polylineRef.current.setPath(
        newPath.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))
      );
    }
  };

  const handleRedo = () => {
    if (redoRef.current.length === 0) return;
    const newRedo = [...redoRef.current];
    const recovered = newRedo.pop();
    if (recovered) {
      const newPath = [...pathRef.current, recovered];
      setPath(newPath);
      setRedoStack(newRedo);
      polylineRef.current.setPath(
        newPath.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))
      );
    }
  };

  const handleReset = () => {
    setPath([]);
    setRedoStack([]);
    polylineRef.current.setPath([]);
  };

  return (
    <div className="post-write-frame">
      <div className="draw-path">
        <div className="draw-tool-container">
          <div
            className="draw-tool-drawing"
            onClick={toggleDrawingMode}
            style={{
              backgroundColor: isDrawingMode
                ? "var(--color-primary)"
                : "var(--color-contents-bg)",
              cursor: "pointer",
            }}
          />
          <div className="draw-tool-redo" onClick={handleRedo} />
          <div className="draw-tool-undo" onClick={handleUndo} />
          <div className="draw-tool-reset" onClick={handleReset} />
        </div>
        <div className="map-search-container">
          <input className="map-search-input" />
          <div className="map-search-icon" />
        </div>
        <div ref={mapRef} className="kakao-map" />
      </div>
      <div className="frame">
        <input
          className="write-subject"
          placeholder="제목을 입력해 주세요"
        ></input>
        <p></p>
        <input className="tag-list" placeholder="#태그_추가"></input>
        <RichTextEditor />
      </div>
      <div className="button-container">
        <button className="cancel" onClick={Details.cancelOnclick}>
          작성취소
        </button>
        <button className="submit">작성하기</button>
      </div>
    </div>
  );
}
