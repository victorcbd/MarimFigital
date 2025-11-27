import { useState } from 'react';
import { Search, ShoppingBag, Utensils, Car, Home, Camera } from 'lucide-react';

type Category = 'all' | 'food' | 'crafts' | 'transport' | 'accommodation';

export const Marketplace = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');

  const vendors = [
    { id: 1, name: "Tapioca da Dona Maria", category: 'food', price: '$$', image: "https://picsum.photos/300/200?random=1", desc: "A melhor tapioca do Alto da Sé. Queijo coalho crocante!" },
    { id: 2, name: "Artesanato Olindense", category: 'crafts', price: '$$$', image: "https://picsum.photos/300/200?random=2", desc: "Bonecos de barro e lembranças feitas à mão." },
    { id: 3, name: "Transporte VIP Carnaval", category: 'transport', price: '$$', image: "https://picsum.photos/300/200?random=3", desc: "Vans climatizadas saindo do Recife Antigo." },
    { id: 4, name: "Casa Colonial c/ Piscina", category: 'accommodation', price: '$$$$', image: "https://picsum.photos/300/200?random=4", desc: "Hospedagem para 10 pessoas no coração da festa." },
    { id: 5, name: "Acarajé da Baiana", category: 'food', price: '$', image: "https://picsum.photos/300/200?random=5", desc: "Acarajé frito na hora com vatapá e caruru." },
    { id: 6, name: "Pousada dos Quatro Cantos", category: 'accommodation', price: '$$$', image: "https://picsum.photos/300/200?random=6", desc: "Quartos confortáveis a 50m dos blocos." },
  ];

  const filteredVendors = vendors.filter(v => 
    (activeCategory === 'all' || v.category === activeCategory) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] mb-4">Feira Digital</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Conecte-se com quem faz a economia de Olinda girar. De tapiocas a quartos coloniais, encontre tudo aqui.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <input 
              type="text" 
              placeholder="O que você procura? (ex: Tapioca, Pousada...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
             <CategoryBtn active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} icon={ShoppingBag} label="Tudo" />
             <CategoryBtn active={activeCategory === 'food'} onClick={() => setActiveCategory('food')} icon={Utensils} label="Comidas & Bebidas" />
             <CategoryBtn active={activeCategory === 'crafts'} onClick={() => setActiveCategory('crafts')} icon={Camera} label="Artesanato" />
             <CategoryBtn active={activeCategory === 'transport'} onClick={() => setActiveCategory('transport')} icon={Car} label="Transporte" />
             <CategoryBtn active={activeCategory === 'accommodation'} onClick={() => setActiveCategory('accommodation')} icon={Home} label="Hospedagem" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.length > 0 ? filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                  {vendor.price}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-xs font-bold text-marim-blue uppercase tracking-wider mb-2">
                  {vendor.category === 'food' && 'Gastronomia'}
                  {vendor.category === 'crafts' && 'Artesanato'}
                  {vendor.category === 'transport' && 'Transporte'}
                  {vendor.category === 'accommodation' && 'Estadia'}
                </div>
                <h3 className="text-xl font-bold mb-2 text-marim-dark">{vendor.name}</h3>
                <p className="text-gray-600 mb-6 text-sm line-clamp-2 flex-grow">{vendor.desc}</p>
                <button className="w-full bg-gray-100 text-marim-dark font-bold py-3 rounded-xl hover:bg-marim-dark hover:text-white transition-colors mt-auto">
                  Entrar em Contato
                </button>
              </div>
            </div>
          )) : (
             <div className="col-span-full text-center py-20 text-gray-400">
                <p className="text-xl">Nenhum item encontrado para "{search}".</p>
             </div>
          )}
        </div>
        
        {/* CTA Vendor */}
        <div className="mt-16 bg-marim-blue text-white rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
           <div className="max-w-xl">
             <h2 className="text-2xl md:text-3xl font-bold mb-4">Você é um empreendedor local?</h2>
             <p className="text-blue-100">Cadastre seu negócio gratuitamente e apareça para milhares de turistas durante o carnaval.</p>
           </div>
           <button className="whitespace-nowrap bg-white text-marim-blue font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
             Cadastrar meu Negócio
           </button>
        </div>
      </div>
    </div>
  );
};

const CategoryBtn = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all border-2 ${active ? 'bg-marim-dark text-white border-marim-dark shadow-lg scale-105' : 'bg-white text-gray-600 border-transparent hover:border-gray-200'}`}
  >
    <Icon size={18} />
    {label}
  </button>
);