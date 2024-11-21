import { useState, useEffect} from 'react';
import { useAuth } from '../services/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    console.log(email, password)
    try {
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users');
      const data = await response.json();
      console.log('data', data)
      const user = data.find((user) => user.email === email && user.password === password);
      console.log(user)
      if (user && user.status) {
        login(user.userRole);
        navigate('/');
      } else if (user && !user.status) {
        setError('User is disabled');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
    <NavBar />
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center my-4">Login Page</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Link to="/register">No tengo una cuenta</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default LoginPage;