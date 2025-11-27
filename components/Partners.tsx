
import from 'react';
import from 'lucide-react';
import { PARTNERS_DB, getAssetUrl } from '../data/db';

export const Partners = () => {
  return (
    <div className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
           <h3 className="text-xl font-bold mb-4 text-gray-400 uppercase tracking-widest font-['Space_Grotesk']">
            Quem faz acontecer
          </h3>
          <div className="w-16 h-1 bg-marim-yellow mx-auto rounded-full"></div>
        </div>
        
        {/* Grid de Logos - Data Driven */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
          {PARTNERS_DB.map((partner) => (
            <div 
              key={partner.id} 
              className="w-full max-w-[180px] h-24 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 group relative cursor-default"
              title={partner.name}
            >
                <img 
                  src={getAssetUrl(partner.assetId)} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
            </div>
          ))}
        </div>

        {/* CTA Parceiro */}
        <div className="mt-24 p-10 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl text-center border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-marim-dark mb-3 font-['Space_Grotesk']">Quer apoiar a inovação em Olinda?</h4>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">Sua empresa pode ser mentora ou patrocinadora dessa jornada de transformação.</p>
            <button className="bg-white text-marim-blue border-2 border-marim-blue font-bold px-8 py-3 rounded-xl hover:bg-marim-blue hover:text-white transition-colors shadow-sm">
              Seja um parceiro estratégico
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-marim-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </div>
    </div>
  );
};
