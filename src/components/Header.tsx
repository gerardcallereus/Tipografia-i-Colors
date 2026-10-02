import React, { useState } from 'react';
import { Type, Palette, Sliders, FlaskConical, Target, Award, Sparkles, Lock, UserCheck, RotateCcw, GraduationCap } from 'lucide-react';
import { StudentInfo } from '../types';
import { ResetConfirmModal } from './ResetConfirmModal';

export type TabType = 'theory-font' | 'theory-color' | 'contrast-tool' | 'font-lab' | 'quizzes' | 'master-challenge' | 'diploma';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unlockedTabs: string[];
  studentInfo: StudentInfo | null;
  masterScore?: number;
  finalGrade?: number;
  catalanGrade?: string;
  onResetApp?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  unlockedTabs,
  studentInfo,
  masterScore,
  finalGrade,
  catalanGrade,
  onResetApp
}) => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const tabs = [
    { id: 'theory-font' as TabType, label: '1. Tipografia', icon: Type },
    { id: 'theory-color' as TabType, label: "2. Colors", icon: Palette },
    { id: 'contrast-tool' as TabType, label: '3. Eina Contrast', icon: Sliders },
    { id: 'font-lab' as TabType, label: '4. ADN Tipogràfic', icon: FlaskConical },
    { id: 'quizzes' as TabType, label: '5. Quizzes', icon: Target },
    { id: 'master-challenge' as TabType, label: '6. ★ Repte Final', icon: Award, highlight: true },
    { id: 'diploma' as TabType, label: '7. Diploma / Informe', icon: GraduationCap, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Student Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-400 to-pink-400 flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Projecte Artífex</span>
                {studentInfo && (
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-indigo-600" />
                    {studentInfo.nom} {studentInfo.cognoms} ({studentInfo.grup})
                  </span>
                )}
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                Tipografia <span className="text-indigo-500">&amp;</span> Colors
              </h1>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isUnlocked = unlockedTabs.includes(tab.id);
              
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (isUnlocked) setActiveTab(tab.id);
                  }}
                  disabled={!isUnlocked}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                    isActive
                      ? tab.highlight
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-105 border border-amber-300 font-extrabold'
                        : 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : !isUnlocked
                        ? 'text-slate-400 opacity-50 cursor-not-allowed bg-slate-200/50'
                        : tab.highlight
                        ? 'text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {!isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <Icon className={`w-3.5 h-3.5 ${isActive && tab.highlight ? 'text-slate-950' : ''}`} />
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Master Score & Reset Pill */}
          <div className="flex items-center gap-2">
            {finalGrade !== undefined && finalGrade > 0 && (
              <div className="hidden sm:flex items-center gap-1.5 bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-full text-amber-900 text-xs font-extrabold shadow-xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Nota: {finalGrade}/10 ({catalanGrade})</span>
              </div>
            )}

            {onResetApp && (
              <button
                onClick={() => setIsResetModalOpen(true)}
                title="Reiniciar activitat"
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Navigation Tabs (Mobile & Tablet) */}
      <div className="lg:hidden border-t border-slate-200 bg-white/95 overflow-x-auto py-2 px-4 scrollbar-none">
        <div className="flex gap-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isUnlocked = unlockedTabs.includes(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (isUnlocked) setActiveTab(tab.id);
                }}
                disabled={!isUnlocked}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? tab.highlight
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-extrabold'
                      : 'bg-indigo-600 text-white shadow-xs'
                    : !isUnlocked
                      ? 'text-slate-400 opacity-50 cursor-not-allowed bg-slate-100'
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {!isUnlocked ? <Lock className="w-3 h-3 text-slate-400" /> : <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {onResetApp && (
        <ResetConfirmModal
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirmReset={onResetApp}
        />
      )}
    </header>
  );
};

