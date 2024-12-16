import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import './update.css';

const UpdateArticle: React.FC = () => {
  const [query, setQuery] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Estado para el mensaje de éxito
  const [data, setData] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<any | null>(null);

  const handleInputChange = (event: any) => {
    const value = parseInt(event.target.value, 10);
    setQuery(isNaN(value) ? 0 : value);
  };

  const handleSearch = async () => {
    setData(null);
    setFormData(null);
    setError(null);
    setSuccess(null); // Limpia el mensaje de éxito al buscar
    setLoading(true);

    try {
      const response = await axios.post("https://express-start-app.onrender.com/api/find-one", {
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

  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "ESTADO" ? value === "true" : value,
    }));
  };

  const handleUpdate = async () => {
    if (!formData) return;

    const updatedFormData = { ...formData, ID: formData.ID };

    try {
      setLoading(true);
      setError(null); // Limpia errores previos
      setSuccess(null); // Limpia mensajes de éxito previos
      await axios.put("http://localhost:8090/api/update-one", updatedFormData);
      setSuccess("Producto actualizado correctamente."); // Mensaje de éxito
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
    <div className="container">
      <h1 className="title">Actualizar Artículo</h1>

      <Form className="mb-5">
        <Form.Group controlId="searchInput">
          <Form.Label>Buscar por ID:</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              value={query === null ? "" : query}
              onChange={handleInputChange}
              placeholder="Ingrese el ID del artículo"
              className="p-2"
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              variant="success"
              className="ms-3"
            >
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </Form.Group>
      </Form>

      {/* Mensajes de error o éxito */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {formData && (
        <Form className="update-form" onSubmit={(e) => e.preventDefault()}>
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="NOMBRE"
              value={formData.NOMBRE || ""}
              onChange={handleFormChange}
              placeholder="Ingrese el nombre del artículo"
              required
            />
          </Form.Group>

          <Form.Group controlId="formMarca" className="mb-3">
            <Form.Label>Marca:</Form.Label>
            <Form.Control
              type="text"
              name="MARCA"
              value={formData.MARCA || ""}
              onChange={handleFormChange}
              placeholder="Ingrese la marca"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEstado" className="mb-3">
            <Form.Label>Estado:</Form.Label>
            <Form.Control
              as="select"
              name="ESTADO"
              value={formData.ESTADO === true ? "true" : formData.ESTADO === false ? "false" : ""}
              onChange={handleFormChange}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="success"
            onClick={handleUpdate}
            disabled={loading}
            className="w-100 p-2 mt-3"
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </Button>
        </Form>
      )}

      {/* Mostrar artículos o mensaje */}
      <div className="mt-4">
        {data ? (
          Array.isArray(data) && data.length > 0 ? (
            data.map((articulo: any, index: number) => (
              <div key={index} className="border p-3 mb-3">
                <p>
                  <strong>Fecha de Modificación:</strong>{" "}
                  {new Date(articulo.FECHA_MODIFICACION).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <Alert variant="info">No se encontraron artículos con ese ID.</Alert>
          )
        ) : (
          <p className="text-center text-muted">Busca algún producto</p>
        )}
      </div>
    </div>
  );
};

export default UpdateArticle;
