import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { TheoryTypography } from './components/TheoryTypography';
import { TheoryColors } from './components/TheoryColors';
import { ContrastPlayground } from './components/ContrastPlayground';
import { FontLab } from './components/FontLab';
import { Quizzes } from './components/Quizzes';
import { MasterChallenge } from './components/MasterChallenge';
import { DiplomaTab } from './components/DiplomaTab';
import { StudentInfo, ChallengeEvaluation } from './types';
import { loadSavedState, saveAppState, clearAppState, calculateFinalGrade } from './utils/storage';
import { Sparkles, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [savedState, setSavedState] = useState(() => loadSavedState());

  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(savedState.studentInfo);
  const [activeTab, setActiveTab] = useState<TabType>(savedState.activeTab as TabType || 'theory-font');
  const [unlockedTabs, setUnlockedTabs] = useState<string[]>(savedState.unlockedTabs || ['theory-font']);
  const [completedModules, setCompletedModules] = useState(savedState.completedModules);
  const [quizScores, setQuizScores] = useState(savedState.quizScores);
  const [evaluations, setEvaluations] = useState<Record<number, ChallengeEvaluation>>(savedState.evaluations || {});

  // Automatically save state on every update
  useEffect(() => {
    saveAppState({
      studentInfo,
      activeTab,
      unlockedTabs,
      completedModules,
      quizScores,
      evaluations
    });
  }, [studentInfo, activeTab, unlockedTabs, completedModules, quizScores, evaluations]);

  // Unlock tab helper
  const unlockTab = (tabId: string) => {
    if (!unlockedTabs.includes(tabId)) {
      setUnlockedTabs(prev => [...prev, tabId]);
    }
  };

  // Student registration handler
  const handleRegister = (info: StudentInfo) => {
    setStudentInfo(info);
    unlockTab('theory-font');
  };

  // Section 1 completion
  const handleCompleteTheoryFont = () => {
    setCompletedModules(prev => ({ ...prev, theoryFont: true }));
    unlockTab('theory-color');
    setActiveTab('theory-color');
  };

  // Section 2 completion
  const handleCompleteTheoryColor = () => {
    setCompletedModules(prev => ({ ...prev, theoryColor: true }));
    unlockTab('contrast-tool');
    setActiveTab('contrast-tool');
  };

  // Section 3 completion
  const handleCompleteContrastTool = () => {
    setCompletedModules(prev => ({ ...prev, contrastTool: true }));
    unlockTab('font-lab');
    setActiveTab('font-lab');
  };

  // Section 4 completion
  const handleCompleteFontLab = () => {
    setCompletedModules(prev => ({ ...prev, fontLab: true }));
    unlockTab('quizzes');
    setActiveTab('quizzes');
  };

  // Section 5 completion
  const handleSaveQuizScores = (typo: number, contrast: number) => {
    setQuizScores({ typoScore: typo, contrastScore: contrast });
  };

  const handleCompleteQuizzes = () => {
    setCompletedModules(prev => ({ ...prev, quizzesTypo: true, quizzesContrast: true }));
    unlockTab('master-challenge');
    setActiveTab('master-challenge');
  };

  // Section 6 completion
  const handleSaveEvaluations = (newEvals: Record<number, ChallengeEvaluation>) => {
    setEvaluations(newEvals);
    if (Object.keys(newEvals).length === 4) {
      setCompletedModules(prev => ({ ...prev, masterChallenge: true }));
      unlockTab('diploma');
    }
  };

  // App Reset handler
  const handleResetApp = () => {
    clearAppState();
    const fresh = loadSavedState();
    setStudentInfo(fresh.studentInfo);
    setActiveTab('theory-font');
    setUnlockedTabs(['theory-font']);
    setCompletedModules(fresh.completedModules);
    setQuizScores(fresh.quizScores);
    setEvaluations({});
  };

  const gradeData = calculateFinalGrade(quizScores.typoScore, quizScores.contrastScore, evaluations, studentInfo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/60 via-slate-50 to-indigo-50/60 text-slate-800 flex flex-col font-['Montserrat']">
      
      {/* Student Registration Modal (If not registered) */}
      {!studentInfo && (
        <StudentRegistrationModal onRegister={handleRegister} />
      )}

      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        unlockedTabs={unlockedTabs}
        studentInfo={studentInfo}
        masterScore={gradeData.totalAccScore}
        finalGrade={gradeData.finalGrade}
        catalanGrade={gradeData.catalanGrade}
        onResetApp={handleResetApp}
      />

      {/* Main View Area */}
      <main className="flex-grow pb-16">
        {activeTab === 'theory-font' && (
          <TheoryTypography onGoToNextModule={handleCompleteTheoryFont} />
        )}

        {activeTab === 'theory-color' && (
          <TheoryColors onGoToTools={handleCompleteTheoryColor} />
        )}

        {activeTab === 'contrast-tool' && (
          <ContrastPlayground onGoToFontLab={handleCompleteContrastTool} />
        )}

        {activeTab === 'font-lab' && (
          <FontLab onGoToQuizzes={handleCompleteFontLab} />
        )}

        {activeTab === 'quizzes' && (
          <Quizzes 
            savedTypoScore={quizScores.typoScore}
            savedContrastScore={quizScores.contrastScore}
            onSaveScores={handleSaveQuizScores}
            onCompleteQuizzes={handleCompleteQuizzes}
          />
        )}

        {activeTab === 'master-challenge' && (
          <MasterChallenge 
            studentInfo={studentInfo}
            savedEvaluations={evaluations}
            typoQuizScore={quizScores.typoScore}
            contrastQuizScore={quizScores.contrastScore}
            onSaveEvaluations={handleSaveEvaluations}
            onCompleteMasterChallenge={() => {
              setCompletedModules(prev => ({ ...prev, masterChallenge: true }));
              unlockTab('diploma');
              setActiveTab('diploma');
            }}
          />
        )}

        {activeTab === 'diploma' && (
          <DiplomaTab
            studentInfo={studentInfo}
            typoQuizScore={quizScores.typoScore}
            contrastQuizScore={quizScores.contrastScore}
            evaluations={evaluations}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/80 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>Projecte Artífex — Tipografia &amp; Colors (La Veu i L'Emoció)</span>
        </div>
        <p className="flex items-center justify-center gap-1 font-medium">
          Dissenyat amb <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> per a l'aprenentatge del disseny visual i l'accessibilitat WCAG.
        </p>
      </footer>

    </div>
  );
};

export default App;

