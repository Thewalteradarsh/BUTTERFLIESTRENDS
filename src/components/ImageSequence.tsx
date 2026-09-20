"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ImageSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const frameCount = 84;
  const currentFrameIndex = useRef(0);
  
  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const frames: HTMLImageElement[] = [];
    
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Pad with 3 digits e.g., 001
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/Cotton_fabric_unfolding_and_ripp_20260916170032_frames/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      // Handle error so one broken image doesn't halt the whole loading sequence forever
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      }
      frames.push(img);
    }
    framesRef.current = frames;
  }, []);

  // Function to draw frame to canvas with object-fit: cover logic
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[index];
    
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas dimensions to match display size
    const { width, height } = canvas.getBoundingClientRect();
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // Calculate cover dimensions
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    
    let sWidth = img.naturalWidth;
    let sHeight = img.naturalHeight;
    let sx = 0;
    let sy = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas ratio, crop sides
      sWidth = sHeight * canvasRatio;
      sx = (img.naturalWidth - sWidth) / 2;
    } else {
      // Image is taller than canvas ratio, crop top/bottom
      sHeight = sWidth / canvasRatio;
      sy = (img.naturalHeight - sHeight) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
  };

  // Draw first frame when loaded or on resize
  useEffect(() => {
    if (loaded) {
      // Small delay to ensure canvas is properly sized by CSS before drawing
      setTimeout(() => drawFrame(currentFrameIndex.current), 50);
      
      const handleResize = () => drawFrame(currentFrameIndex.current);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [loaded]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    
    // Map progress 0-1 to frame index 0 to frameCount-1
    const frameIndex = Math.min(
      frameCount - 1,
      Math.max(0, Math.floor(latest * frameCount))
    );
    
    if (frameIndex !== currentFrameIndex.current) {
      currentFrameIndex.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  return (
    <div ref={containerRef} className="h-[200vh] md:h-[300vh] w-full relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FDFBF7]">
        {/* Only show canvas when loaded, otherwise show a bright background */}
        <canvas 
          ref={canvasRef} 
          className={`w-full h-full block transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Subtle bright overlay */}
        <div className="absolute inset-0 bg-[#FDFBF7]/30 pointer-events-none z-0" />
      </div>
    </div>
  );
}
