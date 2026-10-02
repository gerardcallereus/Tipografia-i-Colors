import React, { useState } from 'react';
import { FontCategory, AdjectiveItem } from '../types';
import { Sparkles, FlaskConical, RotateCcw, Check, Tag, Info, ArrowRight } from 'lucide-react';

const ADJECTIVES: AdjectiveItem[] = [
  // Serifa (Tradició/Luxe)
  { word: "Elegant", category: FontCategory.SERIF },
  { word: "Clàssica", category: FontCategory.SERIF },
  { word: "Seriosa", category: FontCategory.SERIF },
  { word: "Tradicional", category: FontCategory.SERIF },
  { word: "Luxosa", category: FontCategory.SERIF },
  { word: "Prestigiosa", category: FontCategory.SERIF },
  { word: "Acadèmica", category: FontCategory.SERIF },
  { word: "Històrica", category: FontCategory.SERIF },
  { word: "Fina", category: FontCategory.SERIF },
  { word: "Cultural", category: FontCategory.SERIF },
  // Pal Sec (Modernitat/Neteja)
  { word: "Moderna", category: FontCategory.SANS_SERIF },
  { word: "Minimalista", category: FontCategory.SANS_SERIF },
  { word: "Tecnològica", category: FontCategory.SANS_SERIF },
  { word: "Neta", category: FontCategory.SANS_SERIF },
  { word: "Jove", category: FontCategory.SANS_SERIF },
  { word: "Honesta", category: FontCategory.SANS_SERIF },
  { word: "Simple", category: FontCategory.SANS_SERIF },
  { word: "Racional", category: FontCategory.SANS_SERIF },
  { word: "Futurista", category: FontCategory.SANS_SERIF },
  { word: "Global", category: FontCategory.SANS_SERIF },
  // Manuscrita (Personal/Artesà)
  { word: "Artesana", category: FontCategory.SCRIPT },
  { word: "Personal", category: FontCategory.SCRIPT },
  { word: "Romàntica", category: FontCategory.SCRIPT },
  { word: "Creativa", category: FontCategory.SCRIPT },
  { word: "Delicada", category: FontCategory.SCRIPT },
  { word: "Espontània", category: FontCategory.SCRIPT },
  { word: "Fluida", category: FontCategory.SCRIPT },
  { word: "Amable", category: FontCategory.SCRIPT },
  { word: "Natural", category: FontCategory.SCRIPT },
  { word: "Íntima", category: FontCategory.SCRIPT },
  // Decorativa (Impacte/Rebeldia)
  { word: "Rebel", category: FontCategory.DISPLAY },
  { word: "Impactant", category: FontCategory.DISPLAY },
  { word: "Urbana", category: FontCategory.DISPLAY },
  { word: "Cridanera", category: FontCategory.DISPLAY },
  { word: "Divertida", category: FontCategory.DISPLAY },
  { word: "Única", category: FontCategory.DISPLAY },
  { word: "Agressiva", category: FontCategory.DISPLAY },
  { word: "Sorollosa", category: FontCategory.DISPLAY },
  { word: "Caòtica", category: FontCategory.DISPLAY },
  { word: "Experimental", category: FontCategory.DISPLAY },
];

interface FontLabProps {
  onGoToQuizzes?: () => void;
}

export const FontLab: React.FC<FontLabProps> = ({ onGoToQuizzes }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [brandName, setBrandName] = useState('Artífex Joies');
  const [selectedAdjectives, setSelectedAdjectives] = useState<string[]>([]);
  const [result, setResult] = useState<{ category: FontCategory; description: string } | null>(null);

  const toggleAdjective = (word: string) => {
    if (selectedAdjectives.includes(word)) {
      setSelectedAdjectives(prev => prev.filter(w => w !== word));
    } else {
      if (selectedAdjectives.length < 3) {
        setSelectedAdjectives(prev => [...prev, word]);
      }
    }
  };

  const calculateResult = () => {
    if (!brandName || selectedAdjectives.length !== 3) return;

    const counts: Record<string, number> = {
      [FontCategory.SERIF]: 0,
      [FontCategory.SANS_SERIF]: 0,
      [FontCategory.SCRIPT]: 0,
      [FontCategory.DISPLAY]: 0,
    };

    selectedAdjectives.forEach(adj => {
      const match = ADJECTIVES.find(a => a.word === adj);
      if (match) {
        counts[match.category]++;
      }
    });

    let winner = FontCategory.SANS_SERIF;
    let maxVotes = -1;

    Object.entries(counts).forEach(([cat, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        winner = cat as FontCategory;
      }
    });

    let desc = "";
    if (maxVotes === 3) {
      desc = "Has triat tres adjectius molt coherents. La teva marca té una personalitat fortament definida i pura.";
    } else if (maxVotes === 2) {
      desc = "Tens una base sòlida amb un matís enriquidor. Això aporta riquesa a la identitat sense perdre el focus principal.";
    } else {
      desc = "Has seleccionat un conjunt eclèctic d'adjectius. L'algoritme ha identificat l'opció tipogràfica que millor equilibra aquests contrastos.";
    }

    setResult({ category: winner, description: desc });
    setStep(2);
  };

  const reset = () => {
    setResult(null);
    setStep(1);
    setSelectedAdjectives([]);
  };

  const getFontFamilyClass = (cat: FontCategory) => {
    switch (cat) {
      case FontCategory.SERIF: return "font-serif-playfair";
      case FontCategory.SANS_SERIF: return "font-sans-montserrat";
      case FontCategory.SCRIPT: return "font-script-vibes";
      case FontCategory.DISPLAY: return "font-display-glitch";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-sm font-bold shadow-sm">
          <FlaskConical className="w-4 h-4 text-purple-600" />
          <span>Eina 2 — Laboratori d'Adjectius i ADN de Marca</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Troba la font perfecta segons la personalitat
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
          Escriu el nom de la teva marca, tria 3 adjectius que la defineixin i l'algoritme Artífex calcularà la font ideal segons els principis de disseny.
        </p>
      </div>

      {/* EDUCATIONAL GUIDE BEFORE SIMULATOR */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Com funciona l'Anàlisi d'ADN Tipogràfic?</h3>
            <p className="text-xs text-slate-500 font-medium">Instruccions pas a pas abans de començar el simulador</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-purple-900 block">1. Pensa en la Identitat</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Quins valors vols transmetre als teus clients? Què ha de sentir algú en veure el teu projecte per primer cop?
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-purple-900 block">2. Tria 3 Adjectius Clau</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              Selecciona exactament 3 adjectius de la llista (ex. *Elegant*, *Tradicional*, *Luxosa* o *Moderna*, *Neta*, *Tecnològica*).
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
            <span className="font-extrabold text-purple-900 block">3. Analitza el Resultat</span>
            <p className="text-slate-600 font-medium leading-relaxed">
              L'algoritme Artífex calcularà la família tipogràfica que millor equilibra els adjectius triats i et mostrarà la previsualització.
            </p>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          
          {/* Brand Name Input */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white text-center max-w-xl mx-auto space-y-3 shadow-sm">
            <label className="block text-sm font-bold text-slate-700">
              Com es diu la teva marca o projecte?
            </label>
            <input 
              type="text" 
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ex: Artífex Joies, CyberTech..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-center text-2xl font-extrabold text-slate-900 outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-400"
            />
          </div>

          {/* Adjectives Selection Grid */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Tag className="w-5 h-5 text-indigo-600" />
                Tria exactament 3 adjectius de la teva marca:
              </h3>
              <span className={`px-4 py-1.5 rounded-full font-extrabold text-xs border ${
                selectedAdjectives.length === 3
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {selectedAdjectives.length} de 3 seleccionats
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {ADJECTIVES.map((item, idx) => {
                const isSelected = selectedAdjectives.includes(item.word);
                const isDisabled = !isSelected && selectedAdjectives.length >= 3;

                return (
                  <button
                    key={idx}
                    onClick={() => toggleAdjective(item.word)}
                    disabled={isDisabled}
                    className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 border text-center ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50'
                    } ${isDisabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {item.word}
                    {isSelected && <Check className="w-3.5 h-3.5 inline-block ml-1 opacity-90" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex justify-center">
              <button 
                onClick={calculateResult}
                disabled={!brandName || selectedAdjectives.length !== 3}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-extrabold text-base shadow-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Analitzar ADN i Recomanar Font
              </button>
            </div>
          </div>

        </div>
      )}

      {step === 2 && result && (
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl max-w-4xl mx-auto animate-fade-in space-y-0">
          
          {/* Result Header */}
          <div className="bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100 p-8 text-center border-b border-indigo-200 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">Resultat de l'Algoritme</span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{result.category}</h3>
            
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {selectedAdjectives.map(adj => (
                <span key={adj} className="px-3 py-1 bg-white text-indigo-900 rounded-full text-xs font-bold border border-indigo-200 shadow-sm">
                  {adj}
                </span>
              ))}
            </div>
          </div>

          {/* Live Brand Preview */}
          <div className="p-12 text-center bg-slate-50 border-b border-slate-200 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">Logotip i Nom de Marca</span>
            <h1 className={`text-5xl sm:text-7xl lg:text-8xl text-slate-900 ${getFontFamilyClass(result.category)} leading-tight drop-shadow-sm`}>
              {brandName}
            </h1>
          </div>

          {/* Explanation */}
          <div className="p-8 space-y-6 bg-white">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-700 border border-indigo-200 shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Per què aquesta tipografia?</h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {result.description} Els atributs que has triat ({selectedAdjectives.join(', ').toLowerCase()}) demanen 
                  una font que transmeti <strong>{
                    result.category === FontCategory.SERIF ? 'respecte, elegància i tradició' :
                    result.category === FontCategory.SANS_SERIF ? 'modernitat, claredat i futur' :
                    result.category === FontCategory.SCRIPT ? 'artesania, proximitat i toc personal' :
                    'impacte visual i rebel·lia urbana'
                  }</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <button 
                onClick={reset}
                className="py-3 px-6 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Provar uns altres adjectius
              </button>

              {onGoToQuizzes && (
                <button
                  onClick={onGoToQuizzes}
                  className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Completar i anar als Quizzes (Mòdul 5)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
