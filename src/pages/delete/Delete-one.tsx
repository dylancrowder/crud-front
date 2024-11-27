import React, { useState } from "react";
import axios from "axios";


const DeleteOne: React.FC = () => {
  const [query, setQuery] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      setQuery(0);
    } else {
      setQuery(value);
    }
  };

  const handleSearch = async () => {
    setData(null);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/delete-one", {
        id: query,
      });
      console.log(response.data);
      setData(response.data);
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
    <>
      <div className="ctn-findOne">
        <div className="search-container">
          <h1 className="create-title">Eliminar Artículo</h1>
          <div className="searchbar-cnt">
            <input
              type="number"
              value={query === null ? "" : query}
              onChange={handleInputChange}
              placeholder="Eliminar por ID"
              className="input-field"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="search-button"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>

        {/* Renderizamos los artículos si data existe y tiene contenido */}
        <div className="product-cnt">
          {data ? (
            Array.isArray(data) && data.length > 0 ? (
              data.map((articulo: any, index: number) => (
                <div key={index} className="product-item">
                  <h3>Nombre: {articulo.NOMBRE}</h3>
                  <h3>Marca: {articulo.MARCA}</h3>
                  <h3>
                    Fecha de Modificación:{" "}
                    {new Date(articulo.FECHA_MODIFICACION).toLocaleDateString()}
                  </h3>
                </div>
              ))
            ) : (
              <p>No se encontraron artículos con ese ID.</p>
            )
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p>Elimina algun producto</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteOne;
