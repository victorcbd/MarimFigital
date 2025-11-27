import { useState } from 'react';
import { Download, CheckCircle, AlertCircle, Calendar, Users, Target, Award, ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetUrl } from '../data/db';

// --- CONFIGURAÇÃO ---
// PASSO 1: Crie uma planilha no Google Sheets
// PASSO 2: Vá em Extensões > Apps Script e crie um script doPost para receber os dados
// PASSO 3: Faça o Deploy como Web App (Acesso: Qualquer pessoa)
// PASSO 4: Cole a URL gerada abaixo
const GOOGLE_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbzp_N7dJGaL0qs16VYGSiQU-7kWSsAMsqJwTSoVE5gJQJmjlukm7qjOKoAYDfvW8W8Fog/exec"; 

export const EditalSummary = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    phone: '',
    address: '',
    history: '',
    expectation: '',
    availability: false
  });

  const [skills, setSkills] = useState({
    hacker: 0,
    hustler: 0,
    hipster: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('desafio');

  const totalPoints = skills.hacker + skills.hustler + skills.hipster;
  const remainingPoints = 10 - totalPoints;
  const isValidSkills = totalPoints === 10;
  
  const handleSkillChange = (skill: keyof typeof skills, value: number) => {
    if (value < 0) return;
    const otherSkills = Object.entries(skills)
      .filter(([key]) => key !== skill)
      .reduce((sum, [, val]) => sum + (val as number), 0);
      
    if (otherSkills + value <= 10) {
      setSkills(prev => ({ ...prev, [skill]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidSkills || !formData.availability) return;

    setIsSubmitting(true);

    try {
      // Prepara os dados para o formato que o Google Apps Script aceita (FormData)
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('birthdate', formData.birthdate);
      data.append('phone', formData.phone);
      data.append('address', formData.address);
      data.append('history', formData.history);
      data.append('expectation', formData.expectation);
      data.append('hacker', skills.hacker.toString());
      data.append('hustler', skills.hustler.toString());
      data.append('hipster', skills.hipster.toString());

      if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI") {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: data,
          mode: 'no-cors' // Necessário para evitar bloqueio de CORS do Google
        });
      } else {
        // Simulação caso a URL não esteja configurada
        console.warn("URL do Google Script não configurada. Simulando envio...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert("Houve um erro ao enviar sua inscrição. Por favor, tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  // Função simulada de download buscando do banco
  const handleDownload = () => {
    const url = getAssetUrl('doc-edital-v1');
    alert(`Redirecionando para download: ${url}`);
    // window.open(url, '_blank'); // Em produção, descomentar isso
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl p-12 shadow-xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-['Space_Grotesk']">Inscrição Recebida!</h2>
          <p className="text-gray-600 mb-8">
            Valeu, {formData.name.split(' ')[0]}! Recebemos sua aplicação para a Jornada de Inovação Marim Figital. Fique de olho no seu WhatsApp e Email, entraremos em contato em breve.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="text-marim-blue font-bold hover:underline"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        
        {/* Lado Esquerdo: Resumo do Edital (Expandable Sections) */}
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-marim-yellow/20 text-marim-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Edital 2025/2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 text-marim-dark">
              Jornada de Inovação <br/>Marim Figital
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Uma convocação para transformar Olinda. Buscamos 60 agentes de transformação para co-criar o futuro da cidade através do turismo, tecnologia e economia criativa.
            </p>
          </div>

          <div className="space-y-4">
            <AccordionSection 
              id="desafio"
              title="O Desafio: Futuro do Turismo"
              icon={<Target className="text-marim-red" size={24} />}
              isOpen={expandedSection === 'desafio'}
              onToggle={() => toggleSection('desafio')}
            >
              <p className="mb-3">A primeira edição foca integralmente no <strong>Turismo</strong>. Buscamos soluções que resolvam problemas reais:</p>
              <ul className="space-y-2 list-disc list-inside text-gray-600 text-sm">
                <li><strong>Acessibilidade no Sítio Histórico:</strong> Melhorar a experiência de idosos e PCDs nas ladeiras.</li>
                <li><strong>Inteligência Territorial:</strong> Uso de dados para entender o fluxo de turistas.</li>
                <li><strong>Selo 'Feito em Olinda':</strong> Certificação digital para valorizar a produção local.</li>
                <li><strong>Novos Roteiros:</strong> Experiências imersivas que conectem história e tecnologia.</li>
              </ul>
            </AccordionSection>

            <AccordionSection 
              id="ideathon"
              title="O Ideathon (48 Horas)"
              icon={<Calendar className="text-marim-blue" size={24} />}
              isOpen={expandedSection === 'ideathon'}
              onToggle={() => toggleSection('ideathon')}
            >
              <p className="mb-3">Uma maratona criativa e imersiva onde 20 equipes multidisciplinares desenvolverão protótipos.</p>
              <div className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-100 mb-3">
                 <p><strong>📅 Data:</strong> 12, 13 e 14 de Dezembro</p>
                 <p><strong>📍 Formato:</strong> Presencial (Imersão total)</p>
              </div>
              <p className="text-sm text-gray-600">
                Haverá mentorias com especialistas da OCCA, IFPE, SEBRAE e Massa Hub. Alimentação (coffee break e almoço) inclusa para os participantes.
              </p>
            </AccordionSection>

            <AccordionSection 
              id="quem"
              title="Quem Pode Participar?"
              icon={<Users className="text-marim-yellow" size={24} />}
              isOpen={expandedSection === 'quem'}
              onToggle={() => toggleSection('quem')}
            >
              <p className="mb-3">Buscamos <strong>60 agentes de transformação</strong> a partir de 16 anos. Não é necessário ter equipe formada (montaremos na hora).</p>
              <p className="mb-2 text-sm font-bold">Perfis buscados:</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2"><span className="font-bold text-marim-dark">Hacker:</span> Desenvolvedores e tech wizards.</li>
                <li className="flex gap-2"><span className="font-bold text-marim-dark">Hustler:</span> Negociadores, líderes e vendedores.</li>
                <li className="flex gap-2"><span className="font-bold text-marim-dark">Hipster:</span> Designers, criativos e artistas.</li>
              </ul>
            </AccordionSection>

            <AccordionSection 
              id="premios"
              title="Prêmios e Próximas Etapas"
              icon={<Award className="text-purple-500" size={24} />}
              isOpen={expandedSection === 'premios'}
              onToggle={() => toggleSection('premios')}
            >
              <p className="mb-4">O Ideathon é apenas o começo da jornada.</p>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-bold text-purple-700 text-sm">🚀 Incubação (4 Meses)</h4>
                  <p className="text-xs text-purple-600 mt-1">Os 3 projetos vencedores receberão suporte de Dez/25 a Mar/26 para transformar a ideia em MVP real.</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-bold text-green-700 text-sm">🌟 Marim Social Club</h4>
                  <p className="text-xs text-green-600 mt-1">+10 talentos individuais que se destacarem serão convidados para este clube exclusivo de networking e capacitação.</p>
                </div>
              </div>
            </AccordionSection>
          </div>

          <div className="bg-marim-dark text-white p-8 rounded-3xl relative overflow-hidden mt-8">
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2">Edital Oficial em PDF</h3>
               <p className="text-gray-300 mb-6 text-sm">Para detalhes jurídicos, cronograma completo e regras de conduta, acesse o documento original.</p>
               <button 
                 onClick={handleDownload}
                 className="flex items-center gap-2 bg-white text-marim-dark px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors w-full justify-center md:w-auto"
               >
                 <Download size={20} /> Baixar Edital Completo
               </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-marim-yellow rounded-full blur-[60px] opacity-20"></div>
          </div>
        </div>

        {/* Lado Direito: Formulário (Sticky) */}
        <div className="relative">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Ficha de Inscrição
              <span className="text-xs font-normal text-white bg-marim-red px-2 py-1 rounded animate-pulse">Últimas vagas</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all"
                    placeholder="seu.email@exemplo.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Data de Nasc.</label>
                    <input 
                      required
                      type="date" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow outline-none"
                      value={formData.birthdate}
                      onChange={e => setFormData({...formData, birthdate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Whatsapp</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow outline-none"
                      placeholder="(81) 9..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Endereço de sua residência</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all"
                    placeholder="Rua, Número, Bairro, Cidade"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Perguntas Abertas - Sua Motivação */}
              <div className="space-y-4">
                <h3 className="font-bold text-marim-dark text-lg">Sua Motivação</h3>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Qual sua história com a cidade de Olinda?</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Conte um pouco sobre sua relação com a cidade..."
                    value={formData.history}
                    onChange={e => setFormData({...formData, history: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Como você vê a Jornada de Inovação fazendo parte da sua vida nos próximos meses?</label>
                  <textarea 
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-marim-yellow focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Quais suas expectativas e objetivos?"
                    value={formData.expectation}
                    onChange={e => setFormData({...formData, expectation: e.target.value})}
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Distribuição de Habilidades */}
              <div>
                <div className="flex justify-between items-center mb-4">
                   <label className="block font-bold text-gray-800">Seu Perfil (Gamificação)</label>
                   <span className={`text-xs font-bold px-2 py-1 rounded-full ${isValidSkills ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                     {totalPoints}/10 Pontos
                   </span>
                </div>
                <p className="text-xs text-gray-500 mb-6 bg-blue-50 p-2 rounded border border-blue-100">
                  Distribua exatamente <strong>10 estrelas</strong> entre as habilidades que mais te representam.
                </p>

                <div className="space-y-6">
                  <SkillInput 
                    title="Hacker (Tech)"
                    desc="Programação, dados e soluções técnicas."
                    value={skills.hacker}
                    onChange={(v) => handleSkillChange('hacker', v)}
                    max={10 - (skills.hustler + skills.hipster)}
                  />
                  <SkillInput 
                    title="Hustler (Biz)"
                    desc="Negócios, vendas e liderança."
                    value={skills.hustler}
                    onChange={(v) => handleSkillChange('hustler', v)}
                    max={10 - (skills.hacker + skills.hipster)}
                  />
                  <SkillInput 
                    title="Hipster (Design)"
                    desc="Criatividade, UX e experiência."
                    value={skills.hipster}
                    onChange={(v) => handleSkillChange('hipster', v)}
                    max={10 - (skills.hacker + skills.hustler)}
                  />
                </div>
                
                {!isValidSkills && (
                   <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold animate-pulse justify-end">
                     <AlertCircle size={14} />
                     {remainingPoints > 0 
                       ? `Faltam ${remainingPoints} estrelas.` 
                       : `Remove ${Math.abs(remainingPoints)} estrelas.`}
                   </div>
                )}
              </div>

              <hr className="border-gray-100" />

              {/* Disponibilidade */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 text-marim-yellow border-gray-300 rounded focus:ring-marim-yellow shrink-0"
                    checked={formData.availability}
                    onChange={e => setFormData({...formData, availability: e.target.checked})}
                  />
                  <span className="text-xs text-gray-700 leading-relaxed">
                    Confirmo disponibilidade integral para o Ideathon presencial em Olinda nos dias <strong>12, 13 e 14 de Dezembro</strong>.
                  </span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={!isValidSkills || !formData.availability || isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isValidSkills && formData.availability && !isSubmitting
                    ? 'bg-marim-blue text-white hover:bg-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-1' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Enviando...
                  </>
                ) : (
                  'Confirmar Inscrição'
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Acordeão
const AccordionSection = ({title, icon, children, isOpen, onToggle }: any) => {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-marim-yellow shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-gray-100' : 'bg-gray-50'}`}>
            {icon}
          </div>
          <span className={`font-bold text-lg ${isOpen ? 'text-marim-dark' : 'text-gray-700'}`}>{title}</span>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="text-gray-400" />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 border-t border-gray-100 text-gray-600 leading-relaxed mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SkillInputProps {
  title: string;
  desc: string;
  value: number;
  onChange: (val: number) => void;
  max: number;
}

const SkillInput = ({ title, desc, value, onChange, max }: SkillInputProps) => {
  return (
    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 hover:border-marim-yellow/30 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <div>
           <h4 className="font-bold text-sm text-marim-dark">{title}</h4>
           <p className="text-[10px] text-gray-500 max-w-[150px] leading-tight">{desc}</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200">
          <button 
            type="button"
            onClick={() => onChange(value - 1)}
            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-marim-dark font-bold text-sm"
            disabled={value <= 0}
          >
            -
          </button>
          <span className="w-4 text-center font-bold text-sm">{value}</span>
          <button 
            type="button"
            onClick={() => onChange(value + 1)}
            className="w-6 h-6 rounded-full bg-marim-yellow flex items-center justify-center hover:bg-yellow-400 text-marim-dark font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={max <= 0}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Visual Stars Bar */}
      <div className="flex gap-1 mt-2">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < value ? 'bg-marim-blue' : 'bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};