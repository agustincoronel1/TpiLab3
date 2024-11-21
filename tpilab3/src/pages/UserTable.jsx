import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useAuth } from '../services/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { logout } = useAuth();

  // Fetch users from the API
  async function fetchUsers() {
    try {
      const response = await fetch('https://fake-api-nodejs-m072.onrender.com/users');
      const json = await response.json();
      setUsers(json);
      setLoading(false);
    } catch (e) {
      console.error('Error fetching users:', e);
      setLoading(false);
    }
  }

  // Delete a user
  const deleteUser = async (user) => {
    try {
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'DELETE',
      });
      setUpdate((prev) => !prev); // Trigger rerender
    } catch (e) {
      console.error('Error deleting user:', e);
    }
  };

  // Disable a user
  const disableUser = async (user) => {
    try {
      const updatedUser = { ...user, status: false };
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      setUpdate((prev) => !prev); // Trigger rerender
    } catch (e) {
      console.error('Error disabling user:', e);
    }
  };

  // Enable a user
  const enableUser = async (user) => {
    try {
      const updatedUser = { ...user, status: true }; // Set status to true
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      setUpdate((prev) => !prev); // Trigger rerender
    } catch (e) {
      console.error('Error enabling user:', e);
    }
  };

  // Change user role
  const changeUserRole = async (user, role) => {
    try {
      const updatedUser = { ...user, userRole: role};
      await fetch(`https://fake-api-nodejs-m072.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });
      setUpdate((prev) => !prev); 
    } catch (e) {
      console.error('Error changing user role:', e);
    }
  };

  // Fetch users on component mount or update
  useEffect(() => {
    fetchUsers();
  }, [update]);

  return (
    <div id="main-wrapper" className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Page</h1>
          <Button
            variant="primary"
            className="btn-add-user"
            onClick={() => navigate('/register-admin')}
          >
            Agregar Usuario
          </Button>
        </div>
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName + ' ' + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.status ? 'Activo' : 'Inactivo'}</td>
                  <td id="actions">
                    <Button variant="danger" className="me-2" onClick={() => deleteUser(user)}>
                      Eliminar
                    </Button>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => disableUser(user)}
                      disabled={!user.status} // Disable button if already inactive
                    >
                      Deshabilitar
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => enableUser(user)}
                      disabled={user.status} // Disable button if already active
                    >
                      Habilitar
                    </Button>
                    <select
                      value={user.userRole}
                      onChange={(e) => changeUserRole(user, e.target.value)}
                      className="form-select w-auto"
                    >
                      <option value="admin">Admin</option>
                      <option value="seller">Seller</option>
                      <option value="buyer">User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div>
          <button className="btn btn-dark mt-3" onClick={logout}>
            Logout
          </button>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default UserTable;
