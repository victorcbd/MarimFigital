import { Globe, Map, TrendingUp, Landmark, FileCheck } from 'lucide-react';

export const HubDifferentials = () => {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-marim-red font-bold tracking-wider text-sm uppercase">Por que Olinda?</span>
          <h2 className="text-4xl font-bold mt-2 mb-6 font-['Space_Grotesk']">Oportunidades e Diferenciais</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Olinda não é apenas passado. É um terreno fértil com características únicas para a inovação florescer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DiffCard 
            icon={<Landmark />}
            title="Berço da Cultura"
            desc="Identidade brasileira forte. A criatividade aqui é ancestral e natural."
          />
          <DiffCard 
            icon={<Globe />}
            title="Conexões Globais"
            desc="Lugar de conexões orgânicas com o mundo. Turismo atrai olhares internacionais."
          />
          <DiffCard 
            icon={<UsersIcon />}
            title="Diversidade Criativa"
            desc="Alta densidade de agentes criativos e habitantes engajados no território."
          />
          <DiffCard 
            icon={<TrendingUp />}
            title="Atração de Investimento"
            desc="Potencial único de conexão, atração e captação de recursos para economia criativa."
          />
          <DiffCard 
            icon={<FileCheck />}
            title="Nova Lei de Inovação"
            desc="Fundo Municipal de Inovação aprovado e pronto para incentivar o setor."
          />
          <DiffCard 
            icon={<Map />}
            title="Incentivos Municipais"
            desc="Pacote de incentivos fiscais e territoriais previstos para novos negócios."
          />
        </div>
      </div>
    </div>
  );
};

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)

const DiffCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-marim-yellow hover:shadow-lg transition-all duration-300 group">
    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-marim-dark group-hover:bg-marim-dark group-hover:text-marim-yellow transition-colors mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-marim-dark">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);