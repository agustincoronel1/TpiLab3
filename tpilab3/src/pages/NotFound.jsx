import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1 text-primary fw-bold">404</h1>
          <h2 className="text-secondary">Oops! Página no encontrada</h2>
          <p className="text-muted">
            Lo sentimos, la página que buscas no está disponible o fue movida.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg" className="mt-3">
              Volver al Inicio
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
