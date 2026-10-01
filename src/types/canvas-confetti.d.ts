declare module "canvas-confetti" {
  const confetti: (options?: {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    rotationAngle?: number;
    spinPos?: number;
    origin?: { x?: number; y?: number };
    zIndex?: number;
    colors?: string[];
    ellipses?: boolean;
    initial?: string;
    disableForReducedMotion?: boolean;
    staggerLength?: number;
    staggerMultiplier?: number;
    clock?: any;
    ticks?: number;
    trail?: number;
    reset?: boolean;
    resetVelocity?: boolean;
    useShadows?: boolean;
    useIndividualPiñata?: boolean;
    particleRange?: string;
    spreadMult?: number;
    propColors?: string[];
    scalarMultiplier?: number;
    shapes?: string[];
    confettiRadius?: number;
    confettiNumber?: number;
  }) => void;
  export default confetti;
}
