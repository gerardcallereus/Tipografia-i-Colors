import React, { useState } from 'react';
import { calculateContrast, getWCAGStatus, getRandomHex, getColorPsychology } from '../utils/colorUtils';
import { RefreshCw, CheckCircle, AlertCircle, Sparkles, Sliders, ArrowRight, BookOpen, Info } from 'lucide-react';

interface ContrastPlaygroundProps {
  onGoToFontLab?: () => void;
}

export const ContrastPlayground: React.FC<ContrastPlaygroundProps> = ({ onGoToFontLab }) => {
  const [bg, setBg] = useState('#f8fafc');
  const [fg, setFg] = useState('#1e293b');
  const [sampleText, setSampleText] = useState('La llegibilitat és essencial per a una bona experiència.');

  const contrastRatio = calculateContrast(bg, fg);
  const wcag = getWCAGStatus(contrastRatio);
  const bgPsych = getColorPsychology(bg);
  const fgPsych = getColorPsychology(fg);

  const randomize = () => {
    setBg(getRandomHex());
    setFg(getRandomHex());
  };

  const swap = () => {
    const temp = bg;
    setBg(fg);
    setFg(temp);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-bold shadow-sm">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>Eina 1 — Selector i Calculadora WCAG</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Laboratori de Contrast i Accessibilitat
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Selecciona o introdueix dos codis HEX per analitzar immediatament el ràtio de contrast segons l'estàndard WCAG 2.1.
        </p>
      </div>

      {/* EDUCATIONAL GUIDE BEFORE SIMULATOR */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Guia d'Ús de la Calculadora de Contrast</h3>
            <p className="text-xs text-slate-500 font-medium">Com interpretar els valors WCAG 2.1 mentre experimentes</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-indigo-900 block">1. Selecciona Fons i Text</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Utilitza els selectors de color o escriu codis hexadecimal (ex. `#FFFFFF`, `#1E293B`).
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-indigo-900 block">2. Comprova la Nota WCAG</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              El ràtio varia d'**1:1** (mateix color, il·legible) a **21:1** (blanc sobre negre). Cal com a mínim **4.5:1 (AA)**.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-indigo-900 block">3. Prova l'Intercanvi i Aleatoris</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Prem '⇄ Invertir' o 'Aleatoris' per descobrir combinacions d'alt contrast per als teus botons i targetes.
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Color Inputs Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Selecció de Colors</h3>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Color de Fons (Background)
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={bg} 
                  onChange={(e) => setBg(e.target.value)}
                  className="h-12 w-14 rounded-xl cursor-pointer border-none bg-transparent"
                />
                <input 
                  type="text" 
                  value={bg} 
                  onChange={(e) => setBg(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase text-slate-900 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                {bgPsych.name} — {bgPsych.emotions.join(', ')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Color de Text (Foreground)
              </label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={fg} 
                  onChange={(e) => setFg(e.target.value)}
                  className="h-12 w-14 rounded-xl cursor-pointer border-none bg-transparent"
                />
                <input 
                  type="text" 
                  value={fg} 
                  onChange={(e) => setFg(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase text-slate-900 text-sm font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block font-medium">
                {fgPsych.name} — {fgPsych.emotions.join(', ')}
              </span>
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                onClick={randomize}
                className="flex-1 flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold text-xs transition-colors border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Aleatoris
              </button>

              <button 
                onClick={swap}
                className="flex-1 flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl font-bold text-xs transition-colors border border-slate-200"
              >
                ⇄ Invertir
              </button>
            </div>
          </div>

          {/* WCAG Compliance Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Ràtio Calculat</span>
                <h4 className="text-3xl font-extrabold text-indigo-600">{contrastRatio}:1</h4>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                  wcag.levelAAA ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  wcag.levelAA ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {wcag.levelAAA ? 'Nivell AAA (Excel·lent)' : wcag.levelAA ? 'Nivell AA (Complert)' : 'Insuficient (FAIL)'}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <ScoreRow label="WCAG AA Normal (Mínim 4.5:1)" pass={wcag.levelAA} />
              <ScoreRow label="WCAG AAA Normal (Mínim 7:1)" pass={wcag.levelAAA} />
              <ScoreRow label="WCAG AA Text Gran (Mínim 3:1)" pass={wcag.levelAALarge} />
              <ScoreRow label="WCAG AAA Text Gran (Mínim 4.5:1)" pass={wcag.levelAAALarge} />
            </div>
          </div>

        </div>

        {/* Live Preview Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Previsualització del Component</span>
            <input 
              type="text" 
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Canvia el text de prova..."
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 outline-none focus:border-indigo-500 w-64 shadow-sm"
            />
          </div>

          <div 
            className="min-h-[380px] rounded-3xl shadow-xl p-8 sm:p-12 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden border border-slate-200"
            style={{ backgroundColor: bg, color: fg }}
          >
            {/* Header Badge */}
            <div className="flex justify-between items-center z-10">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-current opacity-80">
                Component de Prova
              </span>
              <Sparkles className="w-5 h-5 opacity-70" />
            </div>

            {/* Main Content */}
            <div className="my-8 z-10 space-y-4">
              <h3 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Projecte Artífex
              </h3>
              <p className="text-lg sm:text-xl font-medium leading-relaxed max-w-lg">
                {sampleText}
              </p>
            </div>

            {/* Footer Button Preview */}
            <div className="z-10 flex flex-wrap items-center gap-4">
              <button 
                className="px-6 py-3 rounded-2xl font-bold text-sm tracking-wide border-2 transition-transform hover:scale-105"
                style={{ borderColor: fg, backgroundColor: 'transparent', color: fg }}
              >
                Acció Principal
              </button>
              <span className="text-xs font-mono opacity-60">Fons: {bg} | Text: {fg}</span>
            </div>

            {/* Decorative Background Elements */}
            <div 
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 pointer-events-none"
              style={{ backgroundColor: fg }}
            />
            <div 
              className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{ backgroundColor: fg }}
            />
          </div>

          {onGoToFontLab && (
            <div className="flex justify-end pt-4">
              <button
                onClick={onGoToFontLab}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <span>Completar i anar a ADN Tipogràfic (Eina 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

const ScoreRow: React.FC<{ label: string; pass: boolean }> = ({ label, pass }) => (
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
    <span className="text-xs font-medium text-slate-700">{label}</span>
    {pass ? (
      <span className="flex items-center gap-1 text-emerald-700 font-extrabold text-[11px] bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
        <CheckCircle className="w-3.5 h-3.5" /> PASS
      </span>
    ) : (
      <span className="flex items-center gap-1 text-red-700 font-extrabold text-[11px] bg-red-100 px-2.5 py-0.5 rounded-full border border-red-300">
        <AlertCircle className="w-3.5 h-3.5" /> FAIL
      </span>
    )}
  </div>
);
