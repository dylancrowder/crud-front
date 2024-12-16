import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import "./create.css";

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
      const response = await axios.post("https://express-start-app.onrender.com/api/create-article", {
        nombre,
        marca,
      });
      setSuccessMessage(response.data.message);
      setNombre("");
      setMarca("");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error desconocido, intenta de nuevo.");
      } else {
        setError("Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" >
      <h1 className="title">Crear Artículo</h1>
      <Form className="create-form" onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre" className="mb-3">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre"
            value={nombre}
            onChange={(e) => setNombre(e.currentTarget.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMarca" className="mb-3">
          <Form.Label>Marca:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese una marca"
            value={marca}
            onChange={(e) => setMarca(e.currentTarget.value)}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading} className="w-100 p-2">
          {loading ? "Creando..." : "Crear"}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
    </div>
  );
};

export default CreateArticle;
