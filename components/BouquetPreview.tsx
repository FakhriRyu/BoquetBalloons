import React, { useId } from "react";
import type { ColorOption, FlowerType } from "@/data/builder";

function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (amt < 0 ? c * amt : (255 - c) * amt))));
  const r = f((n >> 16) & 255);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

interface Props {
  type: FlowerType;
  qty: number;
  petal: ColorOption;
  stem: ColorOption;
  ribbon: ColorOption;
}

const CX = 150;
const BY = 262; // bundle point

function Head({ type, petal, stem, r, gid }: { type: FlowerType; petal: ColorOption; stem: ColorOption; r: number; gid: string }) {
  const lobes = [0, 1, 2, 3, 4];
  const dark = shade(petal.hex, -0.16);
  return (
    <g>
      {lobes.map((i) => {
        const a = (i * 72 - 90) * (Math.PI / 180);
        const x = Math.cos(a) * r * 0.62;
        const y = Math.sin(a) * r * 0.62;
        return (
          <g key={i} style={{ transition: "all .3s" }}>
            <circle cx={x} cy={y} r={r * 0.62} fill={petal.hex} stroke={dark} strokeWidth={1.2} />
            {type.id === "curly" && (
              <path
                d={`M${x - r * 0.28} ${y - r * 0.05} q${r * 0.28} ${r * 0.42} ${r * 0.56} 0`}
                fill="none"
                stroke={dark}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            )}
            {type.id === "simple" && (
              <path d={`M${x * 0.25} ${y * 0.25} L${x * 0.85} ${y * 0.85}`} stroke={dark} strokeWidth={1.8} strokeLinecap="round" opacity={0.7} />
            )}
            {type.chrome && <circle cx={x} cy={y} r={r * 0.62} fill={`url(#${gid})`} />}
            <ellipse cx={x - r * 0.18} cy={y - r * 0.22} rx={r * 0.17} ry={r * 0.1} fill="#fff" opacity={type.chrome ? 0.85 : 0.5} transform={`rotate(-30 ${x} ${y})`} />
          </g>
        );
      })}
      <circle r={r * 0.3} fill={shade(stem.hex, 0.05)} stroke={shade(stem.hex, -0.2)} strokeWidth={1.2} />
      <ellipse cx={-r * 0.07} cy={-r * 0.09} rx={r * 0.08} ry={r * 0.05} fill="#fff" opacity={0.7} />
    </g>
  );
}

function Bow({ color }: { color: string }) {
  const s = 1.4;
  const dark = shade(color, -0.18);
  const loop = (rot: number) => (
    <g transform={`rotate(${rot})`}>
      <ellipse cx={-26} cy={0} rx={24} ry={12} fill="none" stroke={dark} strokeWidth={13} />
      <ellipse cx={-26} cy={0} rx={24} ry={12} fill="none" stroke={color} strokeWidth={9} />
    </g>
  );
  return (
    <g transform={`translate(${CX} ${BY}) scale(${s})`} style={{ transition: "transform .3s" }}>
      <g transform="scale(-1 1)">{loop(18)}</g>
      {loop(18)}
      <g transform="rotate(30)"><rect x={-6} y={4} width={12} height={44} rx={6} fill={color} stroke={dark} strokeWidth={1.5} /></g>
      <g transform="rotate(-30)"><rect x={-6} y={4} width={12} height={44} rx={6} fill={color} stroke={dark} strokeWidth={1.5} /></g>
      <circle r={9} fill={color} stroke={dark} strokeWidth={1.5} />
      <ellipse cx={-3} cy={-3} rx={3} ry={2} fill="#fff" opacity={0.6} />
    </g>
  );
}

export default function BouquetPreview({ type, qty, petal, stem, ribbon }: Props) {
  const gid = `chrome${useId().replace(/:/g, "")}`;
  const spread = Math.min(36, qty === 1 ? 0 : 7 + qty * 2.6);
  const r = Math.max(17, 31 - qty * 1.2);
  const items = Array.from({ length: qty }, (_, i) => {
    const t = qty === 1 ? 0.5 : i / (qty - 1);
    const ang = ((t - 0.5) * 2 * spread * Math.PI) / 180;
    const len = 118 + (i % 2) * 18 + (1 - Math.abs(t - 0.5) * 2) * 10;
    return { ang, hx: CX + Math.sin(ang) * len, hy: BY - Math.cos(ang) * len };
  });
  const stemDark = shade(stem.hex, -0.2);

  return (
    <svg viewBox="0 0 300 380" role="img" aria-label={`Pratinjau ${qty} tangkai ${type.name}`} className="h-full w-full">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      {/* tails + stems: outline & fill drawn per stem so each stem stays distinct when overlapping */}
      {items.map((it, i) => {
        const tx = CX - Math.sin(it.ang) * 55;
        const ty = BY + Math.cos(it.ang) * 95;
        return (
          <g key={`st${i}`} style={{ transition: "stroke .3s" }}>
            <line x1={CX} y1={BY} x2={tx} y2={ty} stroke={stemDark} strokeWidth={15} strokeLinecap="round" />
            <line x1={CX} y1={BY} x2={tx} y2={ty} stroke={stem.hex} strokeWidth={13} strokeLinecap="round" style={{ transition: "stroke .3s" }} />
            <line x1={CX} y1={BY} x2={it.hx} y2={it.hy} stroke={stemDark} strokeWidth={15} strokeLinecap="round" />
            <line x1={CX} y1={BY} x2={it.hx} y2={it.hy} stroke={stem.hex} strokeWidth={13} strokeLinecap="round" style={{ transition: "stroke .3s" }} />
          </g>
        );
      })}
      {/* heads: outer first, centre on top */}
      {[...items.keys()]
        .sort((a, b) => Math.abs(b - (qty - 1) / 2) - Math.abs(a - (qty - 1) / 2))
        .map((i) => (
          <g key={`h${i}`} transform={`translate(${items[i].hx} ${items[i].hy})`}>
            <Head type={type} petal={petal} stem={stem} r={r} gid={gid} />
          </g>
        ))}
      <Bow color={ribbon.hex} />
    </svg>
  );
}
