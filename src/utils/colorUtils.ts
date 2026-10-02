import { WCAGResult } from '../types';

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const calculateContrast = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
};

export const getWCAGStatus = (ratio: number): WCAGResult => {
  return {
    score: parseFloat(ratio.toFixed(2)),
    levelAA: ratio >= 4.5,
    levelAAA: ratio >= 7,
    levelAALarge: ratio >= 3,
    levelAAALarge: ratio >= 4.5,
  };
};

export const getRandomHex = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Convert RGB to HSL to detect emotion / color family
export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const rgb = hexToRgb(hex);
  if (!rgb) return { h: 0, s: 0, l: 0 };
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

export const getColorPsychology = (hex: string): { name: string; emotions: string[] } => {
  const { h, s, l } = hexToHsl(hex);

  if (s < 12) {
    if (l > 80) return { name: "Blanc / Clar Pastís", emotions: ["Minimalisme", "Neteja", "Puresa", "Pau"] };
    if (l < 20) return { name: "Negre / Fosc Profund", emotions: ["Elegància", "Luxe", "Misteri", "Poder"] };
    return { name: "Gris Neutral", emotions: ["Equilibri", "Neutralitat", "Seriositat", "Modèstia"] };
  }

  if (h >= 345 || h < 15) return { name: "Vermell", emotions: ["Energia", "Passió", "Urgència", "Cridaner"] };
  if (h >= 15 && h < 45) return { name: "Taronja", emotions: ["Optimisme", "Creativitat", "Calidesa", "Divertiment"] };
  if (h >= 45 && h < 65) return { name: "Groc", emotions: ["Llum", "Alegria", "Atenció", "Joventut"] };
  if (h >= 65 && h < 165) return { name: "Verd", emotions: ["Natura", "Salut", "Frescor", "Sostenibilitat"] };
  if (h >= 165 && h < 260) return { name: "Blau / Cian", emotions: ["Confiança", "Tecnologia", "Seguretat", "Calma"] };
  if (h >= 260 && h < 315) return { name: "Lila / Púrpura", emotions: ["Luxe", "Magia", "Imaginació", "Exclusivitat"] };
  return { name: "Rosa / Magenta", emotions: ["Romantisme", "Delicadesa", "Empatia", "Dolçor"] };
};
