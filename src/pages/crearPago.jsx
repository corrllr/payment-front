import React, { useState } from "react";
import { crearPago } from "../service/api";

const CrearPago = () => {
  const [idUsuario, setIdUsuario] = useState("");
  const [fecha, setFecha] = useState("");
  const [productos, setProductos] = useState([]);
  const [totalUsuario, setTotalUsuario] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState(0);

  const handleAgregarProducto = () => {
    const nombre = prompt("Ingrese el nombre del producto:");
    const precioUnitario = parseFloat(
      prompt("Ingrese el precio del producto:")
    );
    const cantidad = parseInt(prompt("Cantidad"));
    //Id debe ser auto generado
    const id = productos.length + 1;
    const nuevoProducto = {
      id,
      name: nombre,
      unitPrice: precioUnitario,
      units: cantidad,
    };
    setProductos([...productos, nuevoProducto]);
  };

  const handleCrearPago = async () => {
    const pago = {
      idUser: idUsuario,
      date: fecha,
      products: productos.reduce((acc, prod) => {
        acc[prod.id] = prod;
        return acc;
      }, {}),
    };

    try {
      const respuesta = await crearPago(pago, totalUsuario);
      setStatus(respuesta.status);
      setTotal(respuesta.totalPrice);
    } catch (error) {
      alert("Error al crear el pago", error);
    }
  };

  return (
    <div>
      <h2>Crear Pago</h2>
      <input
        type="text"
        placeholder="ID de Usuario"
        onChange={(e) => setIdUsuario(e.target.value)}
      />
      <input
        type="text"
        placeholder="DD-MM-YYYY"
        onChange={(e) => setFecha(e.target.value)}
      />
      <div>
        <button onClick={handleAgregarProducto}>Agregar Producto</button>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.name} : {producto.unitPrice} x {producto.units} ={"$"}
              {producto.unitPrice * producto.units}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="number"
        placeholder="Total dado por el usuario"
        value={totalUsuario}
        onChange={(e) => setTotalUsuario(e.target.value)}
      />
      <button onClick={handleCrearPago}>Pagar</button>
      {status && <h3>Estado: {status}</h3>}
      {total > 0 && <h3>Verdadero Total: ${total}</h3>}
      {status === "Aprobado" && <h3>Pago Aprobado</h3>}
      {status === "Declinado" && <h3>Pago Declinado</h3>}
    </div>
  );
};

export default CrearPago;
