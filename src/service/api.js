import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/pagos";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Metodos para Pagos

export const crearPago = async (pago, totalUsuario) => {
  try {
    // el body es el pago y el totalUsuario es un pathVariable
    const response = await api.post(`/${totalUsuario}`, pago);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

export const obtenerPagosPorUsuario = async (idUser) => {
  // idUser es un pathVariable
  try {
    const response = await api.get(`/${idUser}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

export const aniadirProductoaPago = async (idPago, producto) => {
  // idPago es un pathVariable y producto el body
  try {
    const response = await api.put(`/${idPago}/producto`, producto);
    return response.data;
  } catch (error) {
    console.error("Error adding product to payment:", error);
    throw error;
  }
};

export const validarTotal = async (idPago, totalUsuario) => {
  // idPago es un pathVariable y totalUsuario es una requestParam
  try {
    const response = await api.put(`/${idPago}/total`, {
      params: { totalUsuario },
    });
    return response.data;
  } catch (error) {
    console.error("Error validating total:", error);
    throw error;
  }
};
