import { HistoryDataContext } from "@providers/history";
import { useContext, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

const ChartCanvas = styled.canvas`
  width: 100%;
  min-height: 120px;
  height: 20vh;
  border-radius: 8px;
`;

type ChartColours = {
  background: React.CSSProperties['background'];
  axis: React.CSSProperties['color'];
  data: React.CSSProperties['color'][];
}

type Rectangle = {
  x: number;
  y: number;
  w: number;
  h: number;
}

const fitCanvasToContainer = (ctx: any, cnv: HTMLCanvasElement) => {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const rect = cnv.getBoundingClientRect();
  cnv.width = Math.round(rect.width * dpr);
  cnv.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

const roundedRectPath = (x: number, y: number, w: number, h: number, r: number) => {
  const p = new Path2D();
  p.moveTo(x + r, y);
  p.arcTo(x + w, y, x + w, y + h, r);
  p.arcTo(x + w, y + h, x, y + h, r);
  p.arcTo(x, y + h, x, y, r);
  p.arcTo(x, y, x + w, y, r);
  p.closePath();
  return p;
}

const plotLine = (ctx: any, inner: Rectangle, values: number[], color: React.CSSProperties['color']) => {
  const n = values.length;
  const dx = inner.w / (n - 1);
  const min = 0, max = 100; // normalized range
  const y = (v: number) => inner.y + inner.h - (v - min) / (max - min) * inner.h;

  ctx.beginPath();
  let started = false;
  for (let i = 0; i < n; i++) {
    if (!values[i]) {
      continue;
    }
    const px = inner.x + i * dx;
    const py = y(values[i]);
    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 2.5; // slight softness like the reference
  ctx.stroke();
  ctx.shadowBlur = 0; // reset
}

const draw = (ctx: any, cnv: HTMLCanvasElement, data: number[][], colours: ChartColours) => {
  fitCanvasToContainer(ctx, cnv);
  const { width: Wcss, height: Hcss } = cnv.getBoundingClientRect();
  const W = Wcss; const H = Hcss; // because we transform with DPR already

  // Layout paddings
  const pad = 40;
  const inner = { x: pad, y: pad, w: W - pad*2, h: H - pad*2 };

  // Draw rounded background
  ctx.save();
  const clip = roundedRectPath(0, 0, W, H, 10);
  ctx.clip(clip);
  ctx.fillStyle = colours.background;
  ctx.fillRect(0, 0, W, H);

  // Bottom baseline
  ctx.beginPath();
  ctx.moveTo(0, H - 26);
  ctx.lineTo(W, H - 26);
  ctx.lineWidth = 3;
  ctx.strokeStyle = colours.axis;
  ctx.stroke();

  for(let i = 0; i < data.length; i++) {
    plotLine(ctx, inner, data[i], colours.data[i] ?? colours.axis);
  }

  ctx.restore();
}

export const HistoryChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { chartData } = useContext(HistoryDataContext);
  const theme = useTheme();

  const colours: ChartColours = {
    background: theme.background,
    axis: theme.colour,
    data: [
      '#ff6a52',
      '#2ec4d4'
    ]
  };

  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const redData = chartData.map((d) => d.totalMinutes ?? 0);
    const tealData = chartData.map((d) => d.totalRoll ?? 0);

    draw(ctx, canvas, [redData, tealData], colours);
  }, [chartData]);

  return (
    <ChartCanvas ref={chartRef} />
  )
}