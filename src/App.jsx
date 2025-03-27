import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CrearPago from "./pages/crearPago";
import ConsultaPagos from "./pages/consultarPagos";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <h1>Aplicación de Pagos</h1>
        <nav>
          <Link to="/">Crear Pago</Link> |{" "}
          <Link to="/consultar">Consultar Pagos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CrearPago />} />
          <Route path="/consultar" element={<ConsultaPagos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
