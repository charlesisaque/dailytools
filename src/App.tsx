import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Agenda from "./pages/Agenda/Agenda";
import Saude from "./pages/Saude/Saude";
import Financas from "./pages/Financas/Financas";
import Utilidades from "./pages/Utilidades/Utilidades";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/saude" element={<Saude />} />
        <Route path="/financas" element={<Financas />} />
        <Route path="/utilidades" element={<Utilidades />} />
      </Routes>
    </Router>
  );
};

export default App;
