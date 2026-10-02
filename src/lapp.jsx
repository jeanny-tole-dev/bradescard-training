import React, { useState } from 'react';
import { 
  Trophy, 
  Shield, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  RotateCcw, 
  Lock, 
  Smartphone,
  ChevronRight
} from 'lucide-react';

// LOGO CORPORATIVO
function BradescardLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <img 
        src="/one.png" 
        alt="Logo" 
        className="block h-10 w-10 object-contain" 
      />
      <span className="font-sans font-normal text-3xl tracking-tight text-white mt-1">
        bradescard<span className="text-[#c40035] font-bold">.</span>
      </span>
    </div>
  );
}

// PROGRAMA ESTRUCTURADO CON LOS SUBMÓDULOS INTEGRADOS
const MODULES_DATA = [
  {
    id: 1,
    title: "M1: Tarjetas y Tipologías de Fraude",
    desc: "Aprende qué es una tarjeta, cómo se compone y los principales tipos de fraude a prevenir.",
    cards: [
      { id: 101, q: "¿Cómo se compone una tarjeta?", a: "BINES (primeros 6 dígitos), SECUENCIA (sucesión de números) y PORTADOR (terminación para conocer reposiciones)." },
      { id: 102, q: "Fraudes Físicos y por Internet", a: "Clonación (robo con skimmers), Pérdida o Robo y Fraude por Internet (bots, hackeos en e-commerce)." },
      { id: 103, q: "Engaños e Identidad", a: "Usurpación de Identidad, Phishing (engaño por links/llamadas) y Cuentas Mula (prestar la tarjeta)." }
    ],
    hotspot: {
      instruction: "Identifica los tipos de fraude en los siguientes escenarios:",
      targetName: "Escenarios de Riesgo",
      hotspots: [
        { id: 'h1_1', x: '25%', y: '45%', name: "Fraude Interno", desc: "Uso indebido de un puesto o acceso a sistemas corporativos para beneficio personal." },
        { id: 'h1_2', x: '75%', y: '60%', name: "Phishing", desc: "Método de engaño mediante correos, SMS o llamadas simulando ser una institución confiable." }
      ]
    },
    simulation: {
      scenario: "Un cliente reporta cargos no reconocidos. Menciona que perdió su tarjeta hace unos días por descuido, pero no la reportó de inmediato.",
      options: [
        { text: "Levantar el reporte para reembolsarle todo el dinero, ya que fue víctima de un robo sin violencia.", isCorrect: false, feedback: "Incorrecto. Los cargos por extravío previos al reporte no se reembolsan." },
        { text: "Informarle que los cargos realizados mientras no tenía la tarjeta NO se reembolsan, y bloquearla por extravío.", isCorrect: true, feedback: "¡Correcto! Aplicaste el bloqueo permanente de inmediato según las políticas." }
      ]
    }
  },
  {
    id: 2,
    title: "M2: Vision+ Acceso y Navegación",
    desc: "Aprende a navegar en el sistema operativo de tarjetas Bradescard.",
    cards: [
      { id: 201, q: "¿Qué es Vision+ y cómo se activa?", a: "Sistema con datos e historial de clientes. Se activa ingresando el comando 'ASRS' (dura 24 horas activo)." },
      { id: 202, q: "Comando Principal (ASMW)", a: "Se utiliza para aplicar bloqueos Permanentes (Fraude, Robo/Extravío) o Preventivos (Internet, Total)." },
      { id: 203, q: "Desbloqueos de Tarjeta", a: "Solo se pueden retirar los bloqueos preventivos (Desbloqueo por Internet o Desbloqueo Total) cuando el cliente reconoce las compras." }
    ],
    hotspot: {
      instruction: "Ubica los comandos esenciales dentro de la pantalla simulada de Vision+:",
      targetName: "Terminal Vision+",
      hotspots: [
        { id: 'h2_1', x: '40%', y: '30%', name: "Activación Diaria (ASRS)", desc: "Comando que debe ingresarse al inicio del turno y dura 24 horas." },
        { id: 'h2_2', x: '70%', y: '65%', name: "Comando Principal (ASMW)", desc: "Aquí ingresamos la tarjeta de 16 dígitos para realizar gestiones operativas." }
      ]
    },
    simulation: {
      scenario: "Contactas a un tarjetahabiente por compras de alto riesgo. El cliente te confirma que TIENE su tarjeta en la mano y NO reconoce esas transacciones físicas.",
      options: [
        { text: "Aplicar un Bloqueo Preventivo Total (ASMW) mientras investigamos más a fondo.", isCorrect: false, feedback: "¡Error! Si no reconoce compras físicas pero tiene la tarjeta, es clonación. Requiere bloqueo permanente." },
        { text: "Aplicar un Bloqueo Permanente por Fraude, informarle que está prohibido retirarlo y que requiere reposición.", isCorrect: true, feedback: "¡Excelente! El bloqueo por fraude es permanente e irreversible." }
      ]
    }
  },
  {
    id: 3,
    title: "M3: Comandos Clave en Vision+",
    desc: "Submódulo 2.1: Gestión e interpretación de los bloqueos en el sistema.",
    cards: [
      { id: 301, q: "Comando ASHI y ARQB", a: "ASHI es para revisar/agregar comentarios de la cuenta. ARQB sirve para visualizar la fecha de apertura o embozo." },
      { id: 302, q: "Bloqueos de Cobranza Críticos", a: "Bloqueos como D (Desactivado), I (Incobrable), O (Fallecimiento) o S. Con estos, el cliente NO puede hacer compras." },
      { id: 303, q: "Protocolo de Monitoreo", a: "Si ves un bloqueo D, I, O, S o C, NO se debe llamar al cliente ni generar un caso en monitoreo." }
    ],
    hotspot: {
      instruction: "Identifica los indicadores en la interfaz de cuenta:",
      targetName: "Interfaz ARIQ",
      hotspots: [
        { id: 'h3_1', x: '30%', y: '25%', name: "Límite de Crédito", desc: "TOTAL CR LMT nos muestra el límite total asignado al cliente." },
        { id: 'h3_2', x: '70%', y: '75%', name: "Bloqueo de Cuenta", desc: "En la sección BLK DC identificamos si tiene letras de bloqueo operativo o de cobranza." }
      ]
    },
    simulation: {
      scenario: "Estás en el área de Monitoreo Bicas y detectas una cuenta con un comportamiento inusual. Al revisar Vision+, notas que la cuenta tiene un bloqueo con la letra 'D' (Desactivado).",
      options: [
        { text: "Generar la llamada al cliente para advertirle sobre el comportamiento inusual y pedirle que regularice su cuenta.", isCorrect: false, feedback: "Incorrecto. El cliente ya desactivó su cuenta, llamarlo podría causar molestia." },
        { text: "No generar la llamada y omitir el caso, ya que las tarjetas con bloqueo D, I, O, S o C no se trabajan en monitoreo.", isCorrect: true, feedback: "¡Perfecto! Aplicaste el protocolo correcto de omisión de gestión." }
      ]
    }
  },
  {
    id: 4,
    title: "M4: Lectura de Facturas Vision+",
    desc: "Submódulo 2.2: Comandos para revisar la facturación y movimientos del cliente.",
    cards: [
      { id: 401, q: "Comandos de Facturación", a: "ARTD para ver la factura al corte actual. ARSD para ver el historial de todas las facturas." },
      { id: 402, q: "Planes de Compra", a: "El Plan 1100 es Compra Nacional, Plan 1181 es Compra Internacional y Plan 3191 es Compra Diferida (a meses)." },
      { id: 403, q: "Conceptos de Transacción", a: "La letra 'D' significa Compra, 'C' es Devolución (ej. C850) y 'M' representa Promoción." }
    ],
    hotspot: {
      instruction: "Encuentra la información clave dentro de una línea de facturación:",
      targetName: "Detalle de Transacción",
      hotspots: [
        { id: 'h4_1', x: '20%', y: '40%', name: "Fecha de Posteo", desc: "Muestra cuándo el comercio hizo efectivo el cobro (puede ser distinto a la fecha de compra)." },
        { id: 'h4_2', x: '80%', y: '60%', name: "Auth (Número de Autenticación)", desc: "El código único que nos permite rastrear y validar la transacción específica con el comercio." }
      ]
    },
    simulation: {
      scenario: "Un cliente llama reclamando un doble cobro de Rappi. Al ingresar con ARTD, ves dos movimientos el mismo día: Uno tiene la letra 'D' y el otro tiene 'C850'.",
      options: [
        { text: "Levantar un reporte de fraude por doble cargo, ya que ambos aparecen en el estado de cuenta.", isCorrect: false, feedback: "Error de lectura. La letra C significa devolución, no necesitas levantar un fraude." },
        { text: "Explicarle al cliente que la letra 'D' es la compra, pero la 'C850' es la devolución, por lo que el cargo ya fue reembolsado.", isCorrect: true, feedback: "¡Excellent! Interpretaste correctamente el código C850 de devolución del comercio." }
      ]
    }
  },
  {
    id: 5,
    title: "M5: Aplicativo Falcon-Fico",
    desc: "Módulo 3: Prevención y validación de transacciones en tiempo real.",
    cards: [
      { id: 501, q: "¿Qué es Falcon-Fico?", a: "Es el aplicativo que nos permite validar y monitorear las compras de los tarjetahabientes en tiempo real." },
      { id: 502, q: "Detección de Riesgos", a: "El sistema alerta basándose en reglas operativas programadas que identifican patrones de alto riesgo." },
      { id: 503, q: "Variables Analizadas", a: "Evalúa los montos, el tiempo entre compras y los modos de entrada (Chip, Internet, Contactless, etc.)." }
    ],
    hotspot: {
      instruction: "Ubica los filtros de alerta en la consola de Falcon:",
      targetName: "Monitor Falcon",
      hotspots: [
        { id: 'h5_1', x: '35%', y: '40%', name: "Modo de Entrada", desc: "El sistema clasifica si la operación fue física o E-commerce (Internet) al instante." },
        { id: 'h5_2', x: '65%', y: '75%', name: "Ráfaga de Transacciones", desc: "Alerta de tiempo que detecta múltiples intentos de compra en minutos (patrón de fraude común)." }
      ]
    },
    simulation: {
      scenario: "Falcon lanza una alerta en tiempo real. El modo de entrada es por Internet, los montos son inusuales y el número registrado no contesta para validar.",
      options: [
        { text: "Dejar pasar la transacción para no bloquear la cuenta del cliente hasta que él mismo se comunique.", isCorrect: false, feedback: "Mala decisión. En la prevención de fraude el tiempo es crítico." },
        { text: "Analizar el patrón en Falcon y aplicar un Bloqueo Preventivo por Internet en Vision+ ante la falta de contacto.", isCorrect: true, feedback: "¡Correcto! Utilizaste Falcon para detectar y Vision+ para prevenir el impacto." }
      ]
    }
  },
  {
    id: 6,
    title: "M6: Prevención Avanzada (Próximamente)",
    desc: "Contenido pendiente de carga.",
    cards: [
      { id: 601, q: "En construcción", a: "Módulo pendiente." },
      { id: 602, q: "En construcción", a: "Módulo pendiente." },
      { id: 603, q: "En construcción", a: "Módulo pendiente." }
    ],
    hotspot: { instruction: "Módulo en construcción.", targetName: "Sistema", hotspots: [{ id: 'h6_1', x: '50%', y: '50%', name: "Pendiente", desc: "Próximamente." }] },
    simulation: { scenario: "En construcción.", options: [{ text: "Avanzar", isCorrect: true, feedback: "Completado." }, { text: "Esperar", isCorrect: false, feedback: "Avanza." }] }
  },
  {
    id: 7,
    title: "M7: Reporte de Incidentes (Próximamente)",
    desc: "Contenido pendiente de carga.",
    cards: [
      { id: 701, q: "En construcción", a: "Módulo pendiente." },
      { id: 702, q: "En construcción", a: "Módulo pendiente." },
      { id: 703, q: "En construcción", a: "Módulo pendiente." }
    ],
    hotspot: { instruction: "Módulo en construcción.", targetName: "Sistema", hotspots: [{ id: 'h7_1', x: '50%', y: '50%', name: "Pendiente", desc: "Próximamente." }] },
    simulation: { scenario: "En construcción.", options: [{ text: "Avanzar", isCorrect: true, feedback: "Completado." }, { text: "Esperar", isCorrect: false, feedback: "Avanza." }] }
  },
  {
    id: 8,
    title: "M8: Evaluación Final (Próximamente)",
    desc: "Contenido pendiente de carga.",
    cards: [
      { id: 801, q: "En construcción", a: "Módulo pendiente." },
      { id: 802, q: "En construcción", a: "Módulo pendiente." },
      { id: 803, q: "En construcción", a: "Módulo pendiente." }
    ],
    hotspot: { instruction: "Módulo en construcción.", targetName: "Sistema", hotspots: [{ id: 'h8_1', x: '50%', y: '50%', name: "Pendiente", desc: "Próximamente." }] },
    simulation: { scenario: "En construcción.", options: [{ text: "Avanzar", isCorrect: true, feedback: "Completado." }, { text: "Esperar", isCorrect: false, feedback: "Avanza." }] }
  }
];

export default function App() {
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0); // Forzado al primer módulo correctamente
  const [completedModules, setCompletedModules] = useState([]); 
  const [currentStep, setCurrentStep] = useState(1); 
  
  const [cardsFlipped, setCardsFlipped] = useState({}); 
  const [foundHotspots, setFoundHotspots] = useState([]); 
  const [selectedHotspot, setSelectedHotspot] = useState(null); 
  const [simulationChoice, setSimulationChoice] = useState(null); 
  const [score, setScore] = useState(1200); 

  const activeModule = MODULES_DATA[currentModuleIdx];
  const cards = activeModule?.cards || [];
  const hotspots = activeModule?.hotspot?.hotspots || [];
  
  const isAllCardsRead = cards.length > 0 && cards.every(card => cardsFlipped[card.id]);
  const isAllHotspotsFound = hotspots.length > 0 && foundHotspots.length === hotspots.length;

  const handleSelectModule = (idx) => {
    setCurrentModuleIdx(idx);
    setCurrentStep(1); 
    setCardsFlipped({});
    setFoundHotspots([]);
    setSelectedHotspot(null);
    setSimulationChoice(null);
  };

  const handleFlipCard = (cardId) => {
    setCardsFlipped(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const handleHotspotClick = (hot) => {
    if (!foundHotspots.includes(hot.id)) {
      setFoundHotspots(prev => [...prev, hot.id]);
    }
    setSelectedHotspot(selectedHotspot?.id === hot.id ? null : hot);
  };

  const handleSelectOption = (opt) => {
    setSimulationChoice(opt);
    if (opt.isCorrect) {
      setScore(prev => prev + 250);
      if (!completedModules.includes(activeModule.id)) {
        setCompletedModules(prev => [...prev, activeModule.id]);
      }
    }
  };

  return (
    <div translate="no" className="min-h-screen bg-[#0f172a] p-4 md:p-10 flex justify-center items-center w-full">
      <div className="max-w-[1250px] w-full bg-[#f8fafc] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* HEADER BRANDING */}
        <div className="bg-gradient-to-r from-[#300030] to-[#4a004a] px-6 py-5 flex justify-between items-center text-white border-b-4 border-[#c40035] shadow-md">
          <BradescardLogo />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-xs md:text-sm font-semibold select-none">
              <Trophy className="w-4 h-4 text-[#eab308]" />
              <span className="text-slate-100">Nivel: Guardián Novato</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-xs md:text-sm font-semibold select-none">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-100">Score: {score} pts</span>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN PASOS */}
        <div className="bg-white px-6 md:px-10 py-5 flex flex-col sm:flex-row justify-between gap-4 border-b border-[#e2e8f0] select-none">
          <button 
            onClick={() => setCurrentStep(1)} 
            className={`flex items-center gap-3 font-semibold text-left transition ${currentStep === 1 ? 'text-[#c40035]' : isAllCardsRead ? 'text-emerald-500 hover:opacity-80' : 'text-slate-400'}`}
          >
            <div className={`w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold transition ${currentStep === 1 ? 'bg-[#c40035] text-white' : isAllCardsRead ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>
              {isAllCardsRead ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold leading-none">Paso 1</div>
              <span className="text-sm">Absorber (Tarjetas)</span>
            </div>
          </button>

          <button 
            onClick={() => isAllCardsRead && setCurrentStep(2)} 
            disabled={!isAllCardsRead}
            className={`flex items-center gap-3 font-semibold text-left transition ${currentStep === 2 ? 'text-[#300030]' : isAllHotspotsFound ? 'text-emerald-500 hover:opacity-80' : 'text-slate-400'} ${!isAllCardsRead && 'cursor-not-allowed opacity-50'}`}
          >
            <div className={`w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold transition ${currentStep === 2 ? 'bg-[#c40035] text-white' : isAllHotspotsFound ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>
              {isAllHotspotsFound ? <Check className="w-4 h-4" /> : "2"}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold leading-none">Paso 2</div>
              <span className="text-sm">Explorar (Hotspot Visual)</span>
            </div>
          </button>

          <button 
            onClick={() => isAllHotspotsFound && setCurrentStep(3)} 
            disabled={!isAllHotspotsFound}
            className={`flex items-center gap-3 font-semibold text-left transition ${currentStep === 3 ? 'text-[#300030]' : simulationChoice?.isCorrect ? 'text-emerald-500 hover:opacity-80' : 'text-slate-400'} ${!isAllHotspotsFound && 'cursor-not-allowed opacity-50'}`}
          >
            <div className={`w-8 h-8 rounded-full flex justify-center items-center text-xs font-bold transition ${currentStep === 3 ? 'bg-[#c40035] text-white' : simulationChoice?.isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>
              {simulationChoice?.isCorrect ? <Check className="w-4 h-4" /> : "3"}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold leading-none">Paso 3</div>
              <span className="text-sm">Decidir (Simulación Express)</span>
            </div>
          </button>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-10">
          
          <div className="lg:col-span-2 flex flex-col justify-between bg-white rounded-xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm min-h-[420px]">
            <div className="space-y-6">
              <div className="zone-header border-b border-slate-100 pb-4 select-none">
                <span className="text-xs uppercase tracking-widest text-[#c40035] font-black">
                  {currentStep === 1 ? "Lectura Activa" : currentStep === 2 ? "Exploración Visual" : "Toma de Decisiones"}
                </span>
                <h2 className="text-2xl font-bold text-[#300030] mt-1">{activeModule?.title}</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {currentStep === 1 ? "Haz clic en todas las tarjetas para poder avanzar al paso 2." : currentStep === 2 ? activeModule?.hotspot?.instruction : "Analiza la situación y selecciona la respuesta correcta."}
                </p>
              </div>

              {/* PASO 1 */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
                  {cards.map((card, i) => {
                    const isFlipped = cardsFlipped[card.id];
                    return (
                      <div key={card.id} onClick={() => handleFlipCard(card.id)} className={`h-44 cursor-pointer rounded-xl p-5 flex flex-col justify-between border-2 transition-all duration-300 ${isFlipped ? 'bg-slate-50 border-[#c40035] shadow-inner scale-[0.99]' : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-md'}`}>
                        <div>
                          <span className="text-[10px] font-bold text-[#c40035] uppercase tracking-wider block mb-1">Concepto {i+1}</span>
                          <p className="text-xs text-slate-800 leading-relaxed font-semibold">{isFlipped ? card.a : card.q}</p>
                        </div>
                        <span className="text-[10px] text-[#c40035] font-bold flex items-center gap-1 mt-2">
                          <RotateCcw className="w-3 h-3" /> {isFlipped ? "Volver a ver" : "Girar tarjeta"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PASO 2 */}
              {currentStep === 2 && (
                <div className="relative w-full bg-[#f1f5f9] rounded-xl h-72 border-2 border-dashed border-[#cbd5e1] flex items-center justify-center p-6 shadow-inner">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xl p-5 w-full max-w-[340px] text-center z-10 transition-transform duration-300 hover:scale-[1.01]">
                    <div className="text-[10px] text-slate-500 bg-slate-50 border rounded px-2.5 py-1 font-mono truncate mb-3 text-left">
                      http://intranet-bradescard/terminal
                    </div>
                    <div className="bg-[#300030]/5 rounded py-4 text-[#300030] text-xs font-bold flex items-center justify-center gap-2 border border-[#300030]/10">
                      <Smartphone className="w-5 h-5 text-[#c40035] shrink-0" />
                      <span>{activeModule?.hotspot?.targetName}</span>
                    </div>
                  </div>

                  {hotspots.map((hot) => {
                    const isFound = foundHotspots.includes(hot.id);
                    return (
                      <button key={hot.id} onClick={() => handleHotspotClick(hot)} style={{ left: hot.x, top: hot.y }} className={`absolute w-8 h-8 rounded-full flex items-center justify-center border-2 font-black text-sm transition-all duration-300 z-20 ${isFound ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-red-500/20 border-[#c40035] text-[#c40035]'}`}>
                        {isFound ? "✓" : "!"}
                      </button>
                    );
                  })}

                  {selectedHotspot && (
                    <div className="absolute bg-[#300030] text-white p-4 rounded-xl text-xs max-w-[220px] shadow-2xl bottom-4 left-4 border border-white/10 z-30">
                      <div className="flex items-center gap-1.5 text-[#eab308] font-bold mb-1">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{selectedHotspot.name}</span>
                      </div>
                      <p className="text-slate-200 leading-tight font-medium">{selectedHotspot.desc}</p>
                    </div>
                  )}
                </div>
              )}

              {/* PASO 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-150 p-6 rounded-xl text-center shadow-inner font-bold text-slate-700 leading-relaxed">
                    "{activeModule?.simulation?.scenario}"
                  </div>
                  {!simulationChoice ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activeModule?.simulation?.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleSelectOption(opt)} className="p-4 border-2 border-slate-100 bg-white hover:border-[#c40035] hover:bg-[#c40035]/5 text-left rounded-xl transition-all duration-200 text-xs md:text-sm text-slate-700 font-semibold flex items-start gap-3 shadow-sm">
                          <div className="w-5 h-5 bg-slate-100 border rounded-full flex items-center justify-center text-xs shrink-0 text-slate-500 font-bold">{idx === 0 ? "A" : "B"}</div>
                          <span className="leading-snug">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`p-5 border-2 rounded-xl text-center text-xs md:text-sm font-semibold transition-all duration-350 ${simulationChoice.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'}`}>
                      <p className="mb-3">{simulationChoice.feedback}</p>
                      {!simulationChoice.isCorrect && <button onClick={() => setSimulationChoice(null)} className="text-xs bg-slate-900 text-white px-3.5 py-2 rounded-md hover:bg-slate-800 transition flex items-center gap-1.5 mx-auto"><RotateCcw className="w-3.5 h-3.5" /> Reintentar</button>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BOTONES INFERIORES */}
            <div className="flex justify-between items-center border-t border-slate-150 pt-4 mt-6 select-none">
              <span className="text-xs text-slate-400 font-bold">
                {currentStep === 1 && `Tarjetas leídas: ${cards.filter(c => cardsFlipped[c.id]).length} / 3`}
                {currentStep === 2 && `Riesgos encontrados: ${foundHotspots.length} / ${hotspots.length}`}
                {currentStep === 3 && (simulationChoice?.isCorrect ? "¡Módulo de Seguridad Completado!" : "Evaluación Pendiente")}
              </span>

              {currentStep === 1 && (
                <button disabled={!isAllCardsRead} onClick={() => setCurrentStep(2)} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${isAllCardsRead ? 'bg-[#c40035] text-white hover:bg-[#a0002b] shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  Siguiente paso <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {currentStep === 2 && (
                <button disabled={!isAllHotspotsFound} onClick={() => setCurrentStep(3)} className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${isAllHotspotsFound ? 'bg-[#c40035] text-white hover:bg-[#a0002b] shadow-md' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                  Siguiente paso <ArrowRight className="w-4 h-4" />
                </button>
              )}
              {currentStep === 3 && simulationChoice?.isCorrect && (
                <button onClick={() => {
                  if (currentModuleIdx < MODULES_DATA.length - 1) handleSelectModule(currentModuleIdx + 1);
                  else alert("¡Felicidades! Completaste tu capacitación operativa.");
                }} className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-600 transition shadow-md">
                  Siguiente Módulo <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* SIDEBAR DE MÓDULOS */}
          <div className="bg-white rounded-xl p-5 border border-[#e2e8f0] shadow-sm h-fit">
            <div className="font-bold text-md text-[#300030] pb-3 mb-4 border-b border-slate-100 flex justify-between items-center select-none">
              <span>Módulos de Capacitación</span>
              <span className="bg-slate-100 border text-xs px-2.5 py-0.5 rounded-full font-bold text-slate-500">{completedModules.length}/8</span>
            </div>
            <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1">
              {MODULES_DATA.map((mod, idx) => {
                const isCompleted = completedModules.includes(mod.id);
                const isActive = idx === currentModuleIdx;
                const isUnlocked = idx === 0 || completedModules.includes(MODULES_DATA[idx - 1].id);

                return (
                  <button 
                    key={mod.id} 
                    onClick={() => {
                      if (isUnlocked) handleSelectModule(idx);
                    }} 
                    className={`w-full text-left p-3 rounded-lg border text-xs font-semibold flex justify-between items-center transition-all ${isActive ? 'border-l-4 border-l-[#c40035] bg-red-50/40 border-[#c40035]/20 font-bold text-[#c40035]' : isCompleted ? 'bg-emerald-50/20 border-emerald-100 text-emerald-800 hover:bg-emerald-100/50' : isUnlocked ? 'bg-slate-50 text-slate-700 hover:bg-slate-100' : 'bg-slate-50/50 text-slate-400 cursor-not-allowed'}`}
                  >
                    <span className="truncate max-w-[180px]" title={mod.title}>{mod.title}</span>
                    {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 
                      : isActive ? <div className="w-1.5 h-1.5 rounded-full bg-[#c40035] shrink-0" /> 
                      : isUnlocked ? <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" /> 
                      : <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}