import React, { useState, useEffect } from 'react';
import { FontCategory, QuizQuestionTypography, QuizQuestionContrast } from '../types';
import { Target, Check, X, Trophy, ArrowRight, Lightbulb, Award, RefreshCw, CheckCircle2 } from 'lucide-react';

const TYPO_QUESTIONS: QuizQuestionTypography[] = [
  {
    id: 1,
    scenario: "La teva marca ven anells de compromís de diamants molt cars i exclusius. Vols transmetre història, serietat i prestigi.",
    brandValues: ["Luxe", "Tradició", "Seriositat"],
    correctCategory: FontCategory.SERIF,
    options: [
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció A (Serifa)" },
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció B (Decorativa)" },
    ],
    explanation: "Excel·lent! Les serifes (Opció A) transmeten història i respecte. La font Decorativa (Opció B) seria caòtica i faria semblar la joieria poc seriosa."
  },
  {
    id: 2,
    scenario: "Crearàs una línia de polseres de tela i fusta fetes a mà. El teu públic són joves que valoren l'artesania i la proximitat.",
    brandValues: ["Artesania", "Proximitat", "Informal"],
    correctCategory: FontCategory.SCRIPT,
    options: [
      { fontCategory: FontCategory.SANS_SERIF, fontFamily: "font-sans-montserrat", label: "Opció A (Pal Sec)" },
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció B (Manuscrita)" },
    ],
    explanation: "Correcte! La lletra manuscrita (Opció B) diu 'això ho ha fet una persona', mentre que el pal sec lineal semblaria produït en massa per una fàbrica."
  },
  {
    id: 3,
    scenario: "La marca 'NEO' fa joies impreses en 3D amb titani. Busques un look futurista, tecnològic, geomètric i molt net.",
    brandValues: ["Tecnologia", "Minimalisme", "Futur"],
    correctCategory: FontCategory.SANS_SERIF,
    options: [
      { fontCategory: FontCategory.SANS_SERIF, fontFamily: "font-sans-montserrat font-bold", label: "Opció A (Pal Sec)" },
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció B (Serifa)" },
    ],
    explanation: "Exacte! L'Opció A (Pal Sec) és geomètrica, neta i sense remats antics, ideal per a la tecnologia i impressió 3D. La Serifa tradicional (Opció B) pertany al passat."
  },
  {
    id: 4,
    scenario: "Vols crear una marca de joies inspirada en el Graffiti i la cultura Skate. Vols que sigui impactant i rebel.",
    brandValues: ["Rebeldia", "Carrer", "Impacte"],
    correctCategory: FontCategory.DISPLAY,
    options: [
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció A (Manuscrita)" },
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció B (Decorativa)" },
    ],
    explanation: "Molt bé! L'Opció B és cridanera i 'bruta', perfecta per l'estil urbà. La font manuscrita elegant seria massa romàntica per a un skater."
  },
  {
    id: 5,
    scenario: "Tens una botiga de joies minimalistes de plata. Tot és molt senzill, 'Zen' i ordenat. Menys és més.",
    brandValues: ["Zen", "Ordre", "Sencillesa"],
    correctCategory: FontCategory.SANS_SERIF,
    options: [
      { fontCategory: FontCategory.SANS_SERIF, fontFamily: "font-sans-montserrat", label: "Opció A (Pal Sec)" },
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-abril", label: "Opció B (Decorativa)" },
    ],
    explanation: "Bravo! L'Opció A no té distraccions, és pura claredat. L'Opció B té massa adorns pesats per ser minimalista."
  },
  {
    id: 6,
    scenario: "Edites un llibre sobre la història de l'Imperi Romà. Vols que el text transmeti pes històric, autoritat i rigor acadèmic.",
    brandValues: ["Història", "Autoritat", "Rigor"],
    correctCategory: FontCategory.SERIF,
    options: [
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció A (Serifa)" },
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció B (Manuscrita)" },
    ],
    explanation: "Molt bé! Les Serifes tenen el seu origen en les inscripcions gravades en pedra de la Roma clàssica."
  },
  {
    id: 7,
    scenario: "Dissenyaràs les invitacions per a un casament d'alta gala a la platja. Es busca delicadesa, romanticisme i elegància personal.",
    brandValues: ["Romanticisme", "Delicadesa", "Personal"],
    correctCategory: FontCategory.SCRIPT,
    options: [
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció A (Decorativa)" },
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció B (Manuscrita)" },
    ],
    explanation: "Perfecte! La cal·ligrafia Manuscrita evoca la calidesa d'una carta escrita a mà per als convidats."
  },
  {
    id: 8,
    scenario: "Cartell principal d'un Festival de Música Electrònica Cyberpunk. Vols que el nom del festival es vegi a 50 metres de distància.",
    brandValues: ["Festa", "Energia", "Impacte Visual"],
    correctCategory: FontCategory.DISPLAY,
    options: [
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció A (Decorativa)" },
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció B (Serifa)" },
    ],
    explanation: "Excel·lent! Les fonts Decoratives trenquen les regles convencionals per captar l'atenció de manera immediata."
  },
  {
    id: 9,
    scenario: "Disseny de la interfície d'un quadre de comandament d'avió. La informació s'ha de llegir ràpidament sense cap distracció.",
    brandValues: ["Precisió", "Seguretat", "Legibilitat ràpida"],
    correctCategory: FontCategory.SANS_SERIF,
    options: [
      { fontCategory: FontCategory.SANS_SERIF, fontFamily: "font-sans-montserrat font-bold", label: "Opció A (Pal Sec)" },
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció B (Manuscrita)" },
    ],
    explanation: "Correcte! Les fonts Pal Sec són les utilitzades en la senyalització pública i aviació per la seva màxima claredat."
  },
  {
    id: 10,
    scenario: "Bufet d'advocats i notaria fundada el 1890. Cal transmetre confiança absoluta, serietat legal i tradició.",
    brandValues: ["Confiança", "Llei", "Tradició centenària"],
    correctCategory: FontCategory.SERIF,
    options: [
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció A (Decorativa)" },
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció B (Serifa)" },
    ],
    explanation: "Exacte! La Serifa és la reina dels documents oficials, notaries i la premsa clàssica."
  },
  {
    id: 11,
    scenario: "Marca de mel ecològica d'alta muntanya recollida per apicultors locals. Es busca un estil de dolçor natural.",
    brandValues: ["Ecologia", "Dolçor", "Natura"],
    correctCategory: FontCategory.SCRIPT,
    options: [
      { fontCategory: FontCategory.SCRIPT, fontFamily: "font-script-vibes", label: "Opció A (Manuscrita)" },
      { fontCategory: FontCategory.SANS_SERIF, fontFamily: "font-sans-montserrat", label: "Opció B (Pal Sec)" },
    ],
    explanation: "Bravo! La lletra fluida i orgànica Script recorda els dibuixos i receptes de tota la vida."
  },
  {
    id: 12,
    scenario: "Portada d'un videojoc retro inspirat en les màquines Arcade dels anys 80. Vols provocar nostàlgia i diversió.",
    brandValues: ["Retro", "Arcade", "Diversió"],
    correctCategory: FontCategory.DISPLAY,
    options: [
      { fontCategory: FontCategory.SERIF, fontFamily: "font-serif-playfair", label: "Opció A (Serifa)" },
      { fontCategory: FontCategory.DISPLAY, fontFamily: "font-display-glitch", label: "Opció B (Decorativa)" },
    ],
    explanation: "Molt bé! Les fonts Decoratives temàtiques aporten la personalitat única i retro que exigeix el videojoc."
  }
];

const CONTRAST_QUESTIONS: QuizQuestionContrast[] = [
  { 
    id: 1, 
    bg: '#ffffff', 
    fg: '#d1d5db', 
    context: "Text de paràgraf en un article", 
    isGood: false,
    explanation: "El gris clar sobre blanc té un ràtio de 1.4:1 (FAIL). És gairebé invisible si tens la brillantor de la pantalla baixa!"
  },
  { 
    id: 2, 
    bg: '#1e3a8a', 
    fg: '#ffffff', 
    context: "Botó de 'Comprar ara' principal", 
    isGood: true,
    explanation: "Perfecte! El blanc sobre blau fosc ofereix un ràtio de 12.6:1 (AAA). És ultra llegible i destaca immediatament."
  },
  { 
    id: 3, 
    bg: '#ef4444', 
    fg: '#22c55e', 
    context: "Targeta festiva de Nadal", 
    isGood: false,
    explanation: "Compte! Vermell i verd tenen la mateixa lluminositat i vibren als ulls (2.1:1 - FAIL). A més, les persones amb daltonisme no ho podran llegir."
  },
  { 
    id: 4, 
    bg: '#fef08a', 
    fg: '#854d0e', 
    context: "Nota important de recordatori (Pòsit)", 
    isGood: true,
    explanation: "Molt bé. Tot i ser de la mateixa gamma (groc/marró), el marró és prou fosc per garantir 6.8:1 (AA), superant la norma."
  },
  { 
    id: 5, 
    bg: '#000000', 
    fg: '#1d4ed8', 
    context: "Enllaç web en mode fosc", 
    isGood: false,
    explanation: "El blau fosc sobre negre (2.6:1 - FAIL) és molt difícil de veure. En mode fosc els blaus han de ser més clars (com el cian)."
  },
  { 
    id: 6, 
    bg: '#ffffff', 
    fg: '#facc15', 
    context: "Títol d'un avís de seguretat", 
    isGood: false,
    explanation: "Text groc sobre blanc (1.2:1 - FAIL). El groc necessita fons foscos per ser llegible."
  },
  { 
    id: 7, 
    bg: '#facc15', 
    fg: '#000000', 
    context: "Senyal d'alerta o cartell urbà", 
    isGood: true,
    explanation: "Excel·lent! Negre sobre groc neon té un ràtio de 16.5:1 (AAA), el màxim contrast d'atenció visual."
  },
  { 
    id: 8, 
    bg: '#64748b', 
    fg: '#ffffff', 
    context: "Subtítol en targeta corporativa", 
    isGood: true,
    explanation: "Molt bé! Blanc sobre gris fosc (4.6:1 - AA) compleix la norma per a qualsevol mètrica de lectura."
  },
  { 
    id: 9, 
    bg: '#0f172a', 
    fg: '#c084fc', 
    context: "Text destacat en web Cyberpunk", 
    isGood: true,
    explanation: "Molt bo! Lila cel sobre blau nit fosc (7.2:1 - AAA) ofereix un look nocturn atractiu i nítid."
  },
  { 
    id: 10, 
    bg: '#ec4899', 
    fg: '#f97316', 
    context: "Banner de descompte de tardor", 
    isGood: false,
    explanation: "Taronja sobre rosa (1.8:1 - FAIL). Ambdós colors són càlids i vius de similar lluminositat, provocant fatiga visual."
  },
  { 
    id: 11, 
    bg: '#fefae0', 
    fg: '#4a2810', 
    context: "Menu de restaurant tradicional", 
    isGood: true,
    explanation: "Excel·lent! Text marró xocolata sobre crema (11.2:1 - AAA) combina calidesa i lectura accessible."
  },
  { 
    id: 12, 
    bg: '#ffffff', 
    fg: '#86efac', 
    context: "Indicador d'èxit en un formulari", 
    isGood: false,
    explanation: "Verd pastís molt clar sobre blanc (1.5:1 - FAIL). Els missatges de confirmació verds han de ser foscos o sobre fons fosc."
  }
];

interface QuizzesProps {
  savedTypoScore?: number;
  savedContrastScore?: number;
  onSaveScores: (typo: number, contrast: number) => void;
  onCompleteQuizzes?: () => void;
}

export const Quizzes: React.FC<QuizzesProps> = ({
  savedTypoScore = 0,
  savedContrastScore = 0,
  onSaveScores,
  onCompleteQuizzes
}) => {
  const [activeQuiz, setActiveQuiz] = useState<'typo' | 'contrast'>('typo');
  
  // Typo Quiz state
  const [typoIdx, setTypoIdx] = useState(0);
  const [typoSelected, setTypoSelected] = useState<number | null>(null);
  const [typoScore, setTypoScore] = useState(savedTypoScore);
  const [typoFinished, setTypoFinished] = useState(false);

  // Contrast Quiz state
  const [contrastIdx, setContrastIdx] = useState(0);
  const [contrastFeedbackShow, setContrastFeedbackShow] = useState(false);
  const [contrastLastCorrect, setContrastLastCorrect] = useState(false);
  const [contrastScore, setContrastScore] = useState(savedContrastScore);
  const [contrastFinished, setContrastFinished] = useState(false);

  useEffect(() => {
    onSaveScores(typoScore, contrastScore);
  }, [typoScore, contrastScore]);

  // Typo handlers
  const handleSelectTypo = (idx: number) => {
    if (typoSelected !== null) return;
    setTypoSelected(idx);
    const q = TYPO_QUESTIONS[typoIdx];
    if (q.options[idx].fontCategory === q.correctCategory) {
      setTypoScore(s => s + 1);
    }
  };

  const nextTypo = () => {
    if (typoIdx < TYPO_QUESTIONS.length - 1) {
      setTypoIdx(i => i + 1);
      setTypoSelected(null);
    } else {
      setTypoFinished(true);
    }
  };

  const resetTypo = () => {
    setTypoIdx(0);
    setTypoSelected(null);
    setTypoScore(0);
    setTypoFinished(false);
  };

  // Contrast handlers
  const handleAnswerContrast = (userSaysGood: boolean) => {
    const q = CONTRAST_QUESTIONS[contrastIdx];
    const isCorrect = userSaysGood === q.isGood;
    setContrastLastCorrect(isCorrect);
    if (isCorrect) setContrastScore(s => s + 1);
    setContrastFeedbackShow(true);
  };

  const nextContrast = () => {
    setContrastFeedbackShow(false);
    if (contrastIdx < CONTRAST_QUESTIONS.length - 1) {
      setContrastIdx(i => i + 1);
    } else {
      setContrastFinished(true);
    }
  };

  const resetContrast = () => {
    setContrastIdx(0);
    setContrastFeedbackShow(false);
    setContrastScore(0);
    setContrastFinished(false);
  };

  const allQuizzesFinished = typoFinished && contrastFinished;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-sm font-bold shadow-sm">
          <Target className="w-4 h-4 text-amber-600" />
          <span>Exercicis Pràctics Intermedis</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Posa a prova els teus coneixements
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Avalua la teva comprensió de la Veu Tipogràfica (12 preguntes) i del Contrast WCAG 2.1 (12 preguntes) abans d'afrontar el Repte Final.
        </p>
      </div>

      {/* EDUCATIONAL GUIDE BEFORE QUIZZES */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Consells Clau abans de Respondre</h3>
            <p className="text-xs text-slate-500 font-medium">Criteris de decisió pedagògica per encertar les preguntes</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-amber-900 block">Al Repte Tipogràfic:</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Analitza els **valors de marca** de cada escenari. *Serifa* = Luxe/Tradició; *Pal Sec* = Tecnologia/Minimalisme; *Script* = Artesania/Amor; *Display* = Rebeldia/Impacte.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-amber-900 block">Al Repte de Contrast:</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Fixa't si la combinació permet llegir el text sense esforç visual. Rebutja combinacions de lluminositat similar (ex. gris sobre blanc, blau fosc sobre negre o vermell sobre verd).
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Selector Tabs */}
      <div className="flex justify-center gap-3 max-w-sm mx-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveQuiz('typo')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeQuiz === 'typo' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Repte Tipogràfic {typoFinished && "✓"}
        </button>
        <button
          onClick={() => setActiveQuiz('contrast')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeQuiz === 'contrast' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Repte de Contrast {contrastFinished && "✓"}
        </button>
      </div>

      {/* TYPOGRAPHY QUIZ */}
      {activeQuiz === 'typo' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 animate-fade-in">
          
          {!typoFinished ? (
            <>
              <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-500">
                <span>Pregunta {typoIdx + 1} de {TYPO_QUESTIONS.length}</span>
                <span className="flex items-center gap-1 text-amber-700 font-extrabold"><Trophy className="w-4 h-4 text-amber-500" /> {typoScore} Punts</span>
              </div>

              <div className="space-y-4">
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-relaxed">
                  {TYPO_QUESTIONS[typoIdx].scenario}
                </p>

                <div className="flex flex-wrap gap-2">
                  {TYPO_QUESTIONS[typoIdx].brandValues.map(v => (
                    <span key={v} className="px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full text-xs font-bold border border-indigo-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {TYPO_QUESTIONS[typoIdx].options.map((opt, idx) => {
                  let btnClass = "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/50";
                  if (typoSelected !== null) {
                    if (opt.fontCategory === TYPO_QUESTIONS[typoIdx].correctCategory) {
                      btnClass = "border-emerald-500 bg-emerald-50 text-emerald-950 shadow-md font-bold";
                    } else if (idx === typoSelected) {
                      btnClass = "border-red-500 bg-red-50 text-red-950 font-bold";
                    } else {
                      btnClass = "border-slate-200 bg-slate-100 text-slate-400 opacity-40";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTypo(idx)}
                      disabled={typoSelected !== null}
                      className={`p-8 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center gap-4 min-h-[180px] ${btnClass}`}
                    >
                      <span className={`text-4xl sm:text-5xl ${opt.fontFamily}`}>Joieria</span>
                      <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1 rounded-md border border-slate-200">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {typoSelected !== null && (
                <div className="bg-amber-50/80 p-6 rounded-2xl border border-amber-200 space-y-4 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-950 text-sm leading-relaxed font-medium">{TYPO_QUESTIONS[typoIdx].explanation}</p>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={nextTypo}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2"
                    >
                      <span>{typoIdx === TYPO_QUESTIONS.length - 1 ? "Veure Resultat" : "Següent Pregunta"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-6">
              <Award className="w-20 h-20 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-3xl font-extrabold text-slate-900">Repte Tipogràfic Completat!</h3>
              <p className="text-xl text-slate-700 font-medium">
                Has encertat <span className="font-extrabold text-indigo-600">{typoScore}</span> de {TYPO_QUESTIONS.length} preguntes.
              </p>
              
              {!contrastFinished ? (
                <button
                  onClick={() => setActiveQuiz('contrast')}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2 mx-auto"
                >
                  <span>Anar al Repte de Contrast →</span>
                </button>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={onCompleteQuizzes}
                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 rounded-2xl font-extrabold text-base shadow-lg flex items-center gap-2 mx-auto"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Desbloquejar el Repte Final Autocorregible!</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* CONTRAST QUIZ */}
      {activeQuiz === 'contrast' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6 animate-fade-in">
          
          {!contrastFinished ? (
            <>
              <div className="flex justify-between items-center text-xs font-bold uppercase text-slate-500">
                <span>Pregunta {contrastIdx + 1} de {CONTRAST_QUESTIONS.length}</span>
                <span className="flex items-center gap-1 text-amber-700 font-extrabold"><Trophy className="w-4 h-4 text-amber-500" /> {contrastScore} Punts</span>
              </div>

              {/* Sample Card */}
              <div 
                className="h-56 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-slate-300 shadow-md transition-colors duration-300"
                style={{ backgroundColor: CONTRAST_QUESTIONS[contrastIdx].bg, color: CONTRAST_QUESTIONS[contrastIdx].fg }}
              >
                <span className="text-xs font-mono uppercase tracking-widest opacity-75 mb-2 border-b border-current pb-1 font-bold">
                  Context: {CONTRAST_QUESTIONS[contrastIdx].context}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold">Es llegeix bé?</h3>
              </div>

              {!contrastFeedbackShow ? (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleAnswerContrast(false)}
                    className="p-6 rounded-2xl bg-red-50 text-red-900 hover:bg-red-100 border border-red-200 font-extrabold text-base flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <X className="w-7 h-7 text-red-600" />
                    <span>No, costa de llegir</span>
                  </button>
                  <button 
                    onClick={() => handleAnswerContrast(true)}
                    className="p-6 rounded-2xl bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200 font-extrabold text-base flex flex-col items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <Check className="w-7 h-7 text-emerald-600" />
                    <span>Sí, és perfecte</span>
                  </button>
                </div>
              ) : (
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  contrastLastCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-red-50 border-red-200 text-red-950'
                }`}>
                  <div className="flex items-center gap-3">
                    {contrastLastCorrect ? <Check className="w-6 h-6 text-emerald-600" /> : <X className="w-6 h-6 text-red-600" />}
                    <h4 className="font-extrabold text-lg">
                      {contrastLastCorrect ? "Molt bé! Resposta correcta." : "Vaja... no és la millor valoració."}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">{CONTRAST_QUESTIONS[contrastIdx].explanation}</p>
                  
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={nextContrast}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-md"
                    >
                      <span>{contrastIdx === CONTRAST_QUESTIONS.length - 1 ? "Veure Resultat" : "Següent Pregunta"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-6">
              <Award className="w-20 h-20 text-amber-500 mx-auto animate-bounce" />
              <h3 className="text-3xl font-extrabold text-slate-900">Repte de Contrast Completat!</h3>
              <p className="text-xl text-slate-700 font-medium">
                Has encertat <span className="font-extrabold text-indigo-600">{contrastScore}</span> de {CONTRAST_QUESTIONS.length} preguntes.
              </p>
              
              {!typoFinished ? (
                <button
                  onClick={() => setActiveQuiz('typo')}
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center gap-2 mx-auto"
                >
                  <span>Anar al Repte Tipogràfic →</span>
                </button>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={onCompleteQuizzes}
                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 rounded-2xl font-extrabold text-base shadow-lg flex items-center gap-2 mx-auto"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Desbloquejar el Repte Final Autocorregible!</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
