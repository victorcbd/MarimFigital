import React, { useState } from 'react';
import { Bell, ShieldAlert, Music, UserCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const Notifications = () => {
  const [preferences, setPreferences] = useState({
    safety: true,
    traffic: true,
    shows: false,
    blocks: true,
  });

  const [followedArtists, setFollowedArtists] = useState<string[]>(['Alceu Valença']);
  const [isSaved, setIsSaved] = useState(false);

  const artists = ['Alceu Valença', 'Elba Ramalho', 'Nação Zumbi', 'Lenine', 'Academia da Berlinda'];

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleArtist = (artist: string) => {
    setFollowedArtists(prev => 
      prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
    );
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-2">Central de Alertas</h1>
        <p className="text-gray-600 mb-8">Personalize o que você quer receber durante o carnaval.</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-marim-blue/5">
            <h2 className="font-bold text-lg flex items-center gap-2 text-marim-dark">
              <ShieldAlert size={20} className="text-marim-red" />
              Segurança e Utilidade Pública
            </h2>
          </div>
          <div className="p-6 space-y-6">
            <Toggle 
              label="Alertas de Segurança" 
              desc="Receba avisos urgentes sobre tumultos ou áreas interditadas."
              active={preferences.safety}
              onToggle={() => togglePreference('safety')}
            />
            <Toggle 
              label="Trânsito e Bloqueios" 
              desc="Atualizações sobre ruas fechadas e rotas alternativas."
              active={preferences.traffic}
              onToggle={() => togglePreference('traffic')}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100 bg-marim-yellow/10">
            <h2 className="font-bold text-lg flex items-center gap-2 text-marim-dark">
              <Music size={20} className="text-marim-dark" />
              Programação Favorita
            </h2>
          </div>
          <div className="p-6 space-y-6">
             <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3">Artistas e Blocos</h3>
                <div className="flex flex-wrap gap-2">
                  {artists.map(artist => (
                    <button
                      key={artist}
                      onClick={() => toggleArtist(artist)}
                      className={`px-3 py-1 rounded-full text-sm border transition-all active:scale-95 ${followedArtists.includes(artist) ? 'bg-marim-dark text-white border-marim-dark' : 'bg-white text-gray-600 border-gray-300 hover:border-marim-yellow'}`}
                    >
                      {artist}
                    </button>
                  ))}
                </div>
             </div>
             
             <Toggle 
              label="Início dos Shows" 
              desc="Seja avisado 15 minutos antes dos seus artistas favoritos subirem ao palco."
              active={preferences.shows}
              onToggle={() => togglePreference('shows')}
            />
            <Toggle 
              label="Passagem de Blocos" 
              desc="Alerta de aproximação dos blocos que você segue."
              active={preferences.blocks}
              onToggle={() => togglePreference('blocks')}
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${isSaved ? 'bg-green-500 text-white' : 'bg-marim-yellow text-marim-dark hover:bg-yellow-400'}`}
        >
          {isSaved ? <CheckCircle size={24} /> : <Bell size={24} />}
          {isSaved ? 'Preferências Salvas!' : 'Salvar Preferências'}
        </button>
      </div>
    </div>
  );
};

interface ToggleProps {
    label: string;
    desc: string;
    active: boolean;
    onToggle: () => void;
}

const Toggle = ({ label, desc, active, onToggle }: ToggleProps) => (
  <div 
    className="flex justify-between items-start gap-4 cursor-pointer group" 
    onClick={onToggle}
  >
    <div className="flex-1">
      <div className="font-bold text-gray-800 group-hover:text-marim-blue transition-colors">{label}</div>
      <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
    </div>
    <div 
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center flex-shrink-0 mt-1 ${active ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}
    >
      <motion.div 
        layout 
        className="w-4 h-4 rounded-full bg-white shadow-md"
      />
    </div>
  </div>
);