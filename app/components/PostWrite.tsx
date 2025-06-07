import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./PostWrite.css";
import RichTextEditor from "./RichTextEditor";
import html2canvas from "html2canvas";
import CorrectTextRequest from "../api/spellcorrector/requests/spellcorrector/CorrectTextRequest";

interface PostWriteProps {
  cancelOnclick: () => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function PostWriteComponent(props: PostWriteProps) {
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
  const [redoStack, setRedoStack] = useState<{ lat: number; lng: number }[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [totalDistance, setTotalDistance] = useState(0);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [places, setPlaces] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any | null>(null);

  const isDrawingModeRef = useRef(isDrawingMode);
  const pathRef          = useRef(path);
  const redoRef          = useRef(redoStack);

  const mapRef           = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef   = useRef<any>(null);
  const polylineRef      = useRef<any>(null);
  const previewLineRef   = useRef<any>(null);
  const markersRef       = useRef<any[]>([]);
  const placesServiceRef = useRef<any>(null);

  const [spellInput, setSpellInput] = useState("");
  const [spellOutput, setSpellOutput] = useState("");

  const handleSpellCorrect = async () => {
    if (!spellInput.trim()) return;
    try {
      const req = new CorrectTextRequest(spellInput);
      const res = await req.send();
      setSpellOutput(res.corrected);
    } catch (err) {
      console.error("맞춤법 검사 실패:", err);
      setSpellOutput("맞춤법 검사 중 오류가 발생했습니다.");
    }
  };

  const [spellCorrectorVisible, setSpellCorrectorVisible] = useState(false);

  const toggleSpellCorrectorContainer = () => {
    setSpellCorrectorVisible(prev => !prev);
  };

  const formatTime = (hours: number) => {
    const totalMinutes = Math.round(hours * 60);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h ? `${h}시간 ${m}분` : `${m}분`;
  };
  const SPEED = { WALK: 4, BIKE: 15, MOTOR: 25 };

  useEffect(() => { isDrawingModeRef.current = isDrawingMode; }, [isDrawingMode]);
  useEffect(() => { pathRef.current          = path;          }, [path]);
  useEffect(() => { redoRef.current          = redoStack;     }, [redoStack]);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setPlaces([]);
      setPagination(null);
    }
  }, [searchKeyword]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=357e1eb7fc25d648387238964179b068&autoload=false&libraries=services";
    script.async = true;
    script.onload = () => window.kakao.maps.load(() => setMapLoaded(true));
    document.head.appendChild(script);
  }, []);

  useLayoutEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const target   = mapRef.current;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (!width || !height) return;

      observer.disconnect();

      const map = new window.kakao.maps.Map(target, {
        center: new window.kakao.maps.LatLng(35.1398173087151, 126.931692188988),
        level: 4,
      });
      mapInstanceRef.current = map;

      polylineRef.current = new window.kakao.maps.Polyline({
        map,
        path: [],
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeStyle: "solid",
      });

      previewLineRef.current = new window.kakao.maps.Polyline({
        map: null,
        path: [],
        strokeWeight: 4,
        strokeColor: "#FF0000",
        strokeOpacity: 0.4,
        strokeStyle: "dash",
        zIndex: 5,
      });

      placesServiceRef.current = new window.kakao.maps.services.Places();

      window.kakao.maps.event.addListener(map, "click", (e: any) => {
        if (!isDrawingModeRef.current) return;
        const latlng = e.latLng;
        setPath([...pathRef.current, { lat: latlng.getLat(), lng: latlng.getLng() }]);
        setRedoStack([]);
      });

      const mouseMoveFn = (e: any) => {
        if (!isDrawingModeRef.current || pathRef.current.length === 0) {
          previewLineRef.current.setMap(null);
          return;
        }
        const last = pathRef.current[pathRef.current.length - 1];
        const linePath = [
          new window.kakao.maps.LatLng(last.lat, last.lng),
          e.latLng,
        ];
        previewLineRef.current.setPath(linePath);
        if (!previewLineRef.current.getMap()) previewLineRef.current.setMap(map);
      };
      window.kakao.maps.event.addListener(map, "mousemove", mouseMoveFn);
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [mapLoaded]);

  const executeSearch = (kw: string, page: number = 1) => {
    if (!kw || !placesServiceRef.current) return;
    placesServiceRef.current.keywordSearch(
      kw,
      (data: any[], status: any, pg: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pg);
          const { y, x } = data[0];
          mapInstanceRef.current.setCenter(new window.kakao.maps.LatLng(y, x));
        } else {
          setPlaces([]);
          setPagination(null);
        }
      },
      { page }
    );
  };

  const syncMarkers = (newPath: { lat: number; lng: number }[]) => {
    if (!mapInstanceRef.current) return;
    const map     = mapInstanceRef.current;
    const markers = markersRef.current;

    while (markers.length < newPath.length) {
      const idx = markers.length;
      const p   = newPath[idx];
      const marker = new window.kakao.maps.Marker({
        position : new window.kakao.maps.LatLng(p.lat, p.lng),
        map,
        draggable: true,
      });
      markers.push(marker);
    }

    while (markers.length > newPath.length) {
      const m = markers.pop();
      if (m) m.setMap(null);
    }

    markers.forEach((marker, i) => {
      const ll = new window.kakao.maps.LatLng(newPath[i].lat, newPath[i].lng);
      if (!marker.getPosition().equals(ll)) marker.setPosition(ll);
      if (!(marker as any).__hooked) {
        window.kakao.maps.event.addListener(marker, "dragend", () => {
          const rebuilt = markersRef.current.map((m) => {
            const pos = m.getPosition();
            return { lat: pos.getLat(), lng: pos.getLng() };
          });
          setPath(rebuilt);
        });
        (marker as any).__hooked = true;
      }
    });
  };

  useEffect(() => {
    if (polylineRef.current) {
      polylineRef.current.setPath(
        path.map((p) => new window.kakao.maps.LatLng(p.lat, p.lng))
      );
      setTotalDistance(polylineRef.current.getLength());
    }
    syncMarkers(path);
  }, [path]);

  useEffect(() => {
    if (!isDrawingMode && previewLineRef.current) previewLineRef.current.setMap(null);
  }, [isDrawingMode]);

  const toggleDrawing = () => {
    setIsDrawingMode((prev) => !prev);
  };

  const handleUndo = () => {
    if (!pathRef.current.length) return;
    const newPath = [...pathRef.current];
    const last    = newPath.pop()!;
    setPath(newPath);
    setRedoStack([...redoRef.current, last]);
  };
  const handleRedo = () => {
    if (!redoRef.current.length) return;
    const newRedo   = [...redoRef.current];
    const recovered = newRedo.pop()!;
    setPath([...pathRef.current, recovered]);
    setRedoStack(newRedo);
  };
  const handleReset = () => {
    setPath([]);
    setRedoStack([]);
    setTotalDistance(0);
    polylineRef.current?.setPath([]);
    previewLineRef.current?.setMap(null);
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  };

  const handlePlaceClick = (p: any) => {
    const { y, x } = p;
    mapInstanceRef.current?.setCenter(
      new window.kakao.maps.LatLng(y, x)
    );
    setSearchKeyword("");
  };

  const gotoPage = (n: number) => {
    executeSearch(searchKeyword.trim(), n);
  };

  async function downloadMap() {
    const map   = mapInstanceRef.current;
    const poly  = polylineRef.current;
    const cont  = mapRef.current;
    if (!map || !poly || !cont) return;

    const prev = poly.getStrokeOpacity?.() ?? 0.6;
    poly.setOptions({ strokeOpacity: 0 });

    const rect = cont.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
    const tmp  = document.createElement("canvas");
    tmp.width = rect.width * dpr;  tmp.height = rect.height * dpr;
    tmp.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:4;";
    cont.appendChild(tmp);

    const ctx = tmp.getContext("2d")!;
    ctx.lineWidth = 6 * dpr;
    ctx.lineJoin  = "round";
    ctx.strokeStyle = "#FF0000";

    const proj = map.getProjection();
    const toPt = (lat: number, lng: number) => {
      const pt = proj.containerPointFromCoords(
        new window.kakao.maps.LatLng(lat, lng)
      );
      return { x: pt.x * dpr, y: pt.y * dpr };
    };

    ctx.beginPath();
    let started = false;
    pathRef.current.forEach(({ lat, lng }) => {
      const { x, y } = toPt(lat, lng);
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    const markers = markersRef.current;
    markers.forEach(m=>m.setMap(null));

    try {
      const shot = await html2canvas(cont,{
        proxy:"http://localhost:8080/proxy/image",
        useCORS:false,
        allowTaint:true,
        backgroundColor:null,
      });
      shot.toBlob(b=>{
        if(!b) return;
        const url=URL.createObjectURL(b);
        const a  = document.createElement("a");
        a.download=`pathbook-map-${Date.now()}.png`;
        a.href=url; a.click();
        URL.revokeObjectURL(url);
      },"image/png",1);
    } finally {
      cont.removeChild(tmp);
      poly.setOptions({ strokeOpacity: prev });
      markers.forEach(m=>m.setMap(map));
    }
  }
  return (
    <div className="post-write-frame">
      <div className="draw-path">
        <div className="draw-tool-container">
          <div
            className="draw-tool-drawing"
            onClick={toggleDrawing}
            style={{
              backgroundColor: isDrawingMode
                ? "var(--color-primary)"
                : "var(--color-contents-bg)",
              cursor: "pointer",
            }}
          />
          <div className="draw-tool-redo"  onClick={handleRedo}  />
          <div className="draw-tool-undo"  onClick={handleUndo}  />
          <div className="draw-tool-reset" onClick={handleReset} />
        </div>

        <div className="map-search-container">
          <input
            className="map-search-input"
            placeholder="장소 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                executeSearch(searchKeyword.trim(), 1);
              }
            }}
          />
          <div className="map-search-icon" onClick={() => executeSearch(searchKeyword.trim(), 1)} />
        </div>
        {searchKeyword.trim() !== "" && places.length > 0 && (
          <div className="search-result">
            <div className="search-scroll">
              <ul className="search-list">
                {places.map((p, i) => (
                  <li
                    key={p.id ?? i}
                    className="search-item"
                    onClick={() => handlePlaceClick(p)}
                  >
                    <span className="place-name">{p.place_name}</span>
                    <span className="place-address">
                      {p.road_address_name || p.address_name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {pagination && pagination.last > 1 && (
              <div className="search-pagination">
                <button
                  disabled={pagination.current === 1}
                  onClick={() => gotoPage(pagination.current - 1)}
                >
                  {"<"}
                </button>
                <span>
                  {pagination.current} / {pagination.last}
                </span>
                <button
                  disabled={!pagination.hasNextPage}
                  onClick={() => gotoPage(pagination.current + 1)}
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
        )}
        {/* Kakao Map */}
        <div ref={mapRef} className="kakao-map" />
      </div>

      {/* 거리 표시 */}
      <div className="distance-display">
        <p>
          <span className="total-distance-name">총 거리</span>&nbsp;:&nbsp;
          {path.length > 1 ? totalDistance.toFixed(1) : "0"}&nbsp;m
        </p>
        <span>
          <span className="transportation-name">도보</span>&nbsp;:&nbsp;
          {formatTime((totalDistance / 1000) / SPEED.WALK)},&nbsp;
        </span>
        <span>
          <span className="transportation-name">자전거</span>&nbsp;:&nbsp;
          {formatTime((totalDistance / 1000) / SPEED.BIKE)},&nbsp;
        </span>
        <span>
          <span className="transportation-name">바이크&자동차</span>&nbsp;:&nbsp;
          {formatTime((totalDistance / 1000) / SPEED.MOTOR)}
        </span>
      </div>

      {/* 글쓰기 영역 */}
      <div className="frame">
        <input className="write-subject" placeholder="제목을 입력해 주세요" />
        <br/>
        <input className="tag-list" placeholder="#태그_추가" />
        <RichTextEditor />
      </div>

      <a className="spell-corrector-toggle" href="#" onClick={
        e => {
         e.preventDefault(); 
         toggleSpellCorrectorContainer(); 
        }}>
        맞춤법 검사기 사용해보기...
      </a>
      {spellCorrectorVisible && (
        <div className="spell-corrector-container">
          검사할 내용:
          <textarea
            className="spell-corrector-textarea"
            placeholder="내용을 입력해 주세요 (이곳의 내용은 저장 되지 않습니다.)"
            value={spellInput}
            onChange={(e) => setSpellInput(e.target.value)}
          ></textarea>
          <div className="spell-corrector-edit-button" onClick={handleSpellCorrect}>
            수정하기
          </div>
          <hr/><br/>
          수정된 내용:
          <textarea
            className="spell-corrector-response"
            placeholder="수정된 내용이 표시 됩니다."
            value={spellOutput}
            readOnly
          ></textarea>
        </div>
      )}
      <div className="button-container">
        <button className="cancel" onClick={props.cancelOnclick}>
          작성취소
        </button>
        <button className="submit" onClick={downloadMap}>
          작성하기
        </button>
      </div>
    </div>
  );
}
