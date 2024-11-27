import React, { useState } from "react";
import axios from "axios";

const Update: React.FC = () => {
  const [query, setQuery] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<any | null>(null); // Datos del formulario

  // Manejar el cambio del input de búsqueda
  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    setQuery(isNaN(value) ? 0 : value);
  };

  // Buscar producto por ID
  const handleSearch = async () => {
    setData(null);
    setFormData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/find-one", {
        id: query,
      });

      setData(response.data);

      if (response.data.length > 0) {
        setFormData(response.data[0]);
      } else {
        setError("No se encontró un producto con ese ID.");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error desconocido.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar los cambios en el formulario
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value, // Actualizar el campo modificado
    }));
  };

  // Enviar datos actualizados al servidor
  const handleUpdate = async () => {
    if (!formData) return;

    // Asegúrate de que el ID esté presente en los datos
    const updatedFormData = { ...formData, ID: formData.ID };

    try {
      setLoading(true);
      await axios.put("http://localhost:8080/api/update-one", updatedFormData); // Se envía el ID en el cuerpo
      alert("Producto actualizado correctamente.");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error desconocido.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ctn-findOne">
      <div className="search-container">
        <h1 className="create-title">Actualizar Artículo</h1>
        <div className="searchbar-cnt">
          <input
            type="number"
            value={query === null ? "" : query}
            onChange={handleInputChange}
            placeholder="Buscar por ID"
            className="input-field"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="search-button"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {/* Mostrar errores o datos */}
      {error && <p className="error-message">{error}</p>}

      {/* Formulario editable */}
      {formData && (
        <form className="update-form">
          <div className="form-group">
            <label htmlFor="NOMBRE">Nombre</label>
            <input
              type="text"
              name="NOMBRE"
              id="NOMBRE"
              value={formData.NOMBRE || ""}
              onChange={handleFormChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="MARCA">Marca</label>
            <input
              type="text"
              name="MARCA"
              id="MARCA"
              value={formData.MARCA || ""}
              onChange={handleFormChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ESTADO">Estado</label>
            <input
              type="number"
              name="ESTADO"
              id="ESTADO"
              value={formData.ESTADO || ""}
              onChange={handleFormChange}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="FECHA_MODIFICACION">Fecha de Modificación</label>
            <input
              type="date"
              name="FECHA_MODIFICACION"
              id="FECHA_MODIFICACION"
              value={
                formData.FECHA_MODIFICACION
                  ? new Date(formData.FECHA_MODIFICACION)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleFormChange}
              className="input-field"
            />
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading}
            className="update-button"
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Update;
