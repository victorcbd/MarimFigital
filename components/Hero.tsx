import { motion } from 'framer-motion';
import { ArrowRight, Anchor } from 'lucide-react';

interface HeroProps {
  onNavigate: () => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gray-50">
      {/* Background Image Layer - Grayscale Olinda */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://historialuso.an.gov.br/images/O_glossario/OR_2026_VILA_DE_OLINDA_.jpg" 
          alt="Olinda Antiga" 
          className="w-full h-full object-cover grayscale opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
      </div>

      {/* Decorative Blocks */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-0 right-0 w-1/3 h-full hidden lg:block"
      >
        <div className="h-1/3 bg-marim-yellow w-full opacity-90"></div>
        <div className="h-1/3 bg-marim-red w-3/4 ml-auto opacity-90"></div>
        <div className="h-1/3 bg-marim-blue w-1/2 ml-auto opacity-90"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Anchor size={14} className="text-marim-yellow" />
            <span>Mais Inovação em Olinda</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 font-['Space_Grotesk']"
          >
            Olinda, o território que aponta o <span className="text-marim-yellow">futuro</span> para o Brasil.
            <br />
            <span className="text-2xl md:text-4xl block mt-4 font-light text-gray-300">Há 500 anos.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed border-l-4 border-marim-red pl-6"
          >
            Entre o passado que resiste e o futuro que insiste, Olinda habita um espaço-tempo próprio. O <strong>Hub Marim Figital</strong> nasce como um manifesto coletivo para provar que a inovação brota da alma do território.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={onNavigate}
              className="bg-marim-yellow text-marim-dark font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              Conheça a 1º Jornada de Inovação do Marim
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
                onClick={() => document.getElementById('conceito')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              Entender o Hub
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};