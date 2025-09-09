import React, { useState } from "react";
import Page from "../Page";

type Despesa = {
  id: number;
  valor: number;
  categoria: string;
};

const Financas: React.FC = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [valor, setValor] = useState<number | "">("");
  const [categoria, setCategoria] = useState<string>("Alimentação");
  const [categorias, setCategorias] = useState<string[]>(["Alimentação", "Transporte", "Outro"]);
  const [novaCategoria, setNovaCategoria] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);

  // ➕ Criar nova categoria
  const criarNovaCategoria = () => {
    if (novaCategoria.trim() !== "" && !categorias.includes(novaCategoria.trim())) {
      setCategorias([...categorias, novaCategoria.trim()]);
      setCategoria(novaCategoria.trim());
      setNovaCategoria("");
    }
  };

  // ➕ Adicionar despesa
  const adicionarDespesa = () => {
    if (valor === "" || !categoria) return;
    setDespesas([...despesas, { id: Date.now(), valor: Number(valor), categoria }]);
    setValor("");
    setShowOptions(false);
  };

  // ➕ Adicionar em todas as categorias
  const aplicarEmTodasCategorias = () => {
    categorias.forEach((cat) => {
      if (valor !== "") {
        setDespesas((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), valor: Number(valor), categoria: cat },
        ]);
      }
    });
    setValor("");
    setShowOptions(false);
  };

  // ❌ Remover despesa
  const removerDespesa = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta despesa?")) {
      setDespesas(despesas.filter((d) => d.id !== id));
    }
  };

  // ❌ Remover todas as despesas
  const removerTodasDespesas = () => {
    if (window.confirm("Tem certeza que deseja remover TODAS as despesas?")) {
      setDespesas([]);
      setShowRemoveOptions(false);
    }
  };

  // ❌ Remover todas de uma categoria
  const removerPorCategoria = (categoria: string) => {
    if (window.confirm(`Tem certeza que deseja remover todas as despesas de ${categoria}?`)) {
      setDespesas(despesas.filter((d) => d.categoria !== categoria));
      setShowRemoveOptions(false);
    }
  };

  // 📊 Calcular total
  const totalGasto = despesas.reduce((acc, d) => acc + d.valor, 0);

  const totalPorCategoria = categorias.map((cat) => ({
    categoria: cat,
    total: despesas.filter((d) => d.categoria === cat).reduce((acc, d) => acc + d.valor, 0),
  }));

  return (
    <Page title="Finanças" description="Gerencie suas despesas e categorias">
      {/* Adicionar Despesa */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Valor R$"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          className="border p-2 rounded mr-2"
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 rounded mr-2"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nova categoria"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mr-2"
          onClick={criarNovaCategoria}
        >
          Criar Categoria
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mr-2"
          onClick={() => setShowOptions(!showOptions)}
        >
          Adicionar
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          onClick={() => setShowRemoveOptions(!showRemoveOptions)}
        >
          Remover
        </button>

        {/* Sub-opções de adicionar */}
        {showOptions && (
          <div className="mt-2 p-2 bg-gray-100 rounded shadow-md space-y-2 animate-slideDown">
            <button
              className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
              onClick={adicionarDespesa}
            >
              Adicionar na categoria selecionada
            </button>
            <button
              className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded"
              onClick={aplicarEmTodasCategorias}
            >
              Adicionar em todas as categorias
            </button>
          </div>
        )}

        {/* Sub-opções de remover */}
        {showRemoveOptions && (
          <div className="mt-2 p-2 bg-gray-100 rounded shadow-md space-y-2 animate-slideDown">
            <button
              className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded text-red-600"
              onClick={removerTodasDespesas}
            >
              Remover todas as despesas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded text-red-600"
                onClick={() => removerPorCategoria(cat)}
              >
                Remover todas de {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lista de Despesas */}
      <ul>
        {despesas.map((d) => (
          <li
            key={d.id}
            className="flex justify-between p-2 bg-gray-50 rounded mb-2 shadow"
          >
            <span>
              R${d.valor.toFixed(2)} - {d.categoria}
            </span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removerDespesa(d.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* Resumo Financeiro */}
      <div className="mt-6 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Resumo Financeiro</h2>
        <p className="font-semibold">Total gasto: R${totalGasto.toFixed(2)}</p>
        <ul className="mt-2">
          {totalPorCategoria.map((c) => (
            <li key={c.categoria}>
              {c.categoria}: R${c.total.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
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

export default Financas;
