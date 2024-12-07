import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";

const DeleteOne: React.FC = () => {
  const [query, setQuery] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuery(!isNaN(value) && value > 0 ? value : null);
  };

  const handleDelete = async () => {
    setSuccessMessage(null);
    setError(null);

    if (query === null) {
      setError("Por favor, ingrese un ID válido.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete("http://localhost:8090/api/delete-one", {
        data: { id: query },
      });
      setSuccessMessage(response.data.message || "El artículo se eliminó correctamente.");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Error al conectar con el servidor. Intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="title">Eliminar Artículo</h1>
      <Row className="justify-content-center">
        <Col>
          <Form className="mb-5">
            <Form.Group controlId="formDelete">
              <Form.Label>Eliminar por ID</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
           
                  value={query ?? ""}
                  onChange={handleInputChange}
                  placeholder="Ingrese el ID del artículo"
                  className="p-2"
                  aria-label="ID del artículo a eliminar"
                />
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                  className="ms-3"
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </Form.Group>
          </Form>

          {/* Mensajes de éxito o error */}
          <div className="mt-4">
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteOne;
