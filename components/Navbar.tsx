import { useState, useEffect } from 'react';
import { Menu, X, Home, Rocket } from 'lucide-react';
import { ViewState } from '../App';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Navbar = ({ currentView, onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force background on sub-pages
  const hasBackground = isScrolled || currentView !== 'home';

  const NavItem = ({ view, label, icon: Icon }: { view: ViewState, label: string, icon: any }) => (
    <button
      onClick={() => {
        onNavigate(view);
        setIsOpen(false);
      }}
      className={`flex items-center gap-2 text-sm font-medium transition-colors ${
        currentView === view 
          ? 'text-marim-yellow font-bold' 
          : hasBackground ? 'text-gray-600 hover:text-marim-blue' : 'text-white hover:text-marim-yellow'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${hasBackground ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => { onNavigate('home'); setIsOpen(false); }}
        >
           <div className="w-8 h-8 bg-marim-yellow rounded-tr-xl rounded-bl-xl group-hover:rotate-12 transition-transform"></div>
           <span className={`text-2xl font-bold tracking-tighter ${hasBackground ? 'text-marim-dark' : 'text-marim-dark md:text-white'}`}>
             MARIM <span className="font-light">FIGITAL</span>
           </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem view="home" label="Início" icon={Home} />
          <NavItem view="edital" label="A Jornada" icon={Rocket} />
          
          <button 
            className="bg-marim-yellow text-marim-dark px-5 py-2 rounded-full font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
            onClick={() => onNavigate('edital')}
          >
            Inscrever-se
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={`${hasBackground ? 'text-marim-dark' : 'text-marim-dark'} focus:outline-none`}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-6 md:hidden h-screen">
          <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="flex items-center gap-3 text-lg font-bold text-gray-800 active:text-marim-yellow">
            <Home size={20} /> Início
          </button>
          <button onClick={() => { onNavigate('edital'); setIsOpen(false); }} className="flex items-center gap-3 text-lg font-bold text-gray-800 active:text-marim-yellow">
            <Rocket size={20} /> A Jornada de Inovação
          </button>
          <hr />
          <button 
            className="bg-marim-yellow text-center text-marim-dark px-5 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            onClick={() => { onNavigate('edital'); setIsOpen(false); }}
          >
            Inscrever-se
          </button>
        </div>
      )}
    </nav>
  );
};