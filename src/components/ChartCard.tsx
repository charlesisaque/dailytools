import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartCardProps {
  title: string;
  labels: string[];
  data: number[];
  gradient: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, labels, data, gradient }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: true,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  return (
    <div className={`rounded-lg p-6 shadow-md bg-gradient-to-br ${gradient} transform transition duration-500 hover:scale-105 hover:shadow-xl`}>
      <h2 className="text-white text-lg font-bold mb-4">{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartCard;
