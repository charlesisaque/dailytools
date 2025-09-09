import React, { useState } from "react";
import Page from "../Page";


interface Atividade {
  id: number;
  distancia?: number;
  tempo?: number;
  velocidade?: number;
  calorias: number;
}

const diasDaSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const Saude: React.FC = () => {
  const [atividadesPorDia, setAtividadesPorDia] = useState<Record<string, Atividade[]>>(
    diasDaSemana.reduce((acc, dia) => ({ ...acc, [dia]: [] }), {})
  );
  const [diaSelecionado, setDiaSelecionado] = useState("Seg");
  const [showCard, setShowCard] = useState(false);
  const [distancia, setDistancia] = useState<number | "">("");
  const [tempo, setTempo] = useState<number | "">("");
  const [velocidade, setVelocidade] = useState<number | "">("");
  const [showOpcoes, setShowOpcoes] = useState(false);
  const [aplicarTodosDias, setAplicarTodosDias] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);

  const calcularFaltante = () => {
    const d = distancia !== "" ? Number(distancia) : undefined;
    const t = tempo !== "" ? Number(tempo) : undefined;
    const v = velocidade !== "" ? Number(velocidade) : undefined;

    if (d !== undefined && t !== undefined && v === undefined) return d / (t / 60);
    if (d !== undefined && v !== undefined && t === undefined) return (d / v) * 60;
    if (v !== undefined && t !== undefined && d === undefined) return v * (t / 60);
    return 0;
  };

  const calcularCalorias = (d: number) => {
    const peso = 70;
    return d * peso;
  };

  const adicionarAtividade = () => {
    let d = distancia !== "" ? Number(distancia) : undefined;
    let t = tempo !== "" ? Number(tempo) : undefined;
    let v = velocidade !== "" ? Number(velocidade) : undefined;

    if ([d, t, v].filter(Boolean).length < 2) {
      alert("Preencha pelo menos 2 campos!");
      return;
    }

    if (d === undefined) d = (v! * t!) / 60;
    if (t === undefined) t = (d! / v!) * 60;
    if (v === undefined) v = d! / (t! / 60);

    const novaAtividade: Atividade = {
      id: Date.now(),
      distancia: d,
      tempo: t,
      velocidade: v,
      calorias: calcularCalorias(d),
    };

    const diasParaAdicionar = aplicarTodosDias ? diasDaSemana : diasSelecionados.length > 0 ? diasSelecionados : [diaSelecionado];

    const novoEstado = { ...atividadesPorDia };
    diasParaAdicionar.forEach(dia => {
      novoEstado[dia] = [...novoEstado[dia], novaAtividade];
    });

    setAtividadesPorDia(novoEstado);
    setShowCard(false);
    setShowOpcoes(false);
    setDistancia("");
    setTempo("");
    setVelocidade("");
    setDiasSelecionados([]);
    setAplicarTodosDias(false);
  };

  const removerAtividade = (id: number, dia: string) => {
    const novoEstado = { ...atividadesPorDia };
    novoEstado[dia] = novoEstado[dia].filter(a => a.id !== id);
    setAtividadesPorDia(novoEstado);
  };

  const removerTodosDias = (atividadeId: number) => {
    const novoEstado = { ...atividadesPorDia };
    diasDaSemana.forEach(dia => {
      novoEstado[dia] = novoEstado[dia].filter(a => a.id !== atividadeId);
    });
    setAtividadesPorDia(novoEstado);
  };

  const totalCalorias = atividadesPorDia[diaSelecionado].reduce((acc, a) => acc + a.calorias, 0);

  return (
    <Page title="Saúde" description="Controle suas atividades físicas semanais">
      {/* Abas */}
      <div className="flex space-x-2 mb-4">
        {diasDaSemana.map(dia => (
          <button
            key={dia}
            onClick={() => setDiaSelecionado(dia)}
            className={`px-4 py-2 rounded-t-lg font-bold transition ${
              diaSelecionado === dia ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {dia}
          </button>
        ))}
      </div>

      {/* Adicionar Atividade */}
      <div className="mb-4">
        <button
          onClick={() => setShowCard(!showCard)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          {showCard ? "Cancelar" : "Adicionar Atividade"}
        </button>

        {showCard && (
          <div className="mt-2 p-4 bg-gray-100 rounded shadow-md animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label>Distância (km)</label>
                <input
                  type="number"
                  value={distancia}
                  onChange={e => setDistancia(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Tempo (min)</label>
                <input
                  type="number"
                  value={tempo}
                  onChange={e => setTempo(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label>Velocidade (km/h)</label>
                <input
                  type="number"
                  value={velocidade}
                  onChange={e => setVelocidade(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Sub-opções animadas */}
            <button
              onClick={() => setShowOpcoes(!showOpcoes)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Aplicar em...
            </button>

            {showOpcoes && (
              <div className="mt-2 space-y-2 animate-fadeIn">
                <button
                  onClick={() => { setAplicarTodosDias(true); setDiasSelecionados([]); }}
                  className="w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  Todos os dias
                </button>
                <div>
                  <button
                    onClick={() => { setAplicarTodosDias(false); }}
                    className="w-full text-left px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    Dias específicos
                  </button>
                  {!aplicarTodosDias && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {diasDaSemana.map(dia => (
                        <button
                          key={dia}
                          onClick={() => {
                            if (diasSelecionados.includes(dia)) {
                              setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
                            } else {
                              setDiasSelecionados([...diasSelecionados, dia]);
                            }
                          }}
                          className={`px-3 py-1 rounded border ${
                            diasSelecionados.includes(dia) ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {dia}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={adicionarAtividade}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Salvar Atividade
            </button>
          </div>
        )}
      </div>

      {/* Lista de atividades */}
      <div className="space-y-4">
        {atividadesPorDia[diaSelecionado].map(a => (
          <div key={a.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <p><strong>Distância:</strong> {a.distancia?.toFixed(2)} km</p>
              <p><strong>Tempo:</strong> {a.tempo?.toFixed(0)} min</p>
              <p><strong>Velocidade:</strong> {a.velocidade?.toFixed(2)} km/h</p>
              <p><strong>Calorias:</strong> {a.calorias.toFixed(0)} kcal</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => removerAtividade(a.id, diaSelecionado)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remover
              </button>
              <button
                onClick={() => removerTodosDias(a.id)}
                className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
              >
                Remover de todos os dias
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-bold">
        Total de calorias do dia {diaSelecionado}: {totalCalorias.toFixed(0)} kcal
      </p>

      <style>
        {`
          @keyframes fadeInUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .animate-fadeIn {
            animation: fadeInUp 0.3s ease forwards;
          }
        `}
      </style>
    </Page>
  );
};

export default Saude;
