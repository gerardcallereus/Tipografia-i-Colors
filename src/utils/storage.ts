import { SavedAppState, StudentInfo, ChallengeEvaluation, CatalanGradeKey, CertificateData } from '../types';

const STORAGE_KEY = 'artifex_tipografia_colors_state_v1';

export const initialSavedState: SavedAppState = {
  studentInfo: null,
  activeTab: 'theory-font',
  unlockedTabs: ['theory-font'],
  completedModules: {
    theoryFont: false,
    theoryColor: false,
    contrastTool: false,
    fontLab: false,
    quizzesTypo: false,
    quizzesContrast: false,
    masterChallenge: false
  },
  quizScores: {
    typoScore: 0,
    contrastScore: 0
  },
  evaluations: {}
};

export const loadSavedState = (): SavedAppState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return initialSavedState;
    const parsed = JSON.parse(data);
    return {
      ...initialSavedState,
      ...parsed,
      completedModules: {
        ...initialSavedState.completedModules,
        ...(parsed.completedModules || {})
      },
      quizScores: {
        ...initialSavedState.quizScores,
        ...(parsed.quizScores || {})
      }
    };
  } catch (err) {
    console.error("Error carregant l'estat des de localStorage:", err);
    return initialSavedState;
  }
};

export const saveAppState = (state: SavedAppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Error desant l'estat a localStorage:", err);
  }
};

export const clearAppState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Error esborrant l'estat:", err);
  }
};

export const calculateFinalGrade = (
  typoQuizScore: number,
  contrastQuizScore: number,
  evaluations: Record<number, ChallengeEvaluation>,
  studentInfo?: StudentInfo | null
): {
  finalGrade: number;
  catalanGrade: CatalanGradeKey;
  catalanGradeLabel: string;
  typoPoints: number;
  contrastPoints: number;
  masterPoints: number;
  totalAccScore: number;
  rankTitle: string;
  certificateData: CertificateData;
} => {
  const TOTAL_TYPO_QUESTIONS = 12;
  const TOTAL_CONTRAST_QUESTIONS = 12;

  const typoPoints = parseFloat(((typoQuizScore / TOTAL_TYPO_QUESTIONS) * 1.5).toFixed(1));
  const contrastPoints = parseFloat(((contrastQuizScore / TOTAL_CONTRAST_QUESTIONS) * 1.5).toFixed(1));
  
  const totalAccScore = Object.values(evaluations).reduce((acc, curr) => acc + curr.totalScore, 0);
  const masterPoints = parseFloat(((totalAccScore / 400) * 7.0).toFixed(1));

  const rawGrade = typoPoints + contrastPoints + masterPoints;
  const finalGrade = Math.min(10.0, parseFloat(rawGrade.toFixed(1)));

  let catalanGrade: CatalanGradeKey = 'NA';
  let catalanGradeLabel = 'NA — No Assolit (< 6.0)';
  let rankTitle = 'Aprenent de Disseny Visual';

  if (finalGrade >= 9.0) {
    catalanGrade = 'AE';
    catalanGradeLabel = 'AE — Assoliment Excel·lent (9.0 - 10.0)';
    rankTitle = 'Mestre/a de la Tipografia i el Color';
  } else if (finalGrade >= 7.5) {
    catalanGrade = 'AN';
    catalanGradeLabel = 'AN — Assoliment Notable (7.5 - 8.9)';
    rankTitle = 'Dissenyador/a d\'Elit Artífex';
  } else if (finalGrade >= 6.0) {
    catalanGrade = 'AS';
    catalanGradeLabel = 'AS — Assoliment Satisfeig (6.0 - 7.4)';
    rankTitle = 'Practicant de Disseny Visual';
  } else {
    catalanGrade = 'NA';
    catalanGradeLabel = 'NA — No Assolit (< 6.0)';
    rankTitle = 'En Formació Inicial';
  }

  // Generate dynamic Strengths, Errors, and Proposals for improvement
  const fortaleses: string[] = [];
  const errorsComessos: string[] = [];
  const propostesMillora: string[] = [];

  // Typo Quiz Feedback
  if (typoQuizScore >= 10) {
    fortaleses.push(`Domini excel·lent de la veu tipogràfica (${typoQuizScore}/${TOTAL_TYPO_QUESTIONS} encerts al Quiz Tipogràfic).`);
  } else if (typoQuizScore >= 7) {
    fortaleses.push(`Bona identificació de les emocions de les fonts (${typoQuizScore}/${TOTAL_TYPO_QUESTIONS} encerts).`);
    propostesMillora.push("Repassar la diferència entre tipografies Serifa (tradició/luxe) i Pal Sec (tecnologia/minimalisme).");
  } else {
    errorsComessos.push(`Errors en associar la tipografia amb la personalitat de la marca (${typoQuizScore}/${TOTAL_TYPO_QUESTIONS} encerts).`);
    propostesMillora.push("Tornar a revisar el mòdul '1. Tipografia (La Veu)' i practicar amb l'eina ADN Tipogràfic.");
  }

  // Contrast Quiz Feedback
  if (contrastQuizScore >= 10) {
    fortaleses.push(`Comprensió impecable del contrast accessible i les normes WCAG 2.1 (${contrastQuizScore}/${TOTAL_CONTRAST_QUESTIONS} encerts).`);
  } else if (contrastQuizScore >= 7) {
    fortaleses.push(`Comprensió adequada dels ràtios de contrast (${contrastQuizScore}/${TOTAL_CONTRAST_QUESTIONS} encerts).`);
    propostesMillora.push("Atenció als textos de poca lluminositat (ex. blau fosc sobre negre o groc sobre blanc).");
  } else {
    errorsComessos.push(`Errors al detectar combinacions il·legibles de fons i text (${contrastQuizScore}/${TOTAL_CONTRAST_QUESTIONS} encerts).`);
    propostesMillora.push("Utilitzar sempre l'Eina de Contrast WCAG per verificar que el ràtio supera com a mínim 4.5:1 (AA).");
  }

  // Master Challenge Feedback
  const completedCount = Object.keys(evaluations).length;
  if (completedCount === 4 && totalAccScore >= 350) {
    fortaleses.push(`Resolució magistral dels 4 encàrrecs reals del Repte Final (${totalAccScore}/400 punts).`);
  } else if (completedCount === 4 && totalAccScore >= 280) {
    fortaleses.push(`Resolució satisfactòria dels encàrrecs reals del Repte Final (${totalAccScore}/400 punts).`);
  } else if (completedCount < 4) {
    errorsComessos.push(`Encara queden encàrrecs pendents de completar al Repte Final (${completedCount}/4 completats).`);
    propostesMillora.push("Completar tots els 4 encàrrecs del Repte Final per aconseguir la màxima puntuació possible.");
  }

  // Check specific errors in evaluations
  Object.values(evaluations).forEach(e => {
    if (e.selectedPalette && e.selectedPalette.type === 'STYLE_ERROR') {
      errorsComessos.push(`Selecció de paleta amb error d'estil en un dels encàrrecs (paleta no adequada a la personalitat).`);
    }
    if (e.selectedPalette && e.selectedPalette.type === 'CONTRAST_ERROR') {
      errorsComessos.push(`Selecció de paleta amb error de contrast inaccessible en un dels encàrrecs.`);
    }
  });

  if (propostesMillora.length === 0) {
    propostesMillora.push("Continuar aplicant els criteris de disseny accessible i jerarquia visual en futurs projectes digitals.");
  }

  const certificateData: CertificateData = {
    studentInfo: studentInfo || {
      nom: "Alumne/a",
      cognoms: "Artífex",
      grup: "1A",
      registeredAt: new Date().toISOString()
    },
    date: new Date().toLocaleDateString('ca-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    finalGradeOutof10: finalGrade,
    catalanGrade,
    catalanGradeLabel,
    totalScore: totalAccScore,
    rankTitle,
    breakdown: {
      typoQuizPoints: typoPoints,
      contrastQuizPoints: contrastPoints,
      masterPoints: masterPoints
    },
    fortaleses,
    errorsComessos,
    propostesMillora
  };

  return {
    finalGrade,
    catalanGrade,
    catalanGradeLabel,
    typoPoints,
    contrastPoints,
    masterPoints,
    totalAccScore,
    rankTitle,
    certificateData
  };
};
