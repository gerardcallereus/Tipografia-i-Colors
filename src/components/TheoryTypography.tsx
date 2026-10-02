import React, { useState } from 'react';
import { FontCategory } from '../types';
import { ArrowRight, CheckCircle, Info, Volume2 } from 'lucide-react';

interface TheoryTypographyProps {
  onGoToNextModule: () => void;
}

const slides = [
  {
    category: FontCategory.SERIF,
    title: "1. La Serifa (Serif): La Clàssica",
    fontFamily: "font-serif-playfair",
    sample: "Artífex Joies",
    keywords: ["Elegància", "Tradició", "Respecte", "Alta Gamma", "Història"],
    description: "Fixa't en els acabats de les lletres: tenen petits 'peus' o remats (serifes). Aquest estil té l'origen en les inscripcions tallades en pedra durant l'Antic Imperi Romà.",
    usage: "Utilitza-la si la teva marca de joieria o producte és cara, exclusiva, tradicional o vol transmetre molta serietat i prestigi històric.",
    color: "bg-amber-100/70 border-amber-200 text-amber-950",
    badgeColor: "bg-amber-200 text-amber-900 border-amber-300"
  },
  {
    category: FontCategory.SANS_SERIF,
    title: "2. Pal Sec (Sans Serif): La Moderna",
    fontFamily: "font-sans-montserrat",
    sample: "ARTÍFEX MODERN",
    keywords: ["Minimalisme", "Claredat", "Futur", "Honestedat", "Tecnologia"],
    description: "'Sans' significa 'sense'. Són lletres nues, geomètriques i netes. No tenen cap ornament ni remat que distregui l'atenció de l'essencial.",
    usage: "Ideal per a tecnologia contemporània, joieria geomètrica, disseny unisex, interfícies web o marques que volen mostrar-se modernes i accessibles.",
    color: "bg-indigo-100/70 border-indigo-200 text-indigo-950",
    badgeColor: "bg-indigo-200 text-indigo-900 border-indigo-300"
  },
  {
    category: FontCategory.SCRIPT,
    title: "3. Manuscrita (Script): L'Artesana",
    fontFamily: "font-script-vibes",
    sample: "Artífex Handmade",
    keywords: ["Creativitat", "Personal", "Amor", "Fet a mà", "Proximitat"],
    description: "Imita l'escriptura humana manual feta amb ploma, cal·ligrafia o pinzell. Presenta corbes fluides i sovint lletres enllaçades entre sí.",
    usage: "Perfecta si els teus productes són de factura artesanal ('handmade'), personalitzats, romàntics o transmeten la cura directa d'una persona.",
    color: "bg-rose-100/70 border-rose-200 text-rose-950",
    badgeColor: "bg-rose-200 text-rose-900 border-rose-300"
  },
  {
    category: FontCategory.DISPLAY,
    title: "4. Decorativa (Display): La Rebel",
    fontFamily: "font-display-glitch",
    sample: "ARTÍFEX",
    keywords: ["Impacte", "Diversió", "Unicitat", "Cridanera", "Carrer"],
    description: "Fonts dissenyades expressament per NO passar desapercebudes. Trenquen totes les normes convencionals amb formes expressives, efectes i molta força visual.",
    usage: "Atenció! Utilitza-la NOMÉS per al logotip o títols molt curts. Si redactes un paràgraf llarg amb aquesta font, la llegibilitat serà nula.",
    color: "bg-purple-100/70 border-purple-200 text-purple-950",
    badgeColor: "bg-purple-200 text-purple-900 border-purple-300"
  }
];

export const TheoryTypography: React.FC<TheoryTypographyProps> = ({ onGoToNextModule }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Module Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-bold shadow-sm">
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>Mòdul 1 — LA TIPOGRAFIA (La Veu de la Marca)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Com parla la teva marca sense dir cap paraula?
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
          La tipografia és la veu visual d'un projecte. Canviar la font d'un text pot transmetre des d'elegància aristocràtica fins a un esperit rebel de carrer.
        </p>
      </div>

      {/* Main Slide Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-lg flex flex-col lg:flex-row bg-white">
        
        {/* Left Side: Font Preview Display */}
        <div className={`w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-slate-200 relative min-h-[380px] ${slide.color}`}>
          
          <div className="absolute top-6 left-6">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border ${slide.badgeColor}`}>
              {slide.category}
            </span>
          </div>

          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em] mb-6 font-bold">Mostra en temps real</p>
          
          <h3 className={`text-5xl md:text-7xl ${slide.fontFamily} text-center leading-tight transition-transform duration-500 hover:scale-105 my-4 px-4 text-slate-900 drop-shadow-sm`}>
            {slide.sample}
          </h3>

          <p className={`mt-6 text-2xl ${slide.fontFamily} opacity-80 text-slate-700`}>
            Aa Bb Cc 123
          </p>

          <div className="mt-8 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Theory Details & Guidelines */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-between space-y-6 bg-white">
          
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Fitxa {currentSlide + 1} de {slides.length}</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1 mb-4">{slide.title}</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <p className="text-slate-700 text-base leading-relaxed font-medium">{slide.description}</p>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 text-sm">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p><strong className="text-blue-950 block mb-0.5">Quan utilitzar-la?</strong> {slide.usage}</p>
              </div>
            </div>
          </div>

          {/* Keywords / Emotion Badges */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Emocions que transmet:</span>
            <div className="flex flex-wrap gap-2">
              {slide.keywords.map((kw) => (
                <span key={kw} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>

            <button
              onClick={() => {
                if (isLast) {
                  onGoToNextModule();
                } else {
                  setCurrentSlide(prev => prev + 1);
                }
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              <span>{isLast ? "Continuar a Mòdul 2 (Colors)" : "Següent Estil"}</span>
              {isLast ? <CheckCircle className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
