import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Container, Row, Col } from "react-bootstrap";

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
      const response = await axios.delete("http://localhost:8090/api/delete-one", {
        data: { id: query },
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
    <Container >
      <h1 className="title">Eliminar Artículo</h1>
      <Row className="justify-content-center">

        <Col >
          <Form className="mb-5">
            <Form.Group controlId="formSearch">
              <Form.Label>Buscar por ID</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  value={query === null ? "" : query}
                  onChange={handleInputChange}
                  placeholder="Ingrese el ID del artículo"
                  className="p-2"
                />
                <Button
                  variant="danger"
                  onClick={handleSearch}
                  disabled={loading}
                  className="ms-3"
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </Button>
              </div>
            </Form.Group>
          </Form>

          {/* Mostrar los resultados de búsqueda */}
          <div className="mt-4">
            {data ? (
              Array.isArray(data) && data.length > 0 ? (
                data.map((articulo: any, index: number) => (
                  <div key={index} className="border p-3 mb-3">
                    <h5>Nombre: {articulo.NOMBRE}</h5>
                    <h6>Marca: {articulo.MARCA}</h6>
                    <p>
                      <strong>Fecha de Modificación:</strong>{" "}
                      {new Date(articulo.FECHA_MODIFICACION).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <Alert variant="info">No se encontraron artículos con ese ID.</Alert>
              )
            ) : error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <p className="text-center text-muted">Elimina algún producto</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DeleteOne;
