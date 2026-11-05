import { useId } from "react";

/**
 * CrtFrame — wraps any content (img, iframe, etc.) in a 1970s CRT TV convex screen frame.
 */
// eslint-disable-next-line react/prop-types
function CrtFrame({ children, className = "", bulge = 3 }) {
  const id = useId();
  const clipId = `crt-clip-${id.replace(/:/g, "")}`;
  const scanId = `crt-scan-${id.replace(/:/g, "")}`;
  const vigId = `crt-vig-${id.replace(/:/g, "")}`;
  
  const b = bulge;
  const p = b / 100; // 0.03 dla bulge = 3

  // Clip path w przestrzeni objectBoundingBox (wartości od 0 do 1)
  const clipPath = [
    `M ${p} ${p}`,
    `C ${p + (1 - 2 * p) * 0.33} 0, ${p + (1 - 2 * p) * 0.66} 0, ${1 - p} ${p}`,
    `C 1 ${p + (1 - 2 * p) * 0.33}, 1 ${p + (1 - 2 * p) * 0.66}, ${1 - p} ${1 - p}`,
    `C ${p + (1 - 2 * p) * 0.66} 1, ${p + (1 - 2 * p) * 0.33} 1, ${p} ${1 - p}`,
    `C 0 ${p + (1 - 2 * p) * 0.66}, 0 ${p + (1 - 2 * p) * 0.33}, ${p} ${p}`,
    `Z`,
  ].join(" ");

  // SVG viewBox path (skala 0 - 100) dla obramowania i efektów
  const svgPath = [
    `M ${b} ${b}`,
    `C ${b + (100 - 2 * b) * 0.33} 0, ${b + (100 - 2 * b) * 0.66} 0, ${100 - b} ${b}`,
    `C 100 ${b + (100 - 2 * b) * 0.33}, 100 ${b + (100 - 2 * b) * 0.66}, ${100 - b} ${100 - b}`,
    `C ${b + (100 - 2 * b) * 0.66} 100, ${b + (100 - 2 * b) * 0.33} 100, ${b} ${100 - b}`,
    `C 0 ${b + (100 - 2 * b) * 0.66}, 0 ${b + (100 - 2 * b) * 0.33}, ${b} ${b}`,
    `Z`,
  ].join(" ");

  const inset = 1.8;
  const bi = b + inset;
  const innerPath = [
    `M ${bi} ${bi}`,
    `C ${bi + (100 - 2 * bi) * 0.33} ${inset}, ${bi + (100 - 2 * bi) * 0.66} ${inset}, ${100 - bi} ${bi}`,
    `C ${100 - inset} ${bi + (100 - 2 * bi) * 0.33}, ${100 - inset} ${bi + (100 - 2 * bi) * 0.66}, ${100 - bi} ${100 - bi}`,
    `C ${bi + (100 - 2 * bi) * 0.66} ${100 - inset}, ${bi + (100 - 2 * bi) * 0.33} ${100 - inset}, ${bi} ${100 - bi}`,
    `C ${inset} ${bi + (100 - 2 * bi) * 0.66}, ${inset} ${bi + (100 - 2 * bi) * 0.33}, ${bi} ${bi}`,
    `Z`,
  ].join(" ");

  const extend = `${b}%`;

  return (
    <div className={`relative ${className}`}>
      {/* Ukryte SVG z clipPath skalowanym proporcjonalnie do elementu */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={clipPath} />
          </clipPath>
        </defs>
      </svg>

      {/* Kontener zawartości */}
      <div
        className="absolute"
        style={{
          top: `-${extend}`,
          left: `-${extend}`,
          right: `-${extend}`,
          bottom: `-${extend}`,
          clipPath: `url(#${clipId})`,
        }}
      >
        <div className="w-full h-full">{children}</div>
      </div>

      {/* Nakładka SVG: linie skanowania, winieta i ramki */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: `-${extend}`,
          left: `-${extend}`,
          right: `-${extend}`,
          bottom: `-${extend}`,
          width: `calc(100% + ${b * 2}%)`,
          height: `calc(100% + ${b * 2}%)`,
          overflow: "visible",
          zIndex: 2,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id={scanId} width="100" height="0.8" patternUnits="userSpaceOnUse">
            <rect width="100" height="0.35" fill="black" opacity="0.12" />
          </pattern>
          <radialGradient id={vigId} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" stopOpacity="0.45" />
          </radialGradient>
        </defs>
        <path d={svgPath} fill={`url(#${scanId})`} />
        <path d={svgPath} fill={`url(#${vigId})`} />
        <path
          d={svgPath}
          fill="none"
          stroke="#86efac"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        <path
          d={innerPath}
          fill="none"
          stroke="#86efac"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      </svg>

      {/* Zielona poświata CRT */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "0 0 25px rgba(134, 239, 172, 0.15), 0 4px 20px rgba(0,0,0,0.3)",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default CrtFrame;