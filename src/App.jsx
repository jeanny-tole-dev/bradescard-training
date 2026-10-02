import React, { useState, useEffect } from 'react';

export default function App() {
  // ===============================
  // ESTADOS
  // ===============================
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // MODULOS
  const [currentModule, setCurrentModule] = useState(1);
  const [maxModuleReached, setMaxModuleReached] = useState(1);

  // JUEGO
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  // ===============================
  // MEZCLAR ARREGLO
  // ===============================
  const mezclarArreglo = (lista) => {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  };

  // ===============================
  // PREPARAR MODULO
  // ===============================
  const prepararModulo = (moduloTarget, preguntasTotales) => {
    const preguntasDelModulo = preguntasTotales.filter(
      (q) => q.modulo === moduloTarget
    );

    if (preguntasDelModulo.length === 0) {
      return [];
    }

    const mezcladas = mezclarArreglo(preguntasDelModulo);

    const seleccionadas = mezcladas.slice(0, 3);

    return seleccionadas.map((pregunta) => {
      const opcionesMezcladas = mezclarArreglo(pregunta.opciones);

      const opcionCorrectaOriginal = pregunta.opciones.find(
        (o) => o.id === pregunta.respuestaCorrecta
      );

      const letras = ["A", "B", "C", "D"];

      const nuevasOpciones = opcionesMezcladas.map((opcion, i) => ({
        id: letras[i],
        texto: opcion.texto,
      }));

      const nuevaRespuestaCorrecta = nuevasOpciones.find(
        (o) => o.texto === opcionCorrectaOriginal.texto
      ).id;

      return {
        ...pregunta,
        opciones: nuevasOpciones,
        respuestaCorrecta: nuevaRespuestaCorrecta,
      };
    });
  };

  // ===============================
  // CARGAR API
  // ===============================
  useEffect(() => {
    const cargarAPI = async () => {
      try {
        const URL_API =
          "https://gist.githubusercontent.com/jptoleocorp17-debug/75e681b5f78351441875d468f88b182e/raw/8d2685776ba075b61a146347f27e1581823e02b7/gistfile1.txt";

        const response = await fetch(URL_API);

        if (!response.ok) {
          throw new Error("Error al conectar con el servidor.");
        }

        const data = await response.json();

        setAllQuestions(data);

        const modulo1 = prepararModulo(1, data);

        setQuestions(modulo1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarAPI();
  }, []);

  // ===============================
  // INICIAR MODULO
  // ===============================
  const iniciarModulo = (numModulo) => {
    const preguntasListas = prepararModulo(numModulo, allQuestions);

    if (preguntasListas.length === 0) {
      alert("Próximamente: módulo en desarrollo.");
      return;
    }

    setCurrentModule(numModulo);
    setQuestions(preguntasListas);

    setIndex(0);
    setScore(0);
    setLives(3);

    setFeedback(null);
    setAnswered(false);
    setGameEnded(false);
    setSelectedOptionId(null);

    setStarted(true);
  };

  const currentQuestion = questions[index];

  // ===============================
  // RESPONDER
  // ===============================
  const handleDecision = (opcionId) => {
    if (answered || gameEnded) return;

    setSelectedOptionId(opcionId);

    const isCorrect = currentQuestion.respuestaCorrecta === opcionId;

    setAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 100);
      setFeedback("CORRECTO");
    } else {
      const updatedLives = lives - 1;

      setLives(updatedLives);
      setFeedback("INCORRECTO");

      if (updatedLives <= 0) {
        setGameEnded(true);
      }
    }
  };

  // ===============================
  // SIGUIENTE PREGUNTA
  // ===============================
  const nextQuestion = () => {
    if (index + 1 < questions.length) {
      setIndex((prev) => prev + 1);

      setAnswered(false);
      setFeedback(null);
      setSelectedOptionId(null);
    } else {
      // DESBLOQUEAR SIGUIENTE MODULO
      if (currentModule >= maxModuleReached) {
        setMaxModuleReached(currentModule + 1);
      }

      setGameEnded(true);
    }
  };

  // ===============================
  // REINICIAR
  // ===============================
  const reiniciarModuloActual = () => {
    iniciarModulo(currentModule);
  };

  // ===============================
  // MENU
  // ===============================
  const volverAlMenu = () => {
    setStarted(false);
    setGameEnded(false);
  };

  // ===============================
  // LOADING
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold">
        Cargando módulos...
      </div>
    );
  }

  // ===============================
  // ERROR
  // ===============================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // =========================================================
  // MENU PRINCIPAL
  // =========================================================
  if (!started && !gameEnded) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-[#c81245] text-sm font-black tracking-[4px] uppercase">
              Bradescard
            </span>

            <h1 className="text-3xl font-black mt-2 text-white">
              Ruta de Capacitación
            </h1>

            <p className="text-white text-sm mt-3">
              Completa cada módulo para desbloquear el siguiente nivel.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((num) => {
              const estaBloqueado = num > maxModuleReached;

              return (
                <button
                  key={num}
                  disabled={estaBloqueado}
                  onClick={() => iniciarModulo(num)}
                  className={`
                    w-full text-left p-5 rounded-2xl border flex justify-between items-center transition-all
                    ${
                      estaBloqueado
                        ? "bg-slate-950 border-slate-800 opacity-50 cursor-not-allowed"
                        : "bg-slate-800 border-slate-700 hover:border-[#c81245]"
                    }
                  `}
                >
                  <div>
                    <h3 className="font-bold text-white">
                      Módulo {num}
                    </h3>

                    <p className="text-white text-sm mt-1">
                      {num === 1 && "Tipologías de fraude"}
                      {num === 2 && "Validación digital"}
                      {num === 3 && "Bloqueos preventivos"}
                      {num === 4 && "Casos avanzados"}
                    </p>
                  </div>

                  <span className="text-xl">
                    {estaBloqueado ? "🔒" : "▶️"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // RESULTADOS
  // =========================================================
  if (gameEnded) {
    const haAprobado = lives > 0;

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
          <span className="text-[#c81245] text-sm font-black uppercase">
            Resultados Módulo {currentModule}
          </span>

          <h2
            className={`text-3xl font-black mt-4 ${
              haAprobado ? "text-green-400" : "text-red-400"
            }`}
          >
            {haAprobado
              ? "¡MÓDULO APROBADO!"
              : "MÓDULO FALLIDO"}
          </h2>

          <p className="text-white mt-4">
            {haAprobado
              ? "Excelente trabajo."
              : "Te quedaste sin vidas."}
          </p>

          <div className="mt-6 bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <span className="text-white text-sm block">
              Puntuación
            </span>

            <span className="text-amber-400 text-3xl font-black">
              {score}
            </span>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            {haAprobado ? (
              <>
                <button
                  onClick={() => iniciarModulo(currentModule + 1)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl"
                >
                  SIGUIENTE MÓDULO →
                </button>

                <button
                  onClick={volverAlMenu}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-2xl"
                >
                  Volver al menú
                </button>
              </>
            ) : (
              <button
                onClick={reiniciarModuloActual}
                className="w-full bg-[#c81245] hover:bg-[#a50f3a] text-white font-bold py-4 rounded-2xl"
              >
                REINTENTAR
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // JUEGO
  // =========================================================
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="bg-[#c81245] py-4 flex justify-center">
          <h1 className="text-2xl font-black">
            Bradescard
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-4">

          {/* BARRA */}
          <div className="w-full bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-[#c81245] h-2 rounded-full transition-all"
              style={{
                width: `${((index + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* INFO */}
          <div className="flex justify-between items-center">

            <div>
              <span className="text-white text-xs uppercase">
                Módulo
              </span>

              <h3 className="font-black">
                Nivel {currentModule}
              </h3>
            </div>

            <div className="text-center">
              <span className="text-white text-xs uppercase">
                Puntos
              </span>

              <h3 className="font-black text-amber-400">
                {score} pts
              </h3>
            </div>

            <div className="text-right">
              <span className="text-white text-xs uppercase">
                Vidas
              </span>

              <h3 className="text-lg">
                {"❤️".repeat(lives)}
              </h3>
            </div>

          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto w-full">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col min-h-[700px]">

          <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
            <h2 className="font-black text-white">
              Módulos
            </h2>

            <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-white">
              {maxModuleReached - 1}/4
            </span>
          </div>

          <div className="flex flex-col gap-4 flex-1">

            {[1, 2, 3, 4].map((num) => {
              const bloqueado = num > maxModuleReached;

              return (
                <button
                  key={num}
                  disabled={bloqueado}
                  onClick={() => iniciarModulo(num)}
                  className={`
                    p-4 rounded-2xl border text-left transition-all flex items-center justify-between
                    ${
                      currentModule === num
                        ? "bg-[#c81245] border-[#c81245]"
                        : "bg-slate-800 border-slate-700"
                    }
                    ${
                      bloqueado
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:border-[#c81245]"
                    }
                  `}
                >
                  <div>
                    <h3 className="font-bold text-white">
                      Módulo {num}
                    </h3>

                    <p className="text-sm text-white mt-1">
                      {num === 1 && "Fraudes"}
                      {num === 2 && "Identidad"}
                      {num === 3 && "Bloqueos"}
                      {num === 4 && "Evaluación"}
                    </p>
                  </div>

                  <div className="text-xl">
                    {bloqueado ? "🔒" : "✅"}
                  </div>
                </button>
              );
            })}

          </div>
        </aside>

        {/* PREGUNTAS */}
        <div className="flex-1">

          <div className="text-center mb-5">
            <span className="bg-[#005691] text-white text-xs px-4 py-2 rounded-full font-bold">
              Caso {index + 1} de {questions.length}
            </span>
          </div>

          {/* TARJETA */}
          <div
            className={`
              bg-slate-900 border rounded-3xl p-8 shadow-2xl transition-all
              ${
                feedback === "CORRECTO"
                  ? "border-green-500"
                  : feedback === "INCORRECTO"
                  ? "border-red-500"
                  : "border-slate-800"
              }
            `}
          >

            {feedback && (
              <div
                className={`
                  mb-5 rounded-2xl p-4 border text-sm
                  ${
                    feedback === "CORRECTO"
                      ? "bg-green-500/10 border-green-500 text-green-300"
                      : "bg-red-500/10 border-red-500 text-red-300"
                  }
                `}
              >
                <h2 className="font-black mb-2">
                  {feedback === "CORRECTO"
                    ? "✅ RESPUESTA CORRECTA"
                    : "❌ RESPUESTA INCORRECTA"}
                </h2>

                <p>
                  {feedback === "CORRECTO"
                    ? currentQuestion?.feedbackCorrecto
                    : currentQuestion?.feedbackIncorrecto}
                </p>
              </div>
            )}

            <p className="text-white text-lg leading-relaxed">
              {currentQuestion?.escenario}
            </p>

            <div className="border-t border-slate-700 pt-4 mt-6 flex justify-between text-sm text-white">
              <span>
                Submódulo: {currentQuestion?.submodulo}
              </span>

              <span>
                ID #{currentQuestion?.id}
              </span>
            </div>

          </div>

          {/* OPCIONES */}
          <div className="flex flex-col gap-4 mt-6">

            {currentQuestion?.opciones.map((opc) => {
              const esSeleccionado = selectedOptionId === opc.id;

              return (
                <button
                  key={opc.id}
                  disabled={answered}
                  onClick={() => handleDecision(opc.id)}
                  className={`
                    w-full text-left border rounded-2xl p-5 transition-all flex gap-4
                    ${
                      esSeleccionado && feedback === "CORRECTO"
                        ? "border-green-500 bg-green-500/10"
                        : ""
                    }
                    ${
                      esSeleccionado && feedback === "INCORRECTO"
                        ? "border-red-500 bg-red-500/10"
                        : ""
                    }
                    ${
                      !esSeleccionado
                        ? "bg-slate-900 border-slate-800 hover:border-[#c81245]"
                        : ""
                    }
                  `}
                >

                  <span
                    className={`
                      min-w-[35px] h-[35px] rounded-xl flex items-center justify-center font-bold
                      ${
                        esSeleccionado && feedback === "CORRECTO"
                          ? "bg-green-500"
                          : esSeleccionado && feedback === "INCORRECTO"
                          ? "bg-red-500"
                          : "bg-slate-800"
                      }
                    `}
                  >
                    {opc.id}
                  </span>

                  <span className="text-white">
                    {opc.texto}
                  </span>

                </button>
              );
            })}
          </div>

          {/* CONTINUAR */}
          {answered && (
            <button
              onClick={nextQuestion}
              className="w-full mt-6 bg-[#c81245] hover:bg-[#a50f3a] text-white font-black py-4 rounded-2xl"
            >
              CONTINUAR →
            </button>
          )}

        </div>
      </main>
    </div>
  );
}