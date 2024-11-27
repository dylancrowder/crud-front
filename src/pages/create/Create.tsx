import "./create.css";
import React, { useState } from "react";
import axios from "axios";

const CreateArticle: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [marca, setMarca] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/create-article",
        { nombre, marca }
      );
      setSuccessMessage(response.data.message);
      setNombre("");
      setMarca("");
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
    <div className="create-cnt">
      <h1 className="create-title">Crear Artículo</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="nombre">
            Nombre:
          </label>
          <input
            className="form-input"
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="marca">
            Marca:
          </label>
          <input
            className="form-input"
            type="text"
            id="marca"
            value={marca}
            onChange={(e) => setMarca((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <button className="form-button" type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
      {error && <p className="form-error">Error: {error}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}
    </div>
  );
};

export default CreateArticle;
