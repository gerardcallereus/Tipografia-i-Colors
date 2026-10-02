import React, { useState, useEffect } from 'react';
import { FontCategory, ChallengeEvaluation, StudentInfo, ChallengePalette } from '../types';
import { MASTER_BRIEFS, evaluateChallenge } from '../utils/challengeEvaluator';
import { calculateContrast, getWCAGStatus } from '../utils/colorUtils';
import { calculateFinalGrade } from '../utils/storage';
import { Award, CheckCircle, AlertCircle, Sparkles, ChevronRight, ShieldCheck, CheckCircle2, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MasterChallengeProps {
  studentInfo: StudentInfo | null;
  savedEvaluations: Record<number, ChallengeEvaluation>;
  typoQuizScore: number;
  contrastQuizScore: number;
  onSaveEvaluations: (evals: Record<number, ChallengeEvaluation>) => void;
  onCompleteMasterChallenge: () => void;
}

export const MasterChallenge: React.FC<MasterChallengeProps> = ({
  studentInfo,
  savedEvaluations,
  typoQuizScore,
  contrastQuizScore,
  onSaveEvaluations,
  onCompleteMasterChallenge
}) => {
  const [currentBriefIdx, setCurrentBriefIdx] = useState(0);
  
  // User choices state per brief (default to null for plain initial state)
  const [selectedCategory, setSelectedCategory] = useState<FontCategory | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<ChallengePalette | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Evaluations state map
  const [evaluations, setEvaluations] = useState<Record<number, ChallengeEvaluation>>(savedEvaluations);

  useEffect(() => {
    setEvaluations(savedEvaluations);
  }, [savedEvaluations]);

  const brief = MASTER_BRIEFS[currentBriefIdx];
  const currentEval = evaluations[brief.id];

  // Sync state when changing brief or loading saved evaluation
  useEffect(() => {
    setValidationError(null);
    if (currentEval) {
      setSelectedCategory(currentEval.selectedCategory);
      setSelectedPalette(currentEval.selectedPalette);
    } else {
      setSelectedCategory(null);
      setSelectedPalette(null);
    }
  }, [currentBriefIdx, currentEval]);

  // Derived card styling (plain B&W if not selected)
  const bgColor = selectedPalette ? selectedPalette.bg : '#ffffff';
  const textColor = selectedPalette ? selectedPalette.fg : '#000000';
  const contrastRatio = selectedPalette ? calculateContrast(bgColor, textColor) : 21.0;
  const wcag = getWCAGStatus(contrastRatio);

  const getFontFamilyClass = (cat: FontCategory | null) => {
    if (!cat) return "font-sans font-normal";
    switch (cat) {
      case FontCategory.SERIF: return "font-serif-playfair font-bold";
      case FontCategory.SANS_SERIF: return "font-sans-montserrat font-extrabold";
      case FontCategory.SCRIPT: return "font-script-vibes font-normal";
      case FontCategory.DISPLAY: return "font-display-glitch font-bold";
    }
  };

  const handleEvaluateCurrent = () => {
    if (!selectedCategory || !selectedPalette) {
      setValidationError("Per avaluar l'encàrrec has de seleccionar tant la Tipografia (1) com la Paleta de Colors (2).");
      return;
    }

    setValidationError(null);
    const result = evaluateChallenge(brief, selectedCategory, selectedPalette);
    const newEvals = { ...evaluations, [brief.id]: result };
    setEvaluations(newEvals);
    onSaveEvaluations(newEvals);

    // If all 4 completed, launch confetti & trigger completion
    if (Object.keys(newEvals).length === MASTER_BRIEFS.length) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
      onCompleteMasterChallenge();
    }
  };

  const handleNextBrief = () => {
    if (currentBriefIdx < MASTER_BRIEFS.length - 1) {
      setCurrentBriefIdx(prev => prev + 1);
    }
  };

  const totalCompleted = Object.keys(evaluations).length;
  const gradeData = calculateFinalGrade(typoQuizScore, contrastQuizScore, evaluations, studentInfo);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-sm font-bold shadow-sm">
          <Award className="w-4 h-4 text-amber-600" />
          <span>EXERCI AUTOCORREGIBLE FINAL — Repte de Disseny Artífex</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Crea la identitat perfecta per a 4 encàrrecs reals
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
          Selecciona **La Veu** (Tipografia) i **L'Emoció** (Paleta de Colors). L'aplicació avaluarà localment la teva feina i et mostrarà la millor opció recomanada.
        </p>
      </div>

      {/* Progress & Brief Navigation Tabs */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none">
          {MASTER_BRIEFS.map((b, idx) => {
            const isCompleted = evaluations[b.id] !== undefined;
            const isSelected = idx === currentBriefIdx;
            
            return (
              <button
                key={b.id}
                onClick={() => setCurrentBriefIdx(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold scale-105 border border-amber-300'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span>Encàrrec {b.id}</span>
                {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Puntuació Encàrrecs</span>
            <span className="text-lg font-extrabold text-amber-700">{gradeData.totalAccScore} / 400 pts</span>
          </div>
        </div>
      </div>

      {/* Main Challenge Editor Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Client Brief Details & Selector Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Brief Specification Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">Encàrrec {brief.id} de 4</span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-200">
                {brief.industry}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">{brief.clientName}</h3>
              <p className="text-xs text-slate-500 italic mt-0.5">"{brief.tagline}"</p>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 font-medium">
              {brief.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Valors Clau de Marca:</span>
              <div className="flex flex-wrap gap-1.5">
                {brief.brandValues.map(val => (
                  <span key={val} className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-xs font-bold border border-amber-200">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Controls: Typography & Palette Choices */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            
            {/* 1. Font Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                1. Selecciona la Tipografia (La Veu)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(FontCategory).map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setValidationError(null);
                    }}
                    className={`py-3 px-3 rounded-xl font-bold text-xs border transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm font-extrabold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Structured Color Palette Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Configura els Colors (L'Emoció)
              </label>

              <div className="space-y-2.5">
                {brief.suggestedPalettes.map((pal) => {
                  const isSelected = selectedPalette?.id === pal.id;
                  
                  return (
                    <button
                      key={pal.id}
                      onClick={() => {
                        setSelectedPalette(pal);
                        setValidationError(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2.5">
                          {/* Color swatches */}
                          <div className="flex items-center gap-1 border border-slate-300 p-0.5 rounded-lg bg-white shrink-0">
                            <div className="w-4 h-4 rounded-md border border-slate-300" style={{ backgroundColor: pal.bg }} title={`Fons: ${pal.bg}`} />
                            <div className="w-4 h-4 rounded-md border border-slate-300" style={{ backgroundColor: pal.fg }} title={`Text: ${pal.fg}`} />
                          </div>
                          <span className="font-extrabold text-xs text-slate-900">{pal.name}</span>
                        </div>

                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white">
                            Seleccionada
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-snug font-medium">{pal.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Validation Alert message */}
            {validationError && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Submit / Evaluate Button */}
            <button
              onClick={handleEvaluateCurrent}
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 rounded-2xl font-extrabold text-base shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Avaluar el Disseny</span>
            </button>

          </div>

        </div>

        {/* Right Column: Live Card Preview & Evaluation Feedback (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {selectedPalette || selectedCategory ? "Targeta de Previsualització" : "Estat Inicial (Sense Estil)"}
            </span>
            
            {/* Live WCAG Indicator */}
            {selectedPalette ? (
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
                wcag.levelAAA ? 'bg-emerald-100 text-emerald-900 border-emerald-300' :
                wcag.levelAA ? 'bg-amber-100 text-amber-900 border-amber-300' :
                'bg-red-100 text-red-900 border-red-300'
              }`}>
                Contrast WCAG: {contrastRatio}:1 ({wcag.levelAA ? 'PASS' : 'FAIL'})
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                Text pla en blanc i negre
              </span>
            )}
          </div>

          {/* Canvas Card Preview (Plain unstyled B&W initially) */}
          <div
            className={`min-h-[380px] rounded-3xl p-8 sm:p-12 flex flex-col justify-between transition-all duration-500 shadow-lg relative overflow-hidden border ${
              !selectedPalette && !selectedCategory ? 'bg-white border-slate-300 text-black' : 'border-slate-200'
            }`}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className="z-10 flex justify-between items-center">
              <span className="text-xs font-mono uppercase tracking-widest border border-current px-3 py-1 rounded-full font-bold opacity-80">
                {brief.industry}
              </span>
              <span className="text-xs font-bold opacity-75">
                {selectedCategory || "Sense Tipografia"}
              </span>
            </div>

            <div className="my-8 z-10 space-y-4">
              <h1 className={`text-3xl sm:text-5xl ${getFontFamilyClass(selectedCategory)} leading-tight`}>
                {brief.clientName}
              </h1>
              <p className="text-base sm:text-lg font-medium opacity-90 max-w-lg leading-relaxed">
                "{brief.tagline}"
              </p>
            </div>

            <div className="z-10 flex justify-between items-end pt-4 border-t border-current/20 text-xs font-mono opacity-70 font-bold">
              <span>Fons: {bgColor} | Text: {textColor}</span>
              <span className="uppercase">Artífex Design</span>
            </div>
          </div>

          {/* Feedback Report if evaluated */}
          {currentEval && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400">Resultat de l'Avaluació</span>
                  <h4 className="text-2xl font-extrabold text-slate-900">
                    Puntuació: <span className="text-amber-600">{currentEval.totalScore}</span> / 100 pts
                  </h4>
                </div>

                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase border ${
                  currentEval.passed
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-red-100 text-red-900 border-red-300'
                }`}>
                  {currentEval.passed ? 'SUPERAT (Aprovat)' : 'REVISAR DISSENY'}
                </span>
              </div>

              {/* Feedback Breakdown */}
              <div className="space-y-4">
                
                {/* Typography Feedback */}
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                  currentEval.fontCategoryMatch ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>1. Tipografia ({currentEval.fontPoints}/40 pts)</span>
                    {currentEval.fontCategoryMatch ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{currentEval.fontFeedback}</p>
                </div>

                {/* Palette & Style Feedback */}
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                  currentEval.paletteTypeMatch ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>2. Elecció de Paleta i Psicologia d'Estil ({currentEval.colorPsychologyPoints}/30 pts)</span>
                    {currentEval.paletteTypeMatch ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{currentEval.colorPsychologyFeedback}</p>
                </div>

                {/* Contrast Feedback */}
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-1 ${
                  currentEval.contrastPassAA ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center justify-between font-bold">
                    <span>3. Contrast WCAG ({currentEval.contrastPoints}/30 pts)</span>
                    {currentEval.contrastPassAA ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">{currentEval.contrastFeedback}</p>
                </div>

              </div>

              {/* OPTIMAL RECOMMENDATION DISPLAY BOX */}
              <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>La Millor Opció Recomanada</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-amber-200">
                  <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-bold text-xs">
                    {currentEval.optimalRecommendation.fontCategoryName}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: currentEval.optimalRecommendation.bg }} />
                    <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: currentEval.optimalRecommendation.fg }} />
                    <span className="font-extrabold text-xs text-slate-800">{currentEval.optimalRecommendation.paletteName}</span>
                  </div>
                </div>

                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {currentEval.optimalRecommendation.explanation}
                </p>
              </div>

              {/* Next Brief Button */}
              {currentBriefIdx < MASTER_BRIEFS.length - 1 && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextBrief}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2"
                  >
                    <span>Passar al següent encàrrec</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
