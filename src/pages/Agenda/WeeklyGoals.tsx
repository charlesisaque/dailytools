import React from "react";

const goals = [
  { id: 1, text: "Finalizar projeto X", progress: 70 },
  { id: 2, text: "Ler 3 capítulos do livro", progress: 50 },
  { id: 3, text: "Exercícios diários", progress: 80 },
];

const WeeklyGoals: React.FC = () => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4">Metas Semanais</h3>
    <div className="space-y-4">
      {goals.map(goal => (
        <div key={goal.id}>
          <div className="flex justify-between mb-1">
            <span>{goal.text}</span>
            <span>{goal.progress}%</span>
          </div>
          <div className="w-full bg-gray-300 h-3 rounded">
            <div className="bg-green-500 h-3 rounded" style={{ width: `${goal.progress}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WeeklyGoals;
