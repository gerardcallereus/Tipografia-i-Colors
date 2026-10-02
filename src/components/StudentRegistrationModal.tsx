import React, { useState } from 'react';
import { StudentInfo, StudentGroup } from '../types';
import { User, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';

interface StudentRegistrationModalProps {
  onRegister: (info: StudentInfo) => void;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({ onRegister }) => {
  const [nom, setNom] = useState('');
  const [cognoms, setCognoms] = useState('');
  const [grup, setGrup] = useState<StudentGroup>('1A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !cognoms.trim()) return;

    onRegister({
      nom: nom.trim(),
      cognoms: cognoms.trim(),
      grup,
      registeredAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl max-w-lg w-full border border-indigo-200 bg-white shadow-2xl space-y-6 animate-fade-in relative">
        
        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block">Projecte Artífex — Identificació d'Alumne/a</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Benvingut/da al Curs de Tipografia i Colors
          </h2>
          <p className="text-slate-600 text-sm font-medium">
            Per començar i desar el teu progrés automàticament, introdueix les teves dades d'estudiant.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" /> Nom
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Maria"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" /> Cognoms
            </label>
            <input
              type="text"
              required
              value={cognoms}
              onChange={(e) => setCognoms(e.target.value)}
              placeholder="Ex: Garcia Vila"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Grup / Classe
            </label>
            <select
              value={grup}
              onChange={(e) => setGrup(e.target.value as StudentGroup)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm outline-none focus:border-indigo-500 focus:bg-white transition-colors cursor-pointer"
            >
              <option value="1A">Grup 1r A</option>
              <option value="1B">Grup 1r B</option>
              <option value="2A">Grup 2n A</option>
              <option value="2B">Grup 2n B</option>
              <option value="3A">Grup 3r A</option>
              <option value="3B">Grup 3r B</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!nom.trim() || !cognoms.trim()}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-base shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Començar l'Activitat</span>
            </button>
          </div>

        </form>

        <p className="text-[11px] text-slate-500 text-center font-medium">
          🔒 El teu progrés es desarà automàticament al Chromebook i no es perdrà en tancar.
        </p>

      </div>
    </div>
  );
};
