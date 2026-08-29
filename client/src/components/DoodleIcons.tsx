import React from "react";

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

/**
 * DoodleV60 - Hand-drawn Japanese V60 coffee dripper with server carafe
 */
export function DoodleV60({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Dripper Cone */}
      <path d="M10 12 L38 12 L28 26 L20 26 Z" />
      {/* Dripper Base plate */}
      <path d="M14 26 C14 26 8 27 8 29 C8 31 16 31 24 31 C32 31 40 31 40 29 C40 27 34 26 34 26" />
      {/* V60 ridges inside cone */}
      <path d="M17 14 Q 21 19 23 25" strokeWidth="1.6" strokeDasharray="1 2" />
      <path d="M31 14 Q 27 19 25 25" strokeWidth="1.6" strokeDasharray="1 2" />
      {/* Filter paper rim */}
      <path d="M12 12 Q 24 9 36 12" />
      {/* Server Carafe */}
      <path d="M16 31 L13 41 C13 43 15 44 19 44 L29 44 C33 44 35 43 35 41 L32 31" />
      {/* Coffee level in carafe */}
      <path d="M15 39 Q 24 41 33 39" strokeWidth="1.8" />
      {/* Carafe handle */}
      <path d="M34 33 C39 34 40 39 33 42" />
      {/* Steam spirals */}
      <path d="M21 5 C20 7 22 8 21 10" strokeWidth="1.8" />
      <path d="M27 3 C26 5 28 7 27 9" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * DoodleKettle - Hand-drawn gooseneck pouring kettle
 */
export function DoodleKettle({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Kettle Body */}
      <path d="M14 20 L34 20 L37 39 C37 42 35 43 31 43 L17 43 C13 43 11 42 11 39 Z" />
      {/* Lid & Knob */}
      <path d="M18 20 C18 16 30 16 30 20" />
      <circle cx="24" cy="14" r="2" fill="currentColor" />
      {/* Gooseneck Spout */}
      <path d="M12 36 C5 34 4 18 11 14 C12 13 13 14 13 15 C8 19 8 30 13 32" />
      {/* Water stream drop */}
      <path d="M12 14 Q 10 18 10 22" strokeWidth="1.8" strokeDasharray="2 3" />
      {/* Handle */}
      <path d="M34 22 C42 22 44 32 36 38" />
      {/* Steam puffs */}
      <path d="M9 9 C9 7 11 6 13 8" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * DoodleCoffeeBean - Hand-drawn pair of coffee beans
 */
export function DoodleCoffeeBean({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Primary Bean */}
      <g transform="rotate(-20 22 24)">
        <path d="M22 10 C30 10 34 16 34 24 C34 32 30 38 22 38 C14 38 10 32 10 24 C10 16 14 10 22 10 Z" />
        <path d="M22 12 C25 18 19 24 22 36" strokeWidth="2" />
      </g>
      {/* Secondary Bean */}
      <g transform="rotate(35 34 32) scale(0.65)">
        <path d="M34 14 C40 14 44 19 44 26 C44 33 40 38 34 38 C28 38 24 33 24 26 C24 19 28 14 34 14 Z" />
        <path d="M34 16 C37 21 31 27 34 36" strokeWidth="2.2" />
      </g>
      {/* Aroma spark lines */}
      <path d="M38 10 L41 7" strokeWidth="1.8" />
      <path d="M42 16 L45 15" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * DoodleCoffeeCup - Hand-drawn artisanal mug with steam hearts
 */
export function DoodleCoffeeCup({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Mug Body */}
      <path d="M10 18 L12 37 C13 41 16 43 23 43 L25 43 C32 43 35 41 36 37 L38 18 Z" />
      {/* Saucer / Plate */}
      <path d="M6 43 C12 46 36 46 42 43" strokeWidth="2.4" />
      {/* Handle */}
      <path d="M37 21 C43 21 44 32 36 34" />
      {/* Coffee surface */}
      <ellipse cx="24" cy="18" rx="14" ry="3" />
      {/* Steam lines */}
      <path d="M18 13 C17 10 20 8 19 5" strokeWidth="1.8" />
      <path d="M24 12 C23 9 26 7 24 4" strokeWidth="1.8" />
      <path d="M30 13 C29 10 32 8 30 5" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * DoodleCitrus - Bright citrus / acidity doodle
 */
export function DoodleCitrus({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Citrus slice wedge */}
      <path d="M8 24 C8 34 16 42 26 42 C36 42 42 34 42 24 C42 23 41 22 40 22 L8 22 C7 22 8 23 8 24 Z" />
      {/* Inner segments */}
      <path d="M25 25 L14 36" strokeWidth="1.6" />
      <path d="M25 25 L25 40" strokeWidth="1.6" />
      <path d="M25 25 L36 36" strokeWidth="1.6" />
      {/* Sparkles / zest dots */}
      <path d="M24 8 L24 14" strokeWidth="2" />
      <path d="M14 12 L18 16" strokeWidth="2" />
      <path d="M34 12 L30 16" strokeWidth="2" />
    </svg>
  );
}

/**
 * DoodleScale - Hand-drawn balance scales for balanced profile
 */
export function DoodleScale({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Central Pillar */}
      <path d="M24 8 L24 40" />
      <path d="M16 42 L32 42" strokeWidth="2.5" />
      <circle cx="24" cy="8" r="2.5" />
      {/* Cross Beam */}
      <path d="M8 15 L40 15" strokeWidth="2.4" />
      {/* Left Pan */}
      <path d="M8 15 L5 27" strokeWidth="1.5" />
      <path d="M8 15 L11 27" strokeWidth="1.5" />
      <path d="M3 27 Q 8 32 13 27 Z" />
      {/* Right Pan */}
      <path d="M40 15 L37 27" strokeWidth="1.5" />
      <path d="M40 15 L43 27" strokeWidth="1.5" />
      <path d="M35 27 Q 40 32 45 27 Z" />
    </svg>
  );
}

/**
 * DoodleSweetness - Heart & honey swirl for sweet profile
 */
export function DoodleSweetness({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Heart */}
      <path d="M24 15 C20 8 10 9 10 18 C10 27 21 34 24 38 C27 34 38 27 38 18 C38 9 28 8 24 15 Z" />
      {/* Sweetness drop in center */}
      <path d="M24 20 C22 23 21 25 21 27 C21 29 22.5 30.5 24 30.5 C25.5 30.5 27 29 27 27 C27 25 26 23 24 20 Z" fill="currentColor" fillOpacity="0.2" />
      {/* Cute twinkle stars */}
      <path d="M39 9 L41 12 L44 12 L42 14 L43 17 L40 15 L37 17 L38 14 L36 12 L39 12 Z" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * DoodleFeather - Hand-drawn soft feather / leaf for soft intensity
 */
export function DoodleFeather({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Central quill spine */}
      <path d="M10 40 Q 22 26 38 8" />
      {/* Feather vanes */}
      <path d="M38 8 C30 10 22 17 19 26 C23 25 28 22 34 14" />
      <path d="M38 8 C34 16 28 26 13 36 C18 31 24 28 29 22" />
      {/* Gentle wind swirls */}
      <path d="M7 22 Q 13 18 16 21" strokeWidth="1.6" />
      <path d="M28 36 Q 34 33 37 36" strokeWidth="1.6" />
    </svg>
  );
}

/**
 * DoodleGauge - Dial / gauge doodle for medium intensity
 */
export function DoodleGauge({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Gauge Arc */}
      <path d="M10 34 A 18 18 0 1 1 38 34" />
      <circle cx="24" cy="30" r="3" fill="currentColor" />
      {/* Needle pointing to balanced middle */}
      <path d="M24 30 L24 16" strokeWidth="2.5" />
      {/* Tick Marks */}
      <path d="M12 28 L15 27" strokeWidth="1.8" />
      <path d="M16 19 L18 21" strokeWidth="1.8" />
      <path d="M24 12 L24 14" strokeWidth="1.8" />
      <path d="M32 19 L30 21" strokeWidth="1.8" />
      <path d="M36 28 L33 27" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * DoodleFlame - Hand-drawn bold fire flame for strong intensity
 */
export function DoodleFlame({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer Flame */}
      <path d="M24 6 C28 14 36 18 36 28 C36 36 30 42 24 42 C18 42 12 36 12 28 C12 21 17 18 20 15 C21 21 26 21 24 6 Z" />
      {/* Inner Flame core */}
      <path d="M24 24 C27 28 29 30 29 34 C29 37 27 39 24 39 C21 39 19 37 19 34 C19 31 22 29 24 24 Z" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
      {/* Heat sparks */}
      <path d="M38 16 L40 13" strokeWidth="1.8" />
      <path d="M9 19 L7 16" strokeWidth="1.8" />
    </svg>
  );
}

/**
 * DoodleTimerClock - Hand-drawn stopwatch for recipe timing
 */
export function DoodleTimerClock({ size = 24, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Clock body */}
      <circle cx="24" cy="27" r="16" />
      {/* Top pusher button */}
      <path d="M24 11 L24 7" strokeWidth="2.5" />
      <path d="M20 7 L28 7" strokeWidth="2.5" />
      {/* Side stopwatch pusher */}
      <path d="M36 15 L39 12" strokeWidth="2.5" />
      {/* Clock hands */}
      <path d="M24 27 L24 18" strokeWidth="2.2" />
      <path d="M24 27 L31 27" strokeWidth="2.2" />
      <circle cx="24" cy="27" r="2" fill="currentColor" />
      {/* Movement tick marks */}
      <path d="M8 17 Q 6 19 6 22" strokeWidth="1.6" strokeDasharray="1 2" />
    </svg>
  );
}

/**
 * DoodleStamp - Japanese aesthetic stamp / seal
 */
export function DoodleStamp({ size = 28, className = "", ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Square stamp border with rounded organic corners */}
      <rect x="6" y="6" width="36" height="36" rx="6" strokeWidth="2.4" />
      {/* 4:6 Ratio symbol inside */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="bold"
        fontFamily="sans-serif"
        fill="currentColor"
        stroke="none"
      >
        4:6
      </text>
    </svg>
  );
}
