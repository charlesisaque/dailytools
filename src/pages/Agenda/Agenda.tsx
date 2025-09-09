import React, { useState } from "react";
import Page from "../Page";
import { motion, AnimatePresence } from "framer-motion";

const diasSemana = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

interface Tarefa {
  id: number;
  texto: string;
}

const Agenda: React.FC = () => {
  const [tarefas, setTarefas] = useState<{ [dia: string]: Tarefa[] }>(
    diasSemana.reduce((acc, dia) => ({ ...acc, [dia]: [] }), {})
  );
  const [tarefaAtual, setTarefaAtual] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState("Segunda");

  // controle submenus
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [showRemoveOptionsId, setShowRemoveOptionsId] = useState<number | null>(null);

  // configs add/remover
  const [aplicarTodos, setAplicarTodos] = useState(false);
  const [aplicarDias, setAplicarDias] = useState<string[]>([]);
  const [removerConfig, setRemoverConfig] = useState<{
    modo: "um" | "todos" | "especificos";
    dias: string[];
  }>({ modo: "um", dias: [] });

  const adicionarTarefa = () => {
    if (!tarefaAtual.trim()) return;
    const novaTarefa: Tarefa = { id: Date.now(), texto: tarefaAtual };

    const novasTarefas = { ...tarefas };

    if (aplicarTodos) {
      diasSemana.forEach((dia) => {
        novasTarefas[dia] = [...novasTarefas[dia], novaTarefa];
      });
    } else if (aplicarDias.length > 0) {
      aplicarDias.forEach((dia) => {
        novasTarefas[dia] = [...novasTarefas[dia], novaTarefa];
      });
    } else {
      novasTarefas[diaSelecionado] = [...novasTarefas[diaSelecionado], novaTarefa];
    }

    setTarefas(novasTarefas);
    setTarefaAtual("");
    setAplicarTodos(false);
    setAplicarDias([]);
    setShowAddOptions(false);
  };

  const removerTarefa = (id: number, dia: string) => {
    const novasTarefas = { ...tarefas };

    if (removerConfig.modo === "um") {
      novasTarefas[dia] = novasTarefas[dia].filter((t) => t.id !== id);
    } else if (removerConfig.modo === "todos") {
      diasSemana.forEach((d) => {
        novasTarefas[d] = novasTarefas[d].filter((t) => t.id !== id);
      });
    } else if (removerConfig.modo === "especificos") {
      removerConfig.dias.forEach((d) => {
        novasTarefas[d] = novasTarefas[d].filter((t) => t.id !== id);
      });
    }

    setTarefas(novasTarefas);
    setShowRemoveOptionsId(null);
  };

  return (
    <Page title="Agenda" description="Organize suas tarefas do dia a dia">
      {/* Abas dos dias */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {diasSemana.map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSelecionado(dia)}
            className={`px-4 py-2 rounded-lg transition ${
              diaSelecionado === dia
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* Input de nova tarefa */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={tarefaAtual}
            onChange={(e) => setTarefaAtual(e.target.value)}
            placeholder="Nova tarefa"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => setShowAddOptions((prev) => !prev)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Adicionar
          </button>
        </div>

        {/* Submenu adicionar */}
        <AnimatePresence>
          {showAddOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-3 p-4 border rounded bg-gray-50 shadow space-y-2"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={aplicarTodos}
                  onChange={(e) => setAplicarTodos(e.target.checked)}
                />
                Adicionar em todos os dias
              </label>

              <div>
                <span className="font-medium">Adicionar em dias específicos:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {diasSemana.map((dia) => (
                    <label key={dia} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={aplicarDias.includes(dia)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAplicarDias([...aplicarDias, dia]);
                          } else {
                            setAplicarDias(aplicarDias.filter((d) => d !== dia));
                          }
                        }}
                      />
                      {dia}
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={adicionarTarefa}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirmar Adição
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lista de tarefas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Tarefas de {diaSelecionado}
        </h2>
        {tarefas[diaSelecionado].length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa adicionada.</p>
        ) : (
          <ul className="space-y-2">
            {tarefas[diaSelecionado].map((tarefa) => (
              <li
                key={tarefa.id}
                className="relative flex justify-between items-center bg-white shadow p-3 rounded"
              >
                <span>{tarefa.texto}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setShowRemoveOptionsId(
                        showRemoveOptionsId === tarefa.id ? null : tarefa.id
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </button>

                  {/* Submenu remover */}
                  <AnimatePresence>
                    {showRemoveOptionsId === tarefa.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-10 right-0 p-4 border rounded bg-white shadow-lg z-50 space-y-2"
                      >
                        <label className="block">
                          <input
                            type="radio"
                            checked={removerConfig.modo === "um"}
                            onChange={() =>
                              setRemoverConfig({ modo: "um", dias: [] })
                            }
                          />
                          Apenas deste dia
                        </label>
                        <label className="block">
                          <input
                            type="radio"
                            checked={removerConfig.modo === "todos"}
                            onChange={() =>
                              setRemoverConfig({ modo: "todos", dias: [] })
                            }
                          />
                          De todos os dias
                        </label>
                        <label className="block">
                          <input
                            type="radio"
                            checked={removerConfig.modo === "especificos"}
                            onChange={() =>
                              setRemoverConfig({ modo: "especificos", dias: [] })
                            }
                          />
                          Dias específicos
                        </label>

                        {removerConfig.modo === "especificos" && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {diasSemana.map((dia) => (
                              <label key={dia} className="flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={removerConfig.dias.includes(dia)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setRemoverConfig({
                                        ...removerConfig,
                                        dias: [...removerConfig.dias, dia],
                                      });
                                    } else {
                                      setRemoverConfig({
                                        ...removerConfig,
                                        dias: removerConfig.dias.filter(
                                          (d) => d !== dia
                                        ),
                                      });
                                    }
                                  }}
                                />
                                {dia}
                              </label>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() =>
                            removerTarefa(tarefa.id, diaSelecionado)
                          }
                          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                          Confirmar Remoção
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Page>
  );
};

export default Agenda;
