import React from "react";
import Page from "./Page";
import { FaHeartbeat, FaRunning } from "react-icons/fa";

const cards = [
  { title: "Monitoramento", description: "Acompanhe seus sinais vitais", icon: <FaHeartbeat size={30} />, gradient: "from-red-400 to-red-600" },
  { title: "Atividades", description: "Registre exercícios e atividades", icon: <FaRunning size={30} />, gradient: "from-pink-400 to-pink-600" },
];

const Saude: React.FC = () => {
  return (
    <Page title="Saúde" description="Mantenha o controle sobre sua saúde e bem-estar">
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
      </div>
    </Page>
  );
};

export default Saude;
