import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import './update.css';

const UpdateArticle: React.FC = () => {
  const [query, setQuery] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [formData, setFormData] = useState<any | null>(null);

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
      const response = await axios.post("http://localhost:8090/api/find-one", {
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
      [name]: name === "ESTADO" ? value === "true" : value, // Convertir "true"/"false" a booleano
    }));
  };

  // Enviar datos actualizados al servidor
  const handleUpdate = async () => {
    if (!formData) return;

    // Asegúrate de que el ID esté presente en los datos
    const updatedFormData = { ...formData, ID: formData.ID };

    try {
      setLoading(true);
      await axios.put("http://localhost:8090/api/update-one", updatedFormData);
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
    <div className="container">
      <h1 className="title">Actualizar Artículo</h1>

      {/* Buscar artículo por ID */}
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

      {/* Mostrar errores */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Formulario editable */}
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
    </div>
  );
};

export default UpdateArticle;
