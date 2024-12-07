import 'bootstrap/dist/css/bootstrap.min.css';
import "./variables.css";
import { useState } from "react";
import { Sidebar } from "./components/sidebar/Sidebar.tsx";
import { Main } from "./components/main/Main.tsx";
import { Col, Row } from 'react-bootstrap';

export function App() {
  const [view, setView] = useState("home");

  return (
    <div className="d-flex vh-100">
      <Row className="flex-grow-1 w-100 m-0">

        <Col xs={12} md={2} className="p-4 border sidebar-container d-flex flex-column">
          <Sidebar onViewChange={setView} />
        </Col>

        <Col xs={12} md={10} className="p-4 d-flex flex-column">
          <Main view={view} />
        </Col>
        
      </Row>
    </div>
  );
}
