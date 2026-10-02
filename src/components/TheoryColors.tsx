import React, { useState } from 'react';
import { Sun, HeartHandshake, Eye, Check, X, ArrowRight, ShieldCheck, Palette } from 'lucide-react';

interface TheoryColorsProps {
  onGoToTools: () => void;
}

export const TheoryColors: React.FC<TheoryColorsProps> = ({ onGoToTools }) => {
  const [activeTab, setActiveTab] = useState<'contrast' | 'accessibility' | 'psychology'>('contrast');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-800 text-sm font-bold shadow-sm">
          <Palette className="w-4 h-4 text-pink-600" />
          <span>Mòdul 2 — LA PALETA DE COLORS (L'Emoció i l'Accessibilitat)</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
          El color no és només estètica: és emoció i llegibilitat
        </h2>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-medium">
          Comprendre el contrast WCAG i la psicologia del color ens permet crear interfícies boniques, emocionants i accessibles per a tothom.
        </p>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex justify-center gap-2 max-w-md mx-auto bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('contrast')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'contrast' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. El Contrast WCAG
        </button>
        <button
          onClick={() => setActiveTab('accessibility')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'accessibility' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Accessibilitat
        </button>
        <button
          onClick={() => setActiveTab('psychology')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'psychology' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Psicologia del Color
        </button>
      </div>

      {/* Section 1: Contrast WCAG */}
      {activeTab === 'contrast' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl space-y-8 animate-fade-in border border-slate-200 bg-white">
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                <Sun className="w-7 h-7 text-amber-500" />
                Per què no veig la pantalla al sol?
              </h3>
              <p className="text-slate-700 text-base leading-relaxed font-medium">
                T'ha passat mai que estàs al carrer a plena llum del dia i no aconsegueixes llegir un missatge al mòbil? O quan entres a una web amb text gris clar sobre fons blanc i et fan mal els ulls?
              </p>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-900 text-sm">
                <p className="font-bold mb-1">Això és culpa del CONTRAST!</p>
                <p className="text-slate-700">
                  El contrast és la diferència de "lluminositat" entre el text i el fons. Si la diferència és petita, el nostre cervell ha de fer un esforç insostenible per desxifrar les lletres.
                </p>
              </div>
            </div>

            {/* Traffic Light WCAG Rules */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                La Regla del "Semàfor WCAG"
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-red-50 p-3.5 rounded-xl border border-red-200">
                  <span className="bg-red-500 text-white font-extrabold text-xs px-2.5 py-1 rounded">FAIL</span>
                  <span className="text-slate-800 text-sm font-medium">Menys de <strong>3:1</strong>. Molt difícil de llegir. Prohibit per a text normal!</span>
                </div>

                <div className="flex items-center gap-3 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                  <span className="bg-amber-400 text-slate-950 font-extrabold text-xs px-2.5 py-1 rounded">AA</span>
                  <span className="text-slate-800 text-sm font-medium">Mínim <strong>4.5:1</strong>. És l'aprovat estàndard WCAG. Llegibilitat garantida.</span>
                </div>

                <div className="flex items-center gap-3 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                  <span className="bg-emerald-500 text-white font-extrabold text-xs px-2.5 py-1 rounded">AAA</span>
                  <span className="text-slate-800 text-sm font-medium">Òptim <strong>7:1+</strong>. L'excel·lent. Contrast altíssim i visió nítida.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Design Rules Grid */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-4">Trucs ràpids de disseny visual</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="bg-slate-800 text-slate-400 py-3 rounded-lg font-bold text-sm mb-2">Fosc / Fosc</div>
                <span className="text-red-600 text-xs font-bold flex items-center justify-center gap-1"><X className="w-3.5 h-3.5" /> Error</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="bg-slate-800 text-white py-3 rounded-lg font-bold text-sm mb-2">Clar / Fosc</div>
                <span className="text-emerald-600 text-xs font-bold flex items-center justify-center gap-1"><Check className="w-3.5 h-3.5" /> Genial</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="bg-white text-yellow-500 py-3 rounded-lg font-bold text-sm mb-2 border border-slate-200">Clar / Clar</div>
                <span className="text-red-600 text-xs font-bold flex items-center justify-center gap-1"><X className="w-3.5 h-3.5" /> Error</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="bg-white text-slate-900 py-3 rounded-lg font-bold text-sm mb-2 border border-slate-200">Fosc / Clar</div>
                <span className="text-emerald-600 text-xs font-bold flex items-center justify-center gap-1"><Check className="w-3.5 h-3.5" /> Genial</span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Section 2: Accessibility */}
      {activeTab === 'accessibility' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl space-y-6 animate-fade-in border border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <HeartHandshake className="w-8 h-8 text-pink-500" />
            <h3 className="text-2xl font-extrabold text-slate-900">Dissenyar per a tothom (Disseny Inclusiu)</h3>
          </div>

          <p className="text-slate-700 text-base leading-relaxed font-medium">
            A internet no tothom hi veu amb la mateixa claredat. Es calcula que més del 8% dels homes i el 0.5% de les dones tenen daltonisme o alteracions en la percepció del color.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-indigo-50/60 p-6 rounded-2xl border border-indigo-100 space-y-2">
              <h4 className="text-indigo-900 font-bold text-lg flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" /> Daltonisme (Deuteranopia / Protanopia)
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                Moltes persones no distingeixen entre vermell i verd. Si utilitzes text vermell sobre fons verd (o al revés), per a ells el contingut serà completament invisible i borrós!
              </p>
            </div>

            <div className="bg-amber-50/60 p-6 rounded-2xl border border-amber-100 space-y-2">
              <h4 className="text-amber-900 font-bold text-lg flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-600" /> Condicions ambientals i edat
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                Fins i tot amb una visió del 100%, el sol directe sobre el cristall del mòbil o la fatiga visual al final del dia redueixen el contrast percebut fins a un 60%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 3: Psychology */}
      {activeTab === 'psychology' && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl space-y-6 animate-fade-in border border-slate-200 bg-white">
          <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
            <Palette className="w-7 h-7 text-purple-600" />
            Psicologia Emocional del Color
          </h3>

          <p className="text-slate-700 text-base font-medium">
            Els colors desencadenen respostes emocionals inconscients a l'instant. Seleccionar la paleta adequada reforça el missatge de la marca:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200">
              <div className="w-4 h-4 rounded-full bg-sky-500 mb-2"></div>
              <h4 className="font-bold text-sky-900">Blau / Cian</h4>
              <p className="text-xs text-slate-700 mt-1">Confiança, seguretat, tecnologia, seriositat, tranquil·litat corporativa.</p>
            </div>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
              <div className="w-4 h-4 rounded-full bg-rose-500 mb-2"></div>
              <h4 className="font-bold text-rose-900">Vermell</h4>
              <p className="text-xs text-slate-700 mt-1">Energia, passió, urgència, perill, força i altes pulsacions.</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500 mb-2"></div>
              <h4 className="font-bold text-emerald-900">Verd</h4>
              <p className="text-xs text-slate-700 mt-1">Natura, salut, sostenibilitat, creixement, frescor i renovació.</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <div className="w-4 h-4 rounded-full bg-amber-400 mb-2"></div>
              <h4 className="font-bold text-amber-900">Groc / Taronja</h4>
              <p className="text-xs text-slate-700 mt-1">Optimisme, calidesa, atenció, joventut, energia solar i creativitat.</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <div className="w-4 h-4 rounded-full bg-purple-500 mb-2"></div>
              <h4 className="font-bold text-purple-900">Púrpura / Lila</h4>
              <p className="text-xs text-slate-700 mt-1">Luxe, exclusivitat, màgia, imaginació, espiritualitat i misteri.</p>
            </div>

            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
              <div className="w-4 h-4 rounded-full bg-slate-900 mb-2"></div>
              <h4 className="font-bold text-slate-900">Negre &amp; Blanc</h4>
              <p className="text-xs text-slate-700 mt-1">Minimalisme, claredat pura, elegància intemporal, contrast suprem.</p>
            </div>

          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onGoToTools}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105"
        >
          <span>Anar a les Eines Interactives</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
