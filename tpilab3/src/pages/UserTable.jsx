import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthenticationContext';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  async function fetchUsers() {
    try {
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users');
      const json = await response.json();
      setUsers(json);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="mt-5">

        <h1 className="mb-4">Admin Page</h1>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <div>Cargando...</div>
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName + " " + user.lastName} </td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UserTable;