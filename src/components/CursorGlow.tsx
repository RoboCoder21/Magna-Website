import { useEffect, useRef } from "react";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { innerWidth, innerHeight } = window;
    targetRef.current = { x: innerWidth / 2, y: innerHeight / 2 };
    currentRef.current = { x: innerWidth / 2, y: innerHeight / 2 };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      const point = "touches" in event ? event.touches[0] : event;
      if (!point) return;
      targetRef.current = { x: point.clientX, y: point.clientY };
    };

    const animate = () => {
      const glow = glowRef.current;
      if (!glow) return;

      const { x, y } = currentRef.current;
      const { x: tx, y: ty } = targetRef.current;
      const lerp = prefersReducedMotion ? 1 : 0.18;
      const nextX = x + (tx - x) * lerp;
      const nextY = y + (ty - y) * lerp;
      currentRef.current = { x: nextX, y: nextY };

      glow.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleMove, { passive: true });

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative flex h-8 w-8 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-yellow-400/80 bg-yellow-400/6 blur-[0.4px]" />
          <div className="absolute inset-[6px] rounded-full border border-yellow-300/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.9)]" />
        </div>
      </div>
    </div>
  );
};

export default CursorGlow;
