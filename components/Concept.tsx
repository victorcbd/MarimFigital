import React from 'react';
import { Layers, Zap, Share2, MapPin, Smartphone, Users } from 'lucide-react';

export const Concept = () => {
  return (
    <div className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro Concept */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="text-marim-blue font-bold tracking-wider text-sm uppercase mb-2 block">O Conceito</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk'] leading-tight">
              O Primeiro Hub Territorial <span className="text-transparent bg-clip-text bg-gradient-to-r from-marim-blue to-marim-red">Figital</span> do Brasil
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Não é apenas um projeto, mas um ecossistema. O Hub foi criado para posicionar Olinda como uma cidade que projeta seu futuro com base em sua vocação criativa e histórica.
            </p>
            
            {/* 3 Layers */}
            <div className="space-y-4">
              <LayerItem 
                icon={<MapPin className="text-marim-dark" />} 
                title="Físico (Território)" 
                desc="O território concreto, onde a experiência acontece. O espaço, o corpo, a cidade, a materialidade." 
              />
              <LayerItem 
                icon={<Smartphone className="text-marim-blue" />} 
                title="Digital (Rede)" 
                desc="Camada de dados e conexões que amplifica o mundo físico, permitindo interação e inteligência." 
              />
              <LayerItem 
                icon={<Users className="text-marim-red" />} 
                title="Social (Propósito)" 
                desc="Tecido das relações que dá sentido ao encontro. Comunidades e propósito coletivo." 
              />
            </div>
          </div>
          
          <div className="relative mt-12 lg:mt-0">
             <div className="absolute -inset-4 bg-marim-yellow/20 rounded-full blur-3xl"></div>
             <img 
               src="https://i.imgur.com/T8eX6GE.jpeg" 
               alt="Olinda Inovação" 
               className="relative z-10 rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 w-full object-cover aspect-square"
             />
             <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs hidden md:block">
               <p className="font-['Space_Grotesk'] text-2xl font-bold">"Inovação brotando da alma do território."</p>
             </div>
          </div>
        </div>

        {/* 3 Strategic Axes (Page 5 of PDF) */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-16">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Eixos de Atuação</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O Hub Marim Figital está estruturado em três eixos integrados com metas claras para fortalecer o ecossistema local.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AxisCard 
              color="bg-marim-yellow"
              title="Formação"
              subtitle="Cultura Empreendedora"
              desc="Desenvolver uma nova cultura para empreendedores inovadores. Aprendizagem contemporânea, prática e colaborativa."
              icon={<Layers size={32} />}
            />
            <AxisCard 
              color="bg-marim-blue"
              textColor="text-white"
              title="Conexão"
              subtitle="Suporte e Alavancagem"
              desc="Alavancar talentos, iniciativas e negócios. Projetos que envolvem poder público, academia e setor produtivo (tríplice hélice)."
              icon={<Zap size={32} />}
            />
            <AxisCard 
              color="bg-marim-red"
              textColor="text-white"
              title="Comunicação"
              subtitle="Difusão e Engajamento"
              desc="Difundir o empreendedorismo inovador de Olinda. Plano de comunicação e engajamento da cultura de inovação."
              icon={<Share2 size={32} />}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

const LayerItem = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
    <div className="p-2 bg-white shadow-sm rounded-lg shrink-0">{icon}</div>
    <div>
      <h4 className="font-bold text-lg text-marim-dark">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const AxisCard = ({ color, textColor = "text-marim-dark", title, subtitle, desc, icon }: any) => (
  <div className={`${color} ${textColor} p-8 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}>
    <div className="relative z-10 h-full flex flex-col">
      <div className="mb-6 p-3 bg-white/20 w-fit rounded-xl backdrop-blur-sm">{icon}</div>
      <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{title}</h4>
      <h3 className="text-2xl font-bold mb-4">{subtitle}</h3>
      <p className="opacity-90 text-sm leading-relaxed mb-8 flex-grow">{desc}</p>
      <div className="w-full h-1 bg-current opacity-30 rounded-full mt-auto"></div>
    </div>
    <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 scale-150">
      {icon}
    </div>
  </div>
);