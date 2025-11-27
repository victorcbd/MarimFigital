import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    { q: "Preciso ter experiência técnica (programação)?", a: "Não. Buscamos mentes criativas de todas as áreas. Devs, designers, comunicadores, gestores e artistas. O time se completa." },
    { q: "É pago?", a: "Não. A Jornada é 100% gratuita." },
    { q: "Posso participar sozinho?", a: "Sim! Você se inscreve individualmente. Durante a Maratona de Ideias, ajudaremos você a formar seu trio ideal." },
    { q: "Qual a idade mínima?", a: "A partir dos 16 anos." },
    { q: "Vou ganhar certificado?", a: "Sim, emitido pelas instituições parceiras para todos que completarem a jornada." },
    { q: "Quanto tempo preciso dedicar?", a: "A Maratona dura 48h (um fim de semana). Depois, se seu projeto for selecionado, teremos encontros quinzenais de mentoria." }
  ];

  return (
    <div className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Dúvidas Frequentes</h2>
        
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-gray-800">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-5 bg-white text-gray-600 leading-relaxed border-t border-gray-100">
          {answer}
        </div>
      )}
    </div>
  );
};
