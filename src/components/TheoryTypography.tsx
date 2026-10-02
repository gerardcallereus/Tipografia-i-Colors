import React, { useState } from 'react';
import { FontCategory } from '../types';
import { ArrowRight, CheckCircle, Info, Volume2, BookOpen, Layers, Sparkles, Award } from 'lucide-react';

interface TheoryTypographyProps {
  onGoToNextModule: () => void;
}

const slides = [
  {
    category: FontCategory.SERIF,
    title: "1. La Serifa (Serif): La Clàssica i Elegant",
    fontFamily: "font-serif-playfair",
    sample: "Artífex Joies",
    keywords: ["Elegància", "Tradició", "Respecte", "Alta Gamma", "Història"],
    anatomy: "Té petits remats o 'peus' als extrems de les lletres. Contrast elevat entre línies gruixudes i fines.",
    origins: "Inscripcions romanes gravades a la pedra. És l'estil utilitzat durant segles en els llibres de text impresos.",
    examples: "Rolex, Vogue, The New York Times, Tiffany & Co.",
    description: "Fixa't en els acabats de les lletres: tenen petits 'peus' o remats (serifes). Aquest estil té l'origen en les inscripcions tallades en pedra durant l'Antic Imperi Romà.",
    usage: "Utilitza-la si la teva marca de joieria, editorial o producte és cara, exclusiva, tradicional o vol transmetre molta serietat i prestigi històric.",
    color: "bg-amber-100/70 border-amber-200 text-amber-950",
    badgeColor: "bg-amber-200 text-amber-900 border-amber-300"
  },
  {
    category: FontCategory.SANS_SERIF,
    title: "2. Pal Sec (Sans Serif): La Moderna i Neta",
    fontFamily: "font-sans-montserrat",
    sample: "ARTÍFEX MODERN",
    keywords: ["Minimalisme", "Claredat", "Futur", "Honestedat", "Tecnologia"],
    anatomy: "Lletres geomètriques sense remats als extrems. Gruix de traç uniforme i línies despullades.",
    origins: "Nascuda al segle XIX amb la revolució industrial i perfeccionada a Suïssa al segle XX per a la màxima llegibilitat.",
    examples: "Google, Apple, Tesla, Spotify, Microsoft, Panasonic.",
    description: "'Sans' significa 'sense'. Són lletres nues, geomètriques i netes. No tenen cap ornament ni remat que distregui l'atenció de l'essencial.",
    usage: "Ideal per a tecnologia contemporània, joieria geomètrica, disseny unisex, interfícies web o marques que volen mostrar-se modernes, clares i accessibles.",
    color: "bg-indigo-100/70 border-indigo-200 text-indigo-950",
    badgeColor: "bg-indigo-200 text-indigo-900 border-indigo-300"
  },
  {
    category: FontCategory.SCRIPT,
    title: "3. Manuscrita (Script): L'Artesana i Humana",
    fontFamily: "font-script-vibes",
    sample: "Artífex Handmade",
    keywords: ["Creativitat", "Personal", "Amor", "Fet a mà", "Proximitat"],
    anatomy: "Traços fluides i corbs que imiten la cal·ligrafia manual. Les lletres sovint es connecten entre sí.",
    origins: "Escriptura tradicional amb ploma d'ànec o pinzell. Evoca la cura d'una carta personal escrita a mà.",
    examples: "Disney, Coca-Cola, Instagram, Ray-Ban, Cartier (signatura).",
    description: "Imita l'escriptura humana manual feta amb ploma, cal·ligrafia o pinzell. Presenta corbes fluides i sovint lletres enllaçades entre sí.",
    usage: "Perfecta si els teus productes són de factura artesanal ('handmade'), personalitzats, romàntics o transmeten la cura directa d'una persona.",
    color: "bg-rose-100/70 border-rose-200 text-rose-950",
    badgeColor: "bg-rose-200 text-rose-900 border-rose-300"
  },
  {
    category: FontCategory.DISPLAY,
    title: "4. Decorativa (Display): La Rebel d'Alt Impacte",
    fontFamily: "font-display-glitch",
    sample: "ARTÍFEX",
    keywords: ["Impacte", "Diversió", "Unicitat", "Cridanera", "Carrer"],
    anatomy: "Formes inusuals, efectes visuals (glitch, ombres, textura) i proporcions exagerades.",
    origins: "Cartells publicitaris del segle XX, cinema de ciència-ficció, cultura del còmic, graffiti i videojocs.",
    examples: "Star Wars, Monster Energy, Sega, Metallica, Dunkin'.",
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
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-10">
      
      {/* Module Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-800 text-sm font-bold shadow-sm">
          <Volume2 className="w-4 h-4 text-indigo-600" />
          <span>Mòdul 1 — LA TIPOGRAFIA (La Veu de la Marca)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          Com parla la teva marca sense dir cap paraula?
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto font-medium">
          La tipografia és l'ambaixadora silenciosa del disseny visual. Abans de llegir el significat de les paraules, el nostre cervell interpreta el caràcter emocional de la font.
        </p>
      </div>

      {/* EXTENDED THEORY & PRINCIPLES CARD */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Fonaments Teòrics del Disseny Tipogràfic</h3>
            <p className="text-xs text-slate-500 font-medium">Conceptes clau que tot dissenyador ha de dominar abans de crear una marca</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>1. La Jerarquia Visual</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              No totes les paraules tenen el mateix pes. La mida, el gruix (bold) i la font guien l'ull de l'usuari des del títol principal (H1) fins al contingut secundari.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>2. La Veu Emocional</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Cada lletra té personalitat. Un text serietós amb font de dibuixos animats o un festival rebel amb font clàssica generen una incoherència que destrueix la confiança.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>3. Llegibilitat i Funció</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Una font bonica però il·legible és un error de disseny. En blocs de text llargs cal prioritzar la claredat i estalviar les fonts decoratives per a titulars d'impacte.
            </p>
          </div>
        </div>
      </div>

      {/* Simulator Guidance Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-between text-indigo-950 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>Explora a continuació les **4 grans famílies tipogràfiques** amb mostres visuals en temps real:</span>
        </div>
        <span className="text-xs font-mono font-bold text-indigo-700 uppercase hidden sm:inline">Fitxa {currentSlide + 1} / 4</span>
      </div>

      {/* Main Slide Card (Interactive Deck) */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200 shadow-lg flex flex-col lg:flex-row bg-white">
        
        {/* Left Side: Font Preview Display */}
        <div className={`w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-slate-200 relative min-h-[400px] ${slide.color}`}>
          
          <div className="absolute top-6 left-6">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border ${slide.badgeColor}`}>
              {slide.category}
            </span>
          </div>

          <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.3em] mb-6 font-bold">Simulador de Veu en Temps Real</p>
          
          <h3 className={`text-4xl sm:text-6xl md:text-7xl ${slide.fontFamily} text-center leading-tight transition-transform duration-500 hover:scale-105 my-4 px-4 text-slate-900 drop-shadow-sm`}>
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
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Família {currentSlide + 1} de {slides.length}</span>
              <span className="text-xs font-mono text-slate-400 font-bold">Projecte Artífex</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">{slide.title}</h3>
            
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <p className="text-slate-700 text-sm leading-relaxed font-medium">{slide.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Anatomia de la lletra:</span>
                  <span className="text-slate-600">{slide.anatomy}</span>
                </div>
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-0.5">Marques reals que la usen:</span>
                  <span className="text-indigo-700 font-bold">{slide.examples}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 text-xs sm:text-sm">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p><strong className="text-blue-950 block mb-0.5">Quan utilitzar-la?</strong> {slide.usage}</p>
              </div>
            </div>
          </div>

          {/* Keywords / Emotion Badges */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Valors visuals que transmet:</span>
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

