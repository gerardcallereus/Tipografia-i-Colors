import { FontCategory, MasterChallengeBrief, ChallengeEvaluation, ChallengePalette } from '../types';
import { calculateContrast, getWCAGStatus } from './colorUtils';

export const MASTER_BRIEFS: MasterChallengeBrief[] = [
  {
    id: 1,
    clientName: "Forn i Pastisseria L'Artesana",
    tagline: "Pa de massa mare i dolços d'abans fets a mà amb amor",
    industry: "Alimentació Artesana",
    targetAudience: "Famílies i amants de la gastronomia tradicional de proximitat",
    description: "Volem un disseny que recordi l'olor de pa acabat de fer, la tradició dels avis i l'escalfor del forn de llenya.",
    brandValues: ["Artesania", "Tradició", "Proximitat", "Calidesa"],
    expectedCategory: FontCategory.SCRIPT,
    expectedCategoryName: "Manuscrita (Script)",
    suggestedPalettes: [
      {
        id: 'p1_opt',
        name: "Farina i Marró Forn (Òptima)",
        type: 'OPTIMAL',
        bg: '#fefae0',
        fg: '#4a2810',
        description: "Fons crema suau de farina amb text marró xocolata fosc.",
        feedback: "Excel·lent elecció emocional! Els tons crema i marró torrat evoquen pa de massa mare i dolços artesans amb un alt contrast llegible."
      },
      {
        id: 'p1_style_err',
        name: "Halloween Nit i Taronges (Error d'Estil)",
        type: 'STYLE_ERROR',
        bg: '#180828',
        fg: '#f97316',
        description: "Fons fosc nocturn amb taronges d'alerta neon.",
        feedback: "Error d'estil: Aquesta paleta sembla una festa de terror o Halloween, no una pastisseria de barri acollidora i familiar!"
      },
      {
        id: 'p1_contrast_err',
        name: "Crema Clar sobre Blanc (Error de Contrast)",
        type: 'CONTRAST_ERROR',
        bg: '#ffffff',
        fg: '#fef08a',
        description: "Text groc claríssim sobre fons blanc immaculat.",
        feedback: "Error de contrast: El text groc clar sobre blanc té un ràtio WCAG insuficient (1.1:1 - FAIL). Ningú podrà llegir el nom del forn!"
      }
    ],
    hint: "Busca una tipografia que transmeti la calidesa de l'escriptura humana i colors càlids (cremes, marrons, torrats) amb alt contrast WCAG."
  },
  {
    id: 2,
    clientName: "CyberShield Security",
    tagline: "Protecció de dades d'alta velocitat per a empreses del futur",
    industry: "Ciberseguretat i Software",
    targetAudience: "Directors de tecnologia i grans corporacions digitals",
    description: "Necessitem una imatge extremadament neta, moderna, tecnològica i que transmeti la màxima seguretat i claredat.",
    brandValues: ["Tecnologia", "Minimalisme", "Confiança", "Futur"],
    expectedCategory: FontCategory.SANS_SERIF,
    expectedCategoryName: "Pal Sec (Sans Serif)",
    suggestedPalettes: [
      {
        id: 'p2_opt',
        name: "Blau Ciber i Blanc (Òptima)",
        type: 'OPTIMAL',
        bg: '#0f172a',
        fg: '#38bdf8',
        description: "Mode fosc tecnològic amb accent blau cel viu.",
        feedback: "Molt bé! El blau cel sobre fons nit fosc transmet seguretat digital, claredat i tecnologia d'avantguarda amb un contrast excel·lent."
      },
      {
        id: 'p2_style_err',
        name: "Festa Infantil i Pastís (Error d'Estil)",
        type: 'STYLE_ERROR',
        bg: '#fbcfe8',
        fg: '#db2777',
        description: "Fons rosa sucre i lletres magenta d'aniversari.",
        feedback: "Error d'estil: Aquests colors de festa infantil de llaminadures no transmeten la serietat ni la protecció d'una empresa de ciberseguretat."
      },
      {
        id: 'p2_contrast_err',
        name: "Gris Molt Clar sobre Blanc (Error de Contrast)",
        type: 'CONTRAST_ERROR',
        bg: '#ffffff',
        fg: '#cbd5e1',
        description: "Text gris pàl·lid sobre blanc.",
        feedback: "Error de contrast: El text gris pàl·lid sobre blanc (1.6:1 - FAIL) fa que la informació de seguretat sigui gairebé invisible."
      }
    ],
    hint: "Tria una font Pal Sec geomètrica i neta. Utilitza la gamma de blaus o fons foscos tecnològics amb un contrast superior a 4.5:1."
  },
  {
    id: 3,
    clientName: "Joieria & Rellotgeria Aureum",
    tagline: "Peces d'or pur i diamants amb segles de mestratge",
    industry: "Alta Joieria i Luxe",
    targetAudience: "Clients d'alt poder adquisitiu que busquen peces exclusives i eternes",
    description: "Volem reflexionar l'elegància suprema, el prestigi històric i la serietat d'una casa fundada el 1888.",
    brandValues: ["Luxe", "Elegància", "Seriositat", "Tradició"],
    expectedCategory: FontCategory.SERIF,
    expectedCategoryName: "Serifa (Serif)",
    suggestedPalettes: [
      {
        id: 'p3_opt',
        name: "Negre Atzabeja i Daurat (Òptima)",
        type: 'OPTIMAL',
        bg: '#0a0a0a',
        fg: '#fef08a',
        description: "Luxe fosc nocturn amb text daurat d'alt contrast.",
        feedback: "Excel·lent! El daurat sobre fons negre profund transmet exclusivitat, riquesa i elegància atemporal per a una marca d'alta joieria."
      },
      {
        id: 'p3_style_err',
        name: "Graffiti Neon Rebel (Error d'Estil)",
        type: 'STYLE_ERROR',
        bg: '#18181b',
        fg: '#a855f7',
        description: "Lila estridents de discoteca o festival de carrer.",
        feedback: "Error d'estil: El lila neon urbà trenca l'elegància tradicional i el prestigi d'una joieria centenària de diamants."
      },
      {
        id: 'p3_contrast_err',
        name: "Daurat sobre Marfil Clar (Error de Contrast)",
        type: 'CONTRAST_ERROR',
        bg: '#fafaf9',
        fg: '#eab308',
        description: "Daurat clar sobre marfil.",
        feedback: "Error de contrast: El text daurat sobre fons marfil (1.8:1 - FAIL) crea un reflex molest i inaccesible."
      }
    ],
    hint: "Les serifes amb remats donen el pes històric i elegància que requereix Aureum. Evita colors foscos sobre foscos!"
  },
  {
    id: 4,
    clientName: "X-TREME URBAN CLUB",
    tagline: "Skate, BMX i cultura de carrer sense regles ni límits",
    industry: "Esports Extrems i Cultura Urbana",
    targetAudience: "Joves adolescents rebels, skaters i creadors de contingut urbà",
    description: "Necessitem un disseny sorollós, impactant, rompedor i rebel que cridi l'atenció immediatament des d'un cartell o la pantalla del mòbil.",
    brandValues: ["Rebeldia", "Impacte", "Urbana", "Cridanera"],
    expectedCategory: FontCategory.DISPLAY,
    expectedCategoryName: "Decorativa (Display)",
    suggestedPalettes: [
      {
        id: 'p4_opt',
        name: "Groc Neon i Negre (Òptima)",
        type: 'OPTIMAL',
        bg: '#facc15',
        fg: '#000000',
        description: "Contrast d'alt impacte urbà (estil senyal d'alerta).",
        feedback: "Brillant! La combinació de groc neon i negre crida l'atenció immediatament, transmet l'adrenalina de la cultura skate i té un contrast màxim."
      },
      {
        id: 'p4_style_err',
        name: "Pastisseria Suau Pastís (Error d'Estil)",
        type: 'STYLE_ERROR',
        bg: '#fff8dc',
        fg: '#78350f',
        description: "Fons crema dolç amb marró de xocolata.",
        feedback: "Error d'estil: Uns colors dolços de pastisseria no transmeten la rebeldia ni l'energia d'un club d'esports extrems urbà."
      },
      {
        id: 'p4_contrast_err',
        name: "Vermell Foc sobre Negre Nit (Error de Contrast)",
        type: 'CONTRAST_ERROR',
        bg: '#09090b',
        fg: '#7f1d1d',
        description: "Text vermell fosc sobre fons negre.",
        feedback: "Error de contrast: El vermell molt fosc sobre negre (2.2:1 - FAIL) fa que el text es perdi en l'obscuritat i no es pugui llegir a la distància."
      }
    ],
    hint: "Per a una marca rebel d'impacte, la font Decorativa és la reina. Procura que el text mantingui un ràtio WCAG fort!"
  }
];

export const evaluateChallenge = (
  brief: MasterChallengeBrief,
  selectedFontCategory: FontCategory | null,
  selectedPalette: ChallengePalette | null
): ChallengeEvaluation => {
  const optimalPalette = brief.suggestedPalettes.find(p => p.type === 'OPTIMAL') || brief.suggestedPalettes[0];

  const optimalRecommendation = {
    fontCategory: brief.expectedCategory,
    fontCategoryName: brief.expectedCategoryName,
    paletteName: optimalPalette.name,
    bg: optimalPalette.bg,
    fg: optimalPalette.fg,
    explanation: `Per a ${brief.clientName} (${brief.industry}), la selecció perfecta és la font ${brief.expectedCategoryName} combinada amb la paleta "${optimalPalette.name}". ${optimalPalette.feedback}`
  };

  // If user hasn't made selections yet
  if (!selectedFontCategory || !selectedPalette) {
    return {
      selectedCategory: selectedFontCategory,
      selectedPalette: selectedPalette,
      fontCategoryMatch: false,
      fontPoints: 0,
      fontFeedback: "Selecciona una categoria tipogràfica per avaluar.",
      contrastScore: 1,
      contrastPassAA: false,
      contrastPoints: 0,
      contrastFeedback: "Selecciona una paleta de colors per avaluar.",
      paletteTypeMatch: false,
      colorPsychologyPoints: 0,
      colorPsychologyFeedback: "Selecciona una paleta de colors per avaluar.",
      totalScore: 0,
      passed: false,
      optimalRecommendation
    };
  }

  // 1. Typography Evaluation (40 points)
  const fontMatch = selectedFontCategory === brief.expectedCategory;
  const fontPoints = fontMatch ? 40 : 15;
  const fontFeedback = fontMatch
    ? `Molt bé! La tipografia ${selectedFontCategory} és precisament la que millor encaixa amb la personalitat i valors de ${brief.clientName}.`
    : `La tipografia seleccionada (${selectedFontCategory}) no transmet la veu ideal de la marca. Per a ${brief.clientName} es recomana una font de tipus ${brief.expectedCategoryName}.`;

  // 2. Palette & Style Evaluation (30 points)
  const paletteTypeMatch = selectedPalette.type === 'OPTIMAL';
  let colorPoints = 0;
  if (selectedPalette.type === 'OPTIMAL') {
    colorPoints = 30;
  } else if (selectedPalette.type === 'STYLE_ERROR') {
    colorPoints = 12;
  } else {
    colorPoints = 0;
  }
  const colorFeedback = selectedPalette.feedback;

  // 3. Contrast & WCAG Evaluation (30 points)
  const ratio = calculateContrast(selectedPalette.bg, selectedPalette.fg);
  const wcag = getWCAGStatus(ratio);
  
  let contrastPoints = 0;
  let contrastFeedback = "";

  if (wcag.levelAAA) {
    contrastPoints = 30;
    contrastFeedback = `Excel·lent! El ràtio de contrast és de ${ratio}:1, superant la norma AAA (7:1). Text extremadament nítid i accessible per a tothom.`;
  } else if (wcag.levelAA) {
    contrastPoints = 25;
    contrastFeedback = `Molt bo. El ràtio de contrast és de ${ratio}:1, complint la norma WCAG AA (4.5:1). És adequat per a la majoria d'usuaris.`;
  } else if (wcag.levelAALarge) {
    contrastPoints = 12;
    contrastFeedback = `Atenció: El ràtio és de ${ratio}:1. Només aprova per a text gran (18pt+). Per a paràgrafs o lletra normal és insuficient.`;
  } else {
    contrastPoints = 0;
    contrastFeedback = `Suspès en contrast: El ràtio és de ${ratio}:1, per sota del mínim 3:1. El text costa molt de llegir i és inaccessible.`;
  }

  const totalScore = fontPoints + colorPoints + contrastPoints;
  const passed = totalScore >= 70 && wcag.levelAA && selectedPalette.type === 'OPTIMAL';

  return {
    selectedCategory: selectedFontCategory,
    selectedPalette,
    fontCategoryMatch: fontMatch,
    fontPoints,
    fontFeedback,
    contrastScore: ratio,
    contrastPassAA: wcag.levelAA,
    contrastPoints,
    contrastFeedback,
    paletteTypeMatch,
    colorPsychologyPoints: colorPoints,
    colorPsychologyFeedback: colorFeedback,
    totalScore,
    passed,
    optimalRecommendation
  };
};

