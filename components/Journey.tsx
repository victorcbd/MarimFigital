import React from 'react';
import { ClipboardList, Lightbulb, Rocket, Award } from 'lucide-react';

export const Journey = () => {
  const steps = [
    {
      icon: <ClipboardList size={24} />,
      title: "Inscrição e Seleção",
      desc: "60 jovens entram na Jornada. Você se cadastra, conta sua história e o como quer colaborar com o futuro Olinda."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Maratona de Ideias",
      desc: "48h de imersão. até 20 trios formados. Muita cafeína, mentoria e mão na massa para prototipar soluções."
    },
    {
      icon: <Rocket size={24} />,
      title: "Incubação e MVP",
      desc: "3 projetos escolhidos + 10 talentos. Hora de tirar o app do papel e botar na rua pro Carnaval."
    },
    {
      icon: <Award size={24} />,
      title: "Apresentação Final",
      desc: "Mostra pública. Seu projeto conectado com a Prefeitura, investidores e o ecossistema local repleto de parceiros."
    }
  ];

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Como funciona a Jornada</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Da ideia solta até o impacto real na ladeira. O processo é rápido, intenso e transformador.
        </p>
      </div>

      <div className="relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:border-marim-yellow transition-colors">
              <div className="w-16 h-16 rounded-full bg-marim-dark text-white flex items-center justify-center mb-4 group-hover:bg-marim-yellow group-hover:text-marim-dark transition-colors shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              <div className="mt-4 text-xs font-bold text-gray-300 uppercase tracking-widest">Fase 0{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 bg-white rounded-2xl p-8 border-l-8 border-marim-yellow shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
           <h4 className="text-2xl font-bold mb-2">Cronograma Rápido</h4>
           <ul className="space-y-2 text-gray-600">
             <li>• <strong>Nov 2025:</strong> Lançamento Oficial</li>
             <li>• <strong>Dez 2025:</strong> Maratona de Ideias (Hackathon)</li>
             <li>• <strong>Dez-Mar:</strong> Desenvolvimento dos MVPs</li>
             <li>• <strong>Mar 2026:</strong> Entrega Final</li>
           </ul>
        </div>
        <div className="w-full md:w-auto">
             <button className="w-full bg-marim-dark text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Baixar Edital Completo
             </button>
        </div>
      </div>
    </div>
  );
};