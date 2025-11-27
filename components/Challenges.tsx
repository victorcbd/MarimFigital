import { Map, Home, Store, HeartHandshake } from 'lucide-react';

export const Challenges = () => {
  return (
    <div className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-marim-blue font-bold tracking-wider text-sm uppercase">O Foco da Edição</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">Desafios Reais da Cidade</h2>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Nossa missão principal nesta edição é clara: criar a <strong>plataforma definitiva (www.carnavaldeolinda.com)</strong> que integre a experiência do folião com a economia local.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Main Challenge Highlight */}
          <div className="bg-marim-dark text-white rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-marim-blue rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="bg-white/10 w-fit p-3 rounded-xl mb-6 backdrop-blur-sm">
                <Map size={32} className="text-marim-yellow" />
              </div>
              <h3 className="text-3xl font-bold mb-4">O Super App do Carnaval</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Precisamos centralizar toda a programação. O folião precisa saber onde estão os blocos, os horários e os dias de festa na palma da mão. 
                Seu desafio é criar uma experiência diferenciada de navegação e descoberta.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-marim-yellow"></div>Agenda completa de Blocos</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-marim-yellow"></div>Mapa interativo em tempo real</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-marim-yellow"></div>Personalização de roteiro</li>
              </ul>
            </div>
            
            <button className="relative z-10 w-full bg-white text-marim-dark font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors">
              Tenho uma ideia pra isso
            </button>
          </div>

          {/* Secondary Challenges Grid */}
          <div className="grid gap-6">
            <ChallengeCard 
              icon={<Home />}
              title="Hospedagem & Aluguéis"
              desc="Conectar quem tem casa pra alugar com quem quer viver o carnaval de dentro. Uma plataforma segura para moradores e turistas."
            />
            <ChallengeCard 
              icon={<Store />}
              title="Economia Local & Vendedores"
              desc="Dar visibilidade aos empreendedores locais. Criar tours virtuais e conectar vendedores de diversos pontos aos visitantes."
            />
            <ChallengeCard 
              icon={<HeartHandshake />}
              title="Selo Feito em Olinda"
              desc="Valorização e rastreabilidade da produção criativa local. Quem faz o carnaval acontecer precisa aparecer."
            />
          </div>
        </div>
        
        <div className="mt-12 text-center">
            <a href="#" className="inline-flex items-center text-marim-blue font-bold hover:underline text-lg">
                Ver todos os desafios detalhados →
            </a>
        </div>
      </div>
    </div>
  );
};

const ChallengeCard = ({ icon, title, desc }: any) => (
  <div className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-gray-100 hover:border-marim-yellow/30 group">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-white rounded-lg shadow-sm text-marim-dark group-hover:text-marim-blue transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </div>
);