"use client"
import style from './sandbox.module.css';
import React, {useState, useRef, useEffect} from 'react';

export default function SandboxMode() {
  var [canvasW, setCanvasW] = useState(window.innerWidth);
  var [canvasH, setCanvasH] = useState(window.innerHeight * 0.8);

  //Note: Only changes these 2 states when mouse x and y are needed to avoid rerendering too much
  var [mouseX, setMouseX] = useState(0);
  var [mouseY, setMouseY] = useState(0);

  var canvasRef = useRef(null);
  var [context, setContext] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
      
    }
  });

  window.addEventListener("resize", () => {
    setCanvasW(window.innerWidth);
    setCanvasH(window.innerHeight);
  });

  return (
    <div className={style.outerContainer}>
      <title>Sandbox Mode</title>
      <div className={style.titleContainer}>
        <h1 className={style.title}>Test Circuit</h1>
      </div>
      <div className={style.toolbar}></div>
      <canvas width={canvasW} height={canvasH} className={style.canvas} ref={canvasRef}></canvas>
    </div>
  );
}
