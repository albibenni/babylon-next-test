"use client";
import { useEffect, useRef } from "react";
import { viewer } from "../components/babylon-viewer";

export default function Home() {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (!canvas) return;
    viewer(canvas);
  }, []);
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <canvas className="w-full h-full" id="babylon-canvas" ref={reactCanvas} />
    </main>
  );
}
