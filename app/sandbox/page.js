"use client"
import style from './sandbox.module.css';
import React, { useState, useRef, useEffect } from 'react';

var lines = [];

var context;

var offCanvas = new OffscreenCanvas(innerWidth, innerHeight);

var offCtx = offCanvas.getContext("2d");

//Mouse X and Y are relative to the canvas
var mouse = {
  x: 0,
  y: 0,
  isDown: false,
  currentDraw: []
}

export default function SandboxMode() {
  var canvasRef = useRef(null);

  var [canvasW, setCanvasW] = useState(innerWidth);
  var [canvasH, setCanvasH] = useState(innerHeight * 0.8);

  var [updateCount, setUpdateCount] = useState(0);

  function drawCanvas() {
    offCtx.clearRect(0, 0, canvasW, canvasH);
    lines.forEach((line) => {
      offCtx.strokeStyle = "white";
      offCtx.beginPath();
      offCtx.moveTo(line[0], line[1]);
      offCtx.lineTo(line[2], line[3]);
      offCtx.stroke();
    });
    offCtx.strokeStyle = "white";
    offCtx.beginPath();
    offCtx.moveTo(mouse.currentDraw[0], mouse.currentDraw[1]);
    offCtx.lineTo(mouse.currentDraw[2], mouse.currentDraw[3]);
    offCtx.stroke();
    const bitmapOff = offCanvas.transferToImageBitmap();
    context.transferFromImageBitmap(bitmapOff);
    if (updateCount + 1 <= 100) {
      setUpdateCount(updateCount + 1);
    } else {
      setUpdateCount(0);
    }
  }

  document.addEventListener("mousedown", () => {
    mouse.isDown = true;
    mouse.currentDraw.push(mouse.x, mouse.y, mouse.x, mouse.y);
  });

  document.addEventListener("mouseup", () => {
    mouse.isDown = false;
    lines.push(mouse.currentDraw);
    mouse.currentDraw = [];
  });

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY - innerHeight * .2;
    if (mouse.isDown) {
      mouse.currentDraw[2] = mouse.x;
      mouse.currentDraw[3] = mouse.y;
      drawCanvas();
    }
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("bitmaprenderer");
      context = ctx;
      context.lineWidth = 10;
    }
  });

  addEventListener("resize", () => {
    offCanvas.width = innerWidth;
    offCanvas.height = innerHeight;
    setCanvasW(innerWidth);
    setCanvasH(innerHeight);
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
