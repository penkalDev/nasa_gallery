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
  const p = b / 100;

  // Poprawiona ścieżka klipowania dopasowana do kontenera 100%
  const clipPath = [
    `M ${b}% ${b}%`,
    `C ${b + (100 - 2 * b) * 0.33}% 0%, ${b + (100 - 2 * b) * 0.66}% 0%, ${100 - b}% ${b}%`,
    `C 100% ${b + (100 - 2 * b) * 0.33}%, 100% ${b + (100 - 2 * b) * 0.66}%, ${100 - b}% ${100 - b}%`,
    `C ${b + (100 - 2 * b) * 0.66}% 100%, ${b + (100 - 2 * b) * 0.33}% 100%, ${b}% ${100 - b}%`,
    `C 0% ${b + (100 - 2 * b) * 0.66}%, 0% ${b + (100 - 2 * b) * 0.33}%, ${b}% ${b}%`,
    `Z`,
  ].join(" ");

  // SVG viewBox path (0–100 range) dla obramowania
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

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* SVG clipPath definition */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          {/* Używamy clipPathUnits="userSpaceOnUse" znormalizowanego do skali 0-100% */}
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={`M ${b} ${b} C ${b + (100 - 2 * b) * 0.33} 0, ${b + (100 - 2 * b) * 0.66} 0, ${100 - b} ${b} C 100 ${b + (100 - 2 * b) * 0.33}, 100 ${b + (100 - 2 * b) * 0.66}, ${100 - b} ${100 - b} C ${b + (100 - 2 * b) * 0.66} 100, ${b + (100 - 2 * b) * 0.33} 100, ${b} ${100 - b} C 0 ${b + (100 - 2 * b) * 0.66}, 0 ${b + (100 - 2 * b) * 0.33}, ${b} ${b} Z`} />
          </clipPath>
        </defs>
      </svg>

      {/* Kontener zawartości dopasowany idealnie do ramki */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `url(#${clipId})`,
        }}
      >
        <div className="w-full h-full">{children}</div>
      </div>

      {/* Nakładka SVG: linie skanowania, winieta i ramki */}
      <svg
        className="absolute inset-0 pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ zIndex: 2 }}
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
        {/* Scanlines */}
        <path d={svgPath} fill={`url(#${scanId})`} />
        {/* Vignette */}
        <path d={svgPath} fill={`url(#${vigId})`} />
        {/* Outer border */}
        <path
          d={svgPath}
          fill="none"
          stroke="#86efac"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        {/* Inner border */}
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