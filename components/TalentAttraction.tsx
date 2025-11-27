import React, { useEffect, useRef, useMemo } from 'react';

// Definição dos tipos para a simulação física
interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number; // Define o tamanho e a inércia
  text: string;
  color: string;
  radius: number;
  isDragging: boolean;
}

export const TalentAttraction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const systemEnergyRef = useRef<number>(0); 
  const timeRef = useRef<number>(0); // Para animação senoidal
  
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<SVGPathElement>(null);

  // Configuração inicial dos dados
  const initialTalents = useMemo(() => [
    { text: "Empreendedores", mass: 6, color: "text-marim-dark font-black" }, 
    { text: "Criativos", mass: 5, color: "text-marim-red font-bold" },
    { text: "Inovadores", mass: 4, color: "text-gray-600" },
    { text: "Artistas", mass: 4, color: "text-marim-red" },
    { text: "Programadores", mass: 3, color: "text-blue-600" },
    { text: "Designers", mass: 3, color: "text-marim-blue" },
    { text: "Inventores", mass: 3, color: "text-purple-600" },
    { text: "Historiadores", mass: 2, color: "text-marim-yellow" },
    { text: "Influenciadores", mass: 2, color: "text-marim-dark" },
    { text: "Makers", mass: 2, color: "text-green-600" },
    { text: "Nômades", mass: 2, color: "text-blue-400" },
    { text: "Inconformados", mass: 2, color: "text-gray-500" },
    { text: "Curiosos", mass: 1, color: "text-pink-500" },
  ], []);

  // Inicialização da simulação
  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    const isMobile = width < 768;
    const scaleFactor = isMobile ? 0.55 : 1.0;
    
    // Inicializa os nós espalhados, mas longe das bordas
    nodesRef.current = initialTalents.map((t, i) => ({
      id: i,
      x: width / 2 + (Math.random() - 0.5) * (width * 0.6), 
      y: height / 2 + (Math.random() - 0.5) * (height * 0.6),
      vx: 0, 
      vy: 0,
      mass: t.mass,
      text: t.text,
      color: t.color,
      radius: (t.mass * 9 + 20) * scaleFactor, // Raio físico ajustado para responsividade
      isDragging: false
    }));

    const updatePhysics = () => {
      const nodes = nodesRef.current;
      const container = containerRef.current;
      
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Incrementa tempo para ondas senoidais
      timeRef.current += 0.01; 

      // --- GERENCIAMENTO DE ENERGIA (TIMING) ---
      const isAnyDragging = nodes.some(n => n.isDragging);
      const MAX_ENERGY = 1.0;
      
      // Se interagindo: Carga rápida
      // Se ocioso: Descarga em 4 segundos (60fps * 4 = 240 frames)
      const DECAY_FRAMES = 240; 
      const CHARGE_RATE = 0.05;
      const DECAY_RATE = MAX_ENERGY / DECAY_FRAMES;

      if (isAnyDragging) {
        systemEnergyRef.current = Math.min(systemEnergyRef.current + CHARGE_RATE, MAX_ENERGY);
      } else {
        systemEnergyRef.current = Math.max(systemEnergyRef.current - DECAY_RATE, 0);
      }
      
      const energy = systemEnergyRef.current; // 0.0 a 1.0

      // Constantes Físicas
      const FRICTION = isAnyDragging ? 0.90 : 0.96; // Menos atrito no idle para permitir flutuação suave
      
      // Loop de Física
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.isDragging) continue;

        let fx = 0;
        let fy = 0;

        // Comportamento condicional
        if (isAnyDragging) {
          // --- MODO INTERAÇÃO: ATRAÇÃO E CAOS ---
          
          // 1. Gravidade Central (Puxa para o meio)
          fx += (centerX - nodeA.x) * 0.005;
          fy += (centerY - nodeA.y) * 0.005;

          // 2. Tremor (Brownian Motion)
          const TREMBLE = 0.5 * energy;
          fx += (Math.random() - 0.5) * TREMBLE;
          fy += (Math.random() - 0.5) * TREMBLE;

        } else {
          // --- MODO OCIOSO: FLUTUAÇÃO SUAVE E ORGÂNICA ---
          
          // Movimento Senoidal (Ambient Drift)
          // Cada nó tem um padrão diferente baseado no ID
          const driftSpeed = 0.05;
          fx += Math.sin(timeRef.current + nodeA.id) * driftSpeed;
          fy += Math.cos(timeRef.current + nodeA.id * 0.5) * driftSpeed;

          // Repulsão suave das paredes para não grudarem nos cantos (mantém no centro)
          const wallRepulsion = 0.05;
          const border = 50;
          if (nodeA.x < border) fx += wallRepulsion;
          if (nodeA.x > width - border) fx -= wallRepulsion;
          if (nodeA.y < border) fy += wallRepulsion;
          if (nodeA.y > height - border) fy -= wallRepulsion;
          
          // Leve gravidade central para não dispersarem demais
          fx += (centerX - nodeA.x) * 0.0001;
          fy += (centerY - nodeA.y) * 0.0001;
        }

        // 3. Interação entre Nós (Colisão e Linhas)
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const nodeB = nodes[j];

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) || 0.1;

          // A. Colisão Rígida (Sempre ativa para não sobrepor)
          const minDist = nodeA.radius + nodeB.radius;
          if (dist < minDist) {
            const overlap = minDist - dist;
            const force = overlap * 0.15; // Constante de mola suave
            const nx = dx / dist;
            const ny = dy / dist;
            fx -= nx * force;
            fy -= ny * force;
          }

          if (isAnyDragging) {
             // ATRAÇÃO: Quando arrasta, eles se conectam e se puxam
             const CONNECTION_DIST = 300;
             if (dist < CONNECTION_DIST && dist > minDist) {
                const pull = 0.002 * energy; // Força de atração
                fx += dx * pull;
                fy += dy * pull;
             }
          } else {
             // REPULSÃO SUAVE (Mantém espaço vital no idle)
             const PERSONAL_SPACE = 150; 
             if (dist < PERSONAL_SPACE) {
                const pushStrength = 0.01; 
                const nx = dx / dist;
                const ny = dy / dist;
                fx -= nx * pushStrength;
                fy -= ny * pushStrength;
             }
          }
        }

        // Aplicar Forças
        nodeA.vx += fx / nodeA.mass;
        nodeA.vy += fy / nodeA.mass;

        // Atrito
        nodeA.vx *= FRICTION;
        nodeA.vy *= FRICTION;

        // Atualizar Posição
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Limites Rígidos do Container (Hard Clamp)
        // Padding assimétrico para evitar cortes laterais de texto longo
        const paddingY = nodeA.radius;
        const paddingX = nodeA.radius * 2.5; // Margem lateral maior para compensar largura do texto
        
        nodeA.x = Math.max(paddingX, Math.min(width - paddingX, nodeA.x));
        nodeA.y = Math.max(paddingY, Math.min(height - paddingY, nodeA.y));
      }

      // Renderização DOM e SVG
      let svgPath = "";
      
      nodes.forEach((node, index) => {
        const el = elementsRef.current[index];
        if (el) {
          el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) translate(-50%, -50%)`; 
        }

        // Desenhar linhas SEMPRE se estiverem próximos (Visual Connection)
        for (let j = index + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = node.x - nodeB.x;
          const dy = node.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Distância visual das linhas
          if (dist < 250) {
              svgPath += `M ${node.x} ${node.y} L ${nodeB.x} ${nodeB.y} `;
          }
        }
      });

      if (linesRef.current) {
        linesRef.current.setAttribute("d", svgPath);
        // Opacidade Dinâmica: Base (0.15) + Energia
        // Sempre visível, mas fica mais forte na interação
        const baseOpacity = 0.15;
        const dynamicOpacity = baseOpacity + (energy * 0.4);
        linesRef.current.style.opacity = `${dynamicOpacity}`; 
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => cancelAnimationFrame(requestRef.current);
  }, [initialTalents]);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    e.preventDefault(); 
    const node = nodesRef.current[index];
    node.isDragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent, index: number) => {
    const node = nodesRef.current[index];
    if (node.isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = node.radius;
      const targetX = e.clientX - rect.left;
      const targetY = e.clientY - rect.top;
      
      node.x = Math.max(padding, Math.min(rect.width - padding, targetX));
      node.y = Math.max(padding, Math.min(rect.height - padding, targetY));
      
      node.vx = 0; 
      node.vy = 0;
    }
  };

  const handlePointerUp = (e: React.PointerEvent, index: number) => {
    const node = nodesRef.current[index];
    node.isDragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="py-24 px-6 bg-white overflow-hidden select-none">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 font-['Space_Grotesk']">
          Atração e Retenção de Talentos
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          O Hub Marim Figital tem gravidade própria. Quanto mais você interage, mais o ecossistema se conecta.
        </p>

        {/* Physics Container - Fluid Mode (No Border/Background) */}
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <path 
               ref={linesRef} 
               stroke="#cbd5e1" 
               strokeWidth="1.5" 
               fill="none" 
               strokeLinecap="round"
               style={{ transition: 'opacity 0.2s ease' }}
             />
          </svg>

          {initialTalents.map((talent, i) => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const scaleFactor = isMobile ? 0.55 : 1.0;
            const fontSize = Math.max(12, (talent.mass * 8 + 10) * scaleFactor); 
            
            return (
              <div
                key={i}
                ref={(el) => { elementsRef.current[i] = el; }}
                onPointerDown={(e) => handlePointerDown(e, i)}
                onPointerMove={(e) => handlePointerMove(e, i)}
                onPointerUp={(e) => handlePointerUp(e, i)}
                className={`absolute z-10 flex items-center justify-center font-['Space_Grotesk'] leading-none hover:z-50 touch-none top-0 left-0`}
                style={{
                    willChange: 'transform',
                    fontSize: `${fontSize}px`,
                }}
              >
                <span className={`${talent.color} bg-white px-4 py-2 rounded-full shadow-md border border-gray-100 hover:border-marim-yellow hover:shadow-lg transition-all whitespace-nowrap select-none pointer-events-none`}>
                  {talent.text}
                </span>
              </div>
            );
          })}

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <span className="pointer-events-auto inline-block bg-marim-dark text-white px-8 py-3 rounded-full text-lg font-bold shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer border-4 border-white/20">
                  Você se encaixa? 👇
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};
