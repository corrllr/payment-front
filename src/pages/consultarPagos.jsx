import React, { useState } from "react";
import { obtenerPagosPorUsuario } from "../service/api";

const ConsultaPagos = () => {
  const [idUsuario, setIdUsuario] = useState("");
  const [pagos, setPagos] = useState([]);

  const handleConsultaPagos = async () => {
    try {
      const respuesta = await obtenerPagosPorUsuario(idUsuario);
      setPagos(respuesta);
      if (respuesta.length === 0) {
        alert("No se encontraron pagos para este usuario.");
      }
    } catch (error) {
      alert("Error al consultar pagos", error);
    }
  };

  return (
    <div>
      <h2>Consulta de Pagos</h2>
      <input
        type="text"
        placeholder="ID de Usuario"
        value={idUsuario}
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <button onClick={handleConsultaPagos}>Consultar</button>
      <ul>
        {pagos.map((pago) => (
          <li key={pago.id}>
            <h3>
              {pago.date} - {pago.totalPrice} - Estado: {pago.status}
            </h3>
            <h4>Productos:</h4>
            <ul>
              {Object.values(pago.products).map((producto) => (
                <li key={producto.id}>
                  {producto.name} - ${producto.unitPrice} x {producto.units} = $
                  {producto.unitPrice * producto.units}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultaPagos;
