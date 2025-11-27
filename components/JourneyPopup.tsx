import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { ViewState } from '../App';

interface JourneyPopupProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const JourneyPopup = ({ currentView, onNavigate }: JourneyPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Aparece após 4 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Não mostrar se:
  // 1. O usuário fechou (dismissed)
  // 2. O usuário já está na página do edital
  // 3. O tempo de espera (4s) ainda não passou
  if (isDismissed || currentView === 'edital' || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 w-full max-w-[90%] md:max-w-sm"
      >
        <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 relative pr-10 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)] transition-shadow">
          <div className="bg-marim-yellow/20 p-3 rounded-full text-marim-dark shrink-0">
            <Rocket size={24} />
          </div>
          <div>
            <h4 className="font-bold text-marim-dark text-sm leading-tight mb-1">Jornada de Inovação</h4>
            <p className="text-xs text-gray-500 mb-3 leading-tight">As inscrições para o Ideathon estão abertas. Participe!</p>
            <button
              onClick={() => onNavigate('edital')}
              className="text-xs font-bold bg-marim-dark text-white px-4 py-2 rounded-lg hover:bg-marim-blue transition-colors shadow-sm"
            >
              Ver Detalhes
            </button>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Fechar aviso"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
