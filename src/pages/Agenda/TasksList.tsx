import React, { useState } from "react";

const initialTasks = [
  { id: 1, text: "Enviar relatório", done: false },
  { id: 2, text: "Reunião com equipe", done: true },
  { id: 3, text: "Ir ao banco", done: false },
];

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Tarefas do Dia</h3>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="mr-3 w-5 h-5"
            />
            <span className={task.done ? "line-through text-gray-400" : ""}>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
