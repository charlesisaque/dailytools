import React from "react";
import Page from "../Page";

import ChartCard from "../../components/ChartCard";
import { FaCalendarAlt, FaHeartbeat, FaMoneyBillWave, FaTools } from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <Page title="Dashboard" description="Veja suas métricas e seções principais:">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <a href="/agenda" className="bg-blue-500 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transform transition flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FaCalendarAlt size={30} className="text-white mr-4" />
            <h2 className="text-white text-xl font-bold">Agenda</h2>
          </div>
          <p className="text-white">Organize seus compromissos</p>
        </a>
        <a href="/saude" className="bg-red-500 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transform transition flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FaHeartbeat size={30} className="text-white mr-4" />
            <h2 className="text-white text-xl font-bold">Saúde</h2>
          </div>
          <p className="text-white">Acompanhe sua saúde</p>
        </a>
        <a href="/financas" className="bg-green-500 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transform transition flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FaMoneyBillWave size={30} className="text-white mr-4" />
            <h2 className="text-white text-xl font-bold">Finanças</h2>
          </div>
          <p className="text-white">Controle financeiro</p>
        </a>
        <a href="/utilidades" className="bg-yellow-500 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transform transition flex flex-col justify-between">
          <div className="flex items-center mb-4">
            <FaTools size={30} className="text-white mr-4" />
            <h2 className="text-white text-xl font-bold">Utilidades</h2>
          </div>
          <p className="text-white">Ferramentas úteis</p>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <ChartCard
          title="Despesas Mensais"
          labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          data={[500, 700, 450, 800, 600, 750]}
          gradient="from-green-400 to-green-600"
        />
        <ChartCard
          title="Passos Diários"
          labels={["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]}
          data={[4000, 6500, 5000, 7000, 8000, 9000, 7500]}
          gradient="from-red-400 to-red-600"
        />
      </div>
    </Page>
  );
};

export default Home;
