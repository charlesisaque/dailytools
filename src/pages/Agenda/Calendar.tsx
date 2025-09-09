import React from "react";

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const sampleEvents = {
  2: "Reunião", // Segunda-feira
  4: "Dentista", // Quarta-feira
  6: "Academia", // Sexta-feira
};

const Calendar: React.FC = () => (
  <div className="mt-10">
    <h3 className="text-xl font-bold mb-4">Calendário</h3>
    <div className="grid grid-cols-7 gap-2 text-center">
      {days.map((day, index) => (
        <div key={day} className="font-bold">{day}</div>
      ))}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className={`p-3 border rounded ${sampleEvents[i] ? "bg-blue-200" : ""}`}
          title={sampleEvents[i] || ""}
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

export default Calendar;
