import React from "react";
import { FaTasks, FaCalendarCheck } from "react-icons/fa";

const cards = [
  { title: "Tarefas", description: "Gerencie suas tarefas diárias", icon: <FaTasks size={30} />, gradient: "from-indigo-400 to-indigo-600" },
  { title: "Compromissos", description: "Acompanhe seus compromissos", icon: <FaCalendarCheck size={30} />, gradient: "from-purple-400 to-purple-600" },
];

const CardsSection: React.FC = () => (
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
    <style>{`
      @keyframes fadeInUp {
        0% { transform: translateY(20px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
    `}</style>
  </div>
);

export default CardsSection;
