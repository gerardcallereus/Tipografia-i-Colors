export enum FontCategory {
  SERIF = 'SERIF',
  SANS_SERIF = 'SANS_SERIF',
  SCRIPT = 'SCRIPT',
  DISPLAY = 'DISPLAY'
}

export type StudentGroup = '1A' | '1B' | '2A' | '2B' | '3A' | '3B';

export interface StudentInfo {
  nom: string;
  cognoms: string;
  grup: StudentGroup;
  registeredAt: string;
}

export interface WCAGResult {
  score: number;
  levelAA: boolean;
  levelAAA: boolean;
  levelAALarge: boolean;
  levelAAALarge: boolean;
}

export interface AdjectiveItem {
  word: string;
  category: FontCategory;
}

export interface QuizQuestionContrast {
  id: number;
  bg: string;
  fg: string;
  context: string;
  isGood: boolean;
  explanation: string;
}

export interface QuizQuestionTypography {
  id: number;
  scenario: string;
  brandValues: string[];
  correctCategory: FontCategory;
  options: {
    fontCategory: FontCategory;
    fontFamily: string;
    label: string;
  }[];
  explanation: string;
}

export type PaletteType = 'OPTIMAL' | 'STYLE_ERROR' | 'CONTRAST_ERROR';

export interface ChallengePalette {
  id: string;
  name: string;
  type: PaletteType;
  bg: string;
  fg: string;
  description: string;
  feedback: string;
}

export interface MasterChallengeBrief {
  id: number;
  clientName: string;
  tagline: string;
  industry: string;
  targetAudience: string;
  description: string;
  brandValues: string[];
  expectedCategory: FontCategory;
  expectedCategoryName: string;
  suggestedPalettes: ChallengePalette[];
  hint: string;
}

export interface ChallengeEvaluation {
  selectedCategory: FontCategory | null;
  selectedPalette: ChallengePalette | null;
  
  fontCategoryMatch: boolean;
  fontPoints: number; // 0 to 40
  fontFeedback: string;
  
  contrastScore: number;
  contrastPassAA: boolean;
  contrastPoints: number; // 0 to 30
  contrastFeedback: string;
  
  paletteTypeMatch: boolean;
  colorPsychologyPoints: number; // 0 to 30
  colorPsychologyFeedback: string;
  
  totalScore: number; // 0 to 100
  passed: boolean;

  optimalRecommendation: {
    fontCategory: FontCategory;
    fontCategoryName: string;
    paletteName: string;
    bg: string;
    fg: string;
    explanation: string;
  };
}

export type CatalanGradeKey = 'AE' | 'AN' | 'AS' | 'NA';

export interface CertificateData {
  studentInfo: StudentInfo;
  date: string;
  finalGradeOutof10: number;
  catalanGrade: CatalanGradeKey;
  catalanGradeLabel: string;
  totalScore: number;
  rankTitle: string;
  breakdown: {
    typoQuizPoints: number;
    contrastQuizPoints: number;
    masterPoints: number;
  };
  fortaleses: string[];
  errorsComessos: string[];
  propostesMillora: string[];
}

export interface SavedAppState {
  studentInfo: StudentInfo | null;
  activeTab: string;
  unlockedTabs: string[];
  completedModules: {
    theoryFont: boolean;
    theoryColor: boolean;
    contrastTool: boolean;
    fontLab: boolean;
    quizzesTypo: boolean;
    quizzesContrast: boolean;
    masterChallenge: boolean;
  };
  quizScores: {
    typoScore: number;
    contrastScore: number;
  };
  evaluations: Record<number, ChallengeEvaluation>;
}
