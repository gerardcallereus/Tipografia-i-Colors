import React from 'react';
import { StudentInfo, ChallengeEvaluation } from '../types';
import { calculateFinalGrade } from '../utils/storage';
import { Award, Printer, CheckCircle2, AlertCircle, Lightbulb, Sparkles, UserCheck } from 'lucide-react';

interface DiplomaTabProps {
  studentInfo: StudentInfo | null;
  typoQuizScore: number;
  contrastQuizScore: number;
  evaluations: Record<number, ChallengeEvaluation>;
}

export const DiplomaTab: React.FC<DiplomaTabProps> = ({
  studentInfo,
  typoQuizScore,
  contrastQuizScore,
  evaluations
}) => {
  const gradeCalc = calculateFinalGrade(typoQuizScore, contrastQuizScore, evaluations, studentInfo);
  const { certificateData } = gradeCalc;

  const fullName = studentInfo ? `${studentInfo.nom} ${studentInfo.cognoms}` : "Alumne/a Artífex";
  const groupName = studentInfo ? studentInfo.grup : "1A";

  const getCatalanGradeBadgeStyle = (grade: string) => {
    switch (grade) {
      case 'AE':
        return 'bg-emerald-500 text-white border-emerald-600 shadow-md';
      case 'AN':
        return 'bg-indigo-600 text-white border-indigo-700 shadow-md';
      case 'AS':
        return 'bg-amber-400 text-slate-950 border-amber-500 shadow-md';
      default:
        return 'bg-rose-500 text-white border-rose-600 shadow-md';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Top Controls Header (Hidden on print) */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-200 mb-1">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Informe Acadèmic i Diploma Oficial</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Avaluació Global — Projecte Artífex
          </h2>
        </div>

        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-sm shadow-md flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Desar PDF</span>
        </button>
      </div>

      {/* DIPLOMA & ACADEMIC REPORT CARD CONTAINER */}
      <div className="bg-white rounded-3xl border-4 border-amber-300 p-6 sm:p-12 shadow-xl space-y-8 relative overflow-hidden">
        
        {/* Decorative Inner Line */}
        <div className="absolute inset-3 border border-amber-400/30 rounded-2xl pointer-events-none" />

        {/* Certificate Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-800 font-bold">
              Projecte Artífex — Tipografia &amp; Colors
            </span>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            INFORME ACADÈMIC I DIPLOMA
          </h1>
          <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">
            La Veu (Tipografia) i L'Emoció (Colors &amp; Contrast WCAG 2.1)
          </p>
        </div>

        {/* Student Data Section */}
        <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200 text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs text-slate-500 italic block font-medium">Es certifica l'aprofitament acadèmic de:</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-950 underline decoration-amber-400 underline-offset-8">
            {fullName}
          </h2>
          <div className="flex justify-center items-center gap-4 text-xs font-bold text-indigo-900 pt-1">
            <span className="px-3 py-1 bg-white rounded-lg border border-amber-200 shadow-2xs">Grup / Classe: {groupName}</span>
            <span className="px-3 py-1 bg-white rounded-lg border border-amber-200 shadow-2xs">Data: {certificateData.date}</span>
          </div>
        </div>

        {/* Catalan Grade & Score Highlight */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto items-center">
          
          {/* Numerical Grade */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center space-y-1 shadow-md">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Nota Final Numèrica</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-amber-400">
              {certificateData.finalGradeOutof10} <span className="text-xl text-slate-400">/ 10</span>
            </div>
            <span className="text-[11px] text-slate-400 block pt-1 font-mono">{certificateData.rankTitle}</span>
          </div>

          {/* Catalan Educational Grade Badge */}
          <div className={`p-6 rounded-2xl text-center space-y-2 border ${getCatalanGradeBadgeStyle(certificateData.catalanGrade)}`}>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-90">Qualificació Catalana</span>
            <div className="text-4xl sm:text-5xl font-black">
              {certificateData.catalanGrade}
            </div>
            <span className="text-xs font-bold block opacity-95">
              {certificateData.catalanGradeLabel}
            </span>
          </div>

        </div>

        {/* Score Breakdown Table */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Desglossament de Punts Obtenguts</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Quiz Tipografia</span>
              <span className="text-xl font-extrabold text-indigo-600">{certificateData.breakdown.typoQuizPoints} / 1.5 pts</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Quiz Contrast</span>
              <span className="text-xl font-extrabold text-indigo-600">{certificateData.breakdown.contrastQuizPoints} / 1.5 pts</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Repte 4 Encàrrecs</span>
              <span className="text-xl font-extrabold text-indigo-600">{certificateData.breakdown.masterPoints} / 7.0 pts</span>
            </div>
          </div>
        </div>

        {/* Detailed Qualitative Evaluation Section */}
        <div className="space-y-6 pt-4 border-t border-slate-200 max-w-3xl mx-auto">
          
          {/* Fortaleses (Strengths) */}
          <div className="bg-emerald-50/80 p-5 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Fortaleses Demostrades</span>
            </div>
            <ul className="list-disc list-inside text-xs sm:text-sm text-emerald-950 space-y-1.5 font-medium pl-1">
              {certificateData.fortaleses.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Errors Comessos (Errors Made) */}
          {certificateData.errorsComessos.length > 0 && (
            <div className="bg-rose-50/80 p-5 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-950 font-extrabold text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Errors Comessos a Revisar</span>
              </div>
              <ul className="list-disc list-inside text-xs sm:text-sm text-rose-950 space-y-1.5 font-medium pl-1">
                {certificateData.errorsComessos.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Propostes de Millora (Improvement Proposals) */}
          <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
              <span>Propostes de Millora Recomanades</span>
            </div>
            <ul className="list-disc list-inside text-xs sm:text-sm text-amber-950 space-y-1.5 font-medium pl-1">
              {certificateData.propostesMillora.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Seal */}
        <div className="pt-8 flex justify-between items-end border-t border-amber-200 text-xs text-slate-600 font-mono font-bold">
          <span>Data d'Emissió: {certificateData.date}</span>
          <span className="text-amber-800 uppercase font-extrabold">Segell de Qualitat Pedagògica Artífex</span>
        </div>

      </div>

    </div>
  );
};
