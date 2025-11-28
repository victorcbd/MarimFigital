import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Concept } from './components/Concept';
import { HubDifferentials } from './components/HubDifferentials';
import { TalentAttraction } from './components/TalentAttraction';
import { Partners } from './components/Partners';
import { FAQ } from './components/FAQ';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EditalSummary } from './components/EditalSummary';
import { JourneyPopup } from './components/JourneyPopup';
import { motion, useScroll, useSpring } from 'framer-motion';

export type ViewState = 'home' | 'edital';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'edital':
        return <EditalSummary />;
      default:
        return (
          <>
            <section id="hero">
              <Hero onNavigate={() => setCurrentView('edital')} />
            </section>
            <section id="conceito">
              <Concept />
            </section>
            <section id="diferenciais" className="bg-gray-50">
              <HubDifferentials />
            </section>
            <section id="talentos">
              <TalentAttraction onNavigate={setCurrentView} />
            </section>
            <section id="quem-faz" className="bg-gray-50">
              <Partners />
            </section>
            <section id="faq">
              <FAQ />
            </section>
            
            {/* Call To Action Institutional */}
            <section className="py-24 bg-marim-dark text-white text-center px-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://picsum.photos/1200/800?grayscale')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="relative z-10 max-w-4xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight font-['Space_Grotesk']">
                   Participe da Primeira Ação do Hub:<br/>
                   <span className="text-marim-yellow">Jornada de Inovação</span>
                 </h2>
                 <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                   O primeiro passo prático para transformar Olinda em um laboratório vivo de criatividade e tecnologia.
                 </p>
                 <button 
                   onClick={() => setCurrentView('edital')}
                   className="bg-marim-blue text-white font-bold text-xl px-12 py-5 rounded-full hover:scale-105 transition-transform hover:bg-blue-600 shadow-lg"
                 >
                   Ver Detalhes da Jornada
                 </button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="bg-white text-marim-dark overflow-x-hidden selection:bg-marim-yellow selection:text-marim-dark min-h-screen flex flex-col">
      {/* Progress Bar (only on home for scrolling context) */}
      {currentView === 'home' && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-marim-yellow via-marim-red to-marim-blue origin-left z-50"
          style={{ scaleX }}
        />
      )}

      <Navbar currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow pt-20 md:pt-0">
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentView} />
      
      {/* Pop-up Flutuante */}
      <JourneyPopup currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}