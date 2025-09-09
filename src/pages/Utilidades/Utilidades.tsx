import React, { useState } from "react";
import Page from "../Page";
import { FaTools, FaCalculator, FaDollarSign } from "react-icons/fa";

const cards = [
  { title: "Ferramentas", description: "Acesse utilidades diversas", icon: <FaTools size={30} />, gradient: "from-yellow-400 to-yellow-600" },
  { title: "Calculadora", description: "Ferramenta de cálculo rápido", icon: <FaCalculator size={30} />, gradient: "from-orange-400 to-orange-600" },
];

const moedas = ["USD", "BRL", "EUR", "JPY"];

const Utilidades: React.FC = () => {
  const [valor, setValor] = useState<number | "">("");
  const [moedaOrigem, setMoedaOrigem] = useState("USD");
  const [moedaDestino, setMoedaDestino] = useState("BRL");
  const [resultado, setResultado] = useState<number | null>(null);
  const [converting, setConverting] = useState(false);

  const converter = async () => {
    if (valor === "" || moedaOrigem === moedaDestino) return;
    setConverting(true);
    try {
      const res = await fetch(`https://api.exchangerate.host/convert?from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`);
      const data = await res.json();
      setResultado(data.result);
    } catch (err) {
      console.error("Erro ao converter:", err);
      setResultado(null);
    } finally {
      setConverting(false);
    }
  };

  return (
    <Page title="Utilidades" description="Ferramentas e utilidades para facilitar seu dia">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`relative overflow-hidden rounded-lg p-6 shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col justify-between bg-gradient-to-br ${card.gradient}`}
            style={{ animation: `fadeInUp 0.5s ease forwards`, animationDelay: `${index * 0.1}s`, opacity: 0 }}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{card.icon}</div>
              <h2 className="text-white text-xl font-bold">{card.title}</h2>
            </div>
            <p className="text-white">{card.description}</p>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>
          </div>
        ))}

        {/* Card do Conversor de Moedas */}
        <div className="relative overflow-hidden rounded-lg p-6 shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl flex flex-col justify-between bg-gradient-to-br from-blue-400 to-blue-600">
          <div className="flex items-center mb-4">
            <FaDollarSign size={30} className="mr-4 text-white" />
            <h2 className="text-white text-xl font-bold">Conversor de Moedas</h2>
          </div>
          <p className="text-white mb-4">Converta valores entre diferentes moedas</p>
          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
            className="p-2 rounded mb-2 text-gray-800 w-full"
          />
          <div className="flex space-x-2 mb-2">
            <select value={moedaOrigem} onChange={(e) => setMoedaOrigem(e.target.value)} className="p-2 rounded flex-1 text-gray-800">
              {moedas.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={moedaDestino} onChange={(e) => setMoedaDestino(e.target.value)} className="p-2 rounded flex-1 text-gray-800">
              {moedas.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <button
            onClick={converter}
            className="bg-white text-blue-600 font-bold px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            {converting ? "Convertendo..." : "Converter"}
          </button>
          {resultado !== null && (
            <div className="mt-2 p-2 bg-white text-gray-800 rounded shadow-md animate-slideDown">
              Resultado: {resultado.toFixed(2)} {moedaDestino}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
        `}
      </style>
    </Page>
  );
};

export default Utilidades;