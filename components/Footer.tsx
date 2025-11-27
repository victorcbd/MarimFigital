import from;
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { ViewState } from '../App';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
}

export const Footer = ({ onNavigate }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">MARIM FIGITAL</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              O primeiro hub de inovação territorial de Olinda. Misturando tradição, tecnologia e gente pra criar um futuro massa.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Linkedin size={20} />} />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-marim-yellow">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">O Projeto</button></li>
              <li><button onClick={() => onNavigate('edital')} className="hover:text-white transition-colors">Edital & Inscrição</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-marim-yellow">Contato</h4>
            <ul className="space-y-2 text-gray-400">
              <li>oi@marimfigital.com.br</li>
              <li>Olinda, Pernambuco</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2025 Marim Figital. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Feito com ☀️ em Olinda.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: any) => (
  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-marim-yellow hover:text-marim-dark transition-all">
    {icon}
  </a>
);